from .models import User, Course, SimpleTest, Question, Answer, PassedTest, Student
from rest_framework import serializers
from datetime import datetime

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'middle_name', 'full_name', 'is_superuser', 'username', 'email', 'last_login', 'groups')
        read_only_fields = ('id',)


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ['id', 'title', 'correct']


class AnswerRelatedField(serializers.RelatedField):
    def get_queryset(self):
        return Answer.objects.all()

    def to_representation(self, value):
        answer = Answer.objects.get(pk=value.pk)

        return {'pk': value.pk, 'id': value.id, 'title': answer.title}        


class QuestionSerializer(serializers.ModelSerializer):

    question_answers = AnswerRelatedField(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'test', 'score', 'question_answers']


class QuestionRelatedField(serializers.RelatedField):

    def get_queryset(self):
        return Question.objects.all()

    def to_representation(self, value):
        question = Question.objects.get(pk=value.pk)

        return {'pk': value.pk, 'id': value.id, 'title': value.title, 'score': value.score}


class QuestionField(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    score = serializers.IntegerField()
    question_answers = AnswerRelatedField(many=True, read_only=True)


class RelatedCourseField(serializers.Serializer):
    title = serializers.CharField()


class SimpleTestSerializer(serializers.ModelSerializer):

    course = RelatedCourseField(required=False, read_only=True)
    test_questions_count = serializers.SerializerMethodField()

    def get_test_questions_count(self, instance):
        return instance.test_questions.count()

    class Meta:
        model = SimpleTest
        fields = ['pk', 'id', 'title', 'course', 'description', 'test_questions_count',]
        read_only_fields = ('id',)


class SimpleTestSerializerOpen(serializers.ModelSerializer):

    course = RelatedCourseField(required=False, read_only=True)
    test_questions = QuestionField(many=True, read_only=True)
    test_questions_count = serializers.SerializerMethodField()

    def get_test_questions_count(self, instance):
        return instance.test_questions.count()

    class Meta:
        model = SimpleTest
        fields = ['pk', 'id', 'title', 'course',
                  'description', 'test_questions', 'test_questions_count']


class TestRelatedField(serializers.RelatedField):

    def get_queryset(self):
        return SimpleTest.objects.all()

    def to_representation(self, value):
        test = SimpleTest.objects.get(pk=value.pk)

        return {'pk': value.pk, 'id': value.id, 'title': value.title}    


class PassedTestSerializer(serializers.ModelSerializer):

    incorrect_questions = QuestionField(many=True, read_only=False, required=False)
    max_score = serializers.SerializerMethodField()

    class Meta:
        model = PassedTest
        fields = ('testid', 'all_answers', 'correct_answers', 'score',
                  'datetime_pass', 'incorrect_questions', 'max_score', 'recommendations')

    def get_max_score(self, instance):
        return instance.calculate_max_score()

    def create(test, questions):
        data = test.context['request'].data
        testid = data['testid']
        
        questions = data['questions']
        all_answers = data['all_questions']
        user = test.context['request'].user
        
        score = 0
        student = Student.objects.get(user=user)

        incorrect_questions = []

        correct_answers = 0
        for answer in questions:
            query_answer = Answer.objects.get(id=answer['answer']['id'])
            query_question = Question.objects.get(id=answer['question']['id'])
            if query_answer.correct == True:
                correct_answers += 1
                score += query_question.score
            else:
                incorrect_questions.append(query_question.id)   


        test = PassedTest(
            student=student, 
            testid=testid, 
            all_answers=all_answers, 
            correct_answers=correct_answers, 
            score=score
        )
        test.save()
        test.incorrect_questions.set(incorrect_questions)
        test.save()

        recommendations = ''
        for incorrect_question in incorrect_questions:
            incorrect_question_total_answers_count = 0
            correct_question_total_answers_count = 0
            for pt in PassedTest.objects.filter(testid=testid):
                for qu in pt.incorrect_questions.all():

                    if incorrect_question == qu.id:
                        incorrect_question_total_answers_count += 1
                correct_question_total_answers_count += 1
            correct_question_total_answers_count -= incorrect_question_total_answers_count

            score = incorrect_question_total_answers_count / correct_question_total_answers_count
            score = score if score > 1 else 1
            
            question = Question.objects.get(id=incorrect_question)
            
            question.score = score
            question.save()

            if question.additional_literature:
                recommendations += question.additional_literature + ','

        test.recommendations = recommendations
        test.save()

        return test
  


class PassedTestRelatedField(serializers.RelatedField):

    def get_queryset(self):
        return PassedTest.objects.all()

    def to_representation(self, value):
        passed_test = PassedTest.objects.get(pk=value.pk)

        return {
            'pk': value.pk, 
            'datetime_pass': value.datetime_pass, 
            'score': value.score, 
            'all_answers': value.all_answers, 
            'passed_answers': value.passed_answers,
            'incorrect_questions': value.incorrect_questions,
            'max_score': value.max_score
        }

class TestChart(serializers.Serializer):
    test = serializers.CharField()
    correct_answers = serializers.IntegerField()
    all_questions = serializers.IntegerField()

class TestPieChart(serializers.Serializer):
    id = serializers.IntegerField()
    question = serializers.CharField()
    count = serializers.IntegerField()    

class CourseSerializer(serializers.ModelSerializer):

    course_tests = TestRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'icon', 'course_tests']
        read_only_fields = ('id',)


class StudentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    #student_passed_tests = PassedTestRelatedField(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['name', 'group', 'email',]

    def get_name(self, instance):
        return instance.user.get_full_name() 

    def get_group(self, instance):
        return instance.study_group.title    

    def get_email(self, instance):
        return instance.user.email    


class StudentsResultsSerializer(serializers.Serializer):
    student = serializers.CharField()
    result = serializers.CharField()
    date = serializers.DateTimeField()
    score = serializers.CharField()
    answers = serializers.CharField()

class TestResultsSerializer(serializers.Serializer):
    test = serializers.CharField()  
    students = StudentsResultsSerializer(many=True, read_only=True)      

class TableGroupSerializer(serializers.Serializer):
    group = serializers.CharField()
    tests = TestResultsSerializer(many=True, read_only=True)

