from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group as AuthGroup
from datetime import datetime
from django.utils import timezone

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import json


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255)
    email = models.EmailField()
    full_name = models.CharField(max_length=150, editable=False, default='')

    REQUIRED_FIELDS = AbstractUser.REQUIRED_FIELDS + ['first_name', 'last_name']

    def save(self, *args, **kwargs):
        self.full_name = ' '.join(
            [s for s in [self.last_name, self.first_name, self.middle_name] if s])
        super().save(*args, **kwargs)


    def __str__(self):
        return self.first_name + ' ' + self.middle_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class StudyGroup(models.Model):
    title = models.CharField(max_length=50)
    code = models.CharField(max_length=50)
    start = models.DateField(null=True)
    end = models.DateField(null=True) 
    students = models.ManyToManyField('Student', blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Учебная группа'
        verbose_name_plural = 'Учебные группы'

class Course(models.Model):
    title = models.CharField(max_length=255)
    tests = models.ManyToManyField('SimpleTest', related_name='tests', blank=True)
    description = models.TextField(blank=True)
    icon = models.URLField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'
    
class SimpleTest(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey(Course, related_name="course_tests", on_delete=models.CASCADE)  
    questions = models.ManyToManyField('Question', blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'


class Student(models.Model):
    user = models.OneToOneField(
        'User', related_name='extra', on_delete=models.CASCADE)
    study_group = models.ForeignKey(
        'StudyGroup', on_delete=models.CASCADE, null=True)
    

    def __str__(self):
        return self.user.first_name + ' ' + self.user.middle_name + ' ' + self.user.last_name

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'


class Teacher(models.Model):
    user = models.OneToOneField('User', related_name='teacher', on_delete=models.CASCADE)
    courses = models.ManyToManyField('Course', related_name='course_teachers', blank=True)
    study_groups = models.ManyToManyField('StudyGroup', related_name='group_teachers', blank=True)

    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'

class Question(models.Model):
    title = models.CharField(max_length=500)
    test = models.ForeignKey('SimpleTest', related_name='test_questions', on_delete=models.CASCADE)
    score = models.IntegerField(default=0)  
    answers = models.ManyToManyField('Answer', blank=True, related_name='answers')
    additional_literature = models.URLField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'
        

class Answer(models.Model):
    title = models.CharField(max_length=500)
    question = models.ForeignKey('Question', related_name='question_answers', on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)   

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'


class PassedTest(models.Model):
    student = models.ForeignKey(
        Student, related_name='student_passed_tests', on_delete=models.CASCADE, default=1)
    testid = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    all_answers = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    datetime_pass = models.DateTimeField(auto_now_add=True)
    incorrect_questions = models.ManyToManyField(
        'Question', blank=True, default=[])
    max_score = models.IntegerField(default=0) 
    min_score_percent_for_success = models.IntegerField(default=50) 
    recommendations = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Пройденный тест'
        verbose_name_plural = 'Пройденные тесты'   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.calculate_max_score()

    def calculate_max_score(self):
        max_score = 0
        test = SimpleTest.objects.filter(id=self.testid).first()
        
        for question in test.test_questions.all():
            max_score += question.score

        self.max_score = max_score
        self.save()
        return max_score



