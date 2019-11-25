from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework import status, permissions, filters, serializers
from rest_framework.decorators import action
from rest_condition import Or
from operator import itemgetter, attrgetter, methodcaller
import random

from .serializers import UserSerializer, SimpleTestSerializer, QuestionSerializer, CourseSerializer, AnswerSerializer, PassedTestSerializer, StudentSerializer, TestChart, SimpleTestSerializerOpen, TestPieChart, TableGroupSerializer
from .models import User, SimpleTest, Question, Course, Answer, PassedTest, Student, StudyGroup

# Пользователи
class UserViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'username', 'last_name', 'email', 'full_name',)
    search_fields = ('id', 'username', 'last_name', 'email', 'full_name',)

    serializer_class = UserSerializer

# Курсы
class CourseViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Course.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'title',)
    search_fields = ('id', 'title',)

    serializer_class = CourseSerializer

# Тесты
class SimpleTestViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SimpleTest.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'title',)
    search_fields = ('id', 'title',)

    serializer_class = SimpleTestSerializer

    # Открываем список вопросов теста, когда пользователь нажимает кнопку 'начать тест'
    @action(
        detail=True,
        methods=['get'],
        permission_classes=[Or(
            permissions.IsAuthenticated,
        )]
    )
    def load_questions(self, instance, pk):
        queryset = SimpleTest.objects.get(id=pk)
        data = SimpleTestSerializerOpen(queryset).data
        
        return Response(data)

# Вопросы
class QuestionViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Question.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'title',)
    search_fields = ('id', 'title',)

    serializer_class = QuestionSerializer

# Ответы
class AnswerViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Answer.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'title',)
    search_fields = ('id', 'title',)

    serializer_class = AnswerSerializer

# Пройденные тесты
class PassedTestViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    queryset = PassedTest.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'title',)
    search_fields = ('id', 'title',)

    serializer_class = PassedTestSerializer

    # Отправляем данные для графиков в админке
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[Or(
            permissions.IsAuthenticated,
            permissions.IsAdminUser
        )]
    )
    def tests_chart(self, instance):
        tests = []
        for test in SimpleTest.objects.all():
            all_questions = test.test_questions.count()
            correct_answers = 0
            for passed_test in PassedTest.objects.filter(testid=test.id):
                correct_answers += passed_test.correct_answers
            correct_answers = correct_answers / \
                PassedTest.objects.filter(testid=test.id).count()
            tests.append({
                'test': test.title,
                'correct_answers': correct_answers,
                'all_questions': all_questions
            })

        return Response(TestChart(tests, many=True).data)

    # Отправляем данные для графика в виде круга в админке
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[Or(
            permissions.IsAuthenticated,
            permissions.IsAdminUser
        )]
    )
    def questions_pie_chart(self, instance):
        questions = []
        for test in PassedTest.objects.all():
            for question in test.incorrect_questions.all():

                if len(questions) == 0:
                    question_chart = {
                        'id': question.id,
                        'question': question.title,
                        'count': 1
                    }
                    questions.append(question_chart)

                else:
                    append = True
                    for qu_ in questions:
                        if question.id == qu_['id']:
                            qu_['count'] += 1
                            append = False
                            break
                    if append:
                        question_chart = {
                            'id': question.id,
                            'question': question.title,
                            'count': 1
                        }
                        questions.append(question_chart)

            questions = sorted(questions, key=itemgetter('count'), reverse=True)

        return Response(TestPieChart(questions[:5], many=True).data)

# Студенты
class StudentViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Student.objects.all().order_by('-id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('id', 'last_name', 'name', 'middle_name',)
    search_fields = ('id', 'last_name', 'name', 'middle_name',)

    serializer_class = StudentSerializer
    
    # Отправляем результаты тестов для админки (таблица результатов по группам)
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[Or(
            permissions.IsAuthenticated,
            permissions.IsAdminUser
        )]
    )
    def test_results(self, instance):
        groups = []
        
        query_groups = StudyGroup.objects.all()
        for group in query_groups:

            query_tests = []
            query_students = []

            tests = SimpleTest.objects.all()
            for test in tests:
                query_students = []
                students = Student.objects.filter(study_group=group)
                
                for student in students:
                    passed_tests = PassedTest.objects.filter(student=student, testid=test.id).order_by('-id')
                    
                    result = ''
                    datetime_pass = None
                    score = '-'
                    answers = '-'
                    datetime_pass = None

                    if not passed_tests:
                        result = 'Не проходил'

                    for passed_test in passed_tests if passed_tests else []:
                        passed_test.calculate_max_score()
                        if passed_test.score > passed_test.max_score:
                            continue
                        if passed_test.score > (passed_test.max_score * passed_test.min_score_percent_for_success / 100):
                            result = 'Пройден успешно'
                            datetime_pass = passed_test.datetime_pass
                            score = str(passed_test.score) + '/' + str(passed_test.max_score)
                            answers = str(passed_test.correct_answers) + '/' + str(test.test_questions.count())
                            break
                        score = str(passed_test.score) + '/' + str(passed_test.max_score)
                        answers = str(passed_test.correct_answers) + '/' + str(test.test_questions.count())
                        result = 'Провален'
                        datetime_pass = passed_test.datetime_pass
 
                            
                    student_result = {
                        'student': student.user.last_name + ' ' + student.user.first_name,
                        'result': result,
                        'score': score,
                        'answers': answers,
                        'date': datetime_pass
                    }      

                    query_students.append(student_result)

                test_result = {
                    'test': test.title,
                    'students': query_students
                }
                query_tests.append(test_result)  

            group = {
                'group': group.title,
                'tests': query_tests
            }
            groups.append(group)   

        return Response(TableGroupSerializer(groups, many=True).data)