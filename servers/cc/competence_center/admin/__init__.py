from django.contrib import admin
from competence_center.models import User, StudyGroup, SimpleTest, Course, Question, Answer, PassedTest, Student, Teacher
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class DragonUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name',
                    'middle_name', 'last_name',)

@admin.register(StudyGroup)
class StudyGroupAdmin(admin.ModelAdmin):
    list_display = ('title', 'code', 'start', 'end',)

@admin.register(SimpleTest)
class SimpleTestAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'description') 

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'icon')   

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'test', 'score')    

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('title', 'question', 'correct')

@admin.register(PassedTest)
class PassedTestAdmin(admin.ModelAdmin):
    list_display = ('testid', 'score', 'all_answers', 'correct_answers', 'datetime_pass')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'study_group')    

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user',)    
