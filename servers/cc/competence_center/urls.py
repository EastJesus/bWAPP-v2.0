from django.urls import path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from .views import UserViewSet, CourseViewSet, SimpleTestViewSet, QuestionViewSet, AnswerViewSet, PassedTestViewSet, StudentViewSet
from django.conf.urls import url, include
from django.urls import path, re_path
from rest_auth.registration.views import VerifyEmailView, RegisterView
from allauth.account.views import confirm_email 
app_name = 'competence_center'

urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/', RegisterView.as_view(), name='account_signup'),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
            name='account_confirm_email'),

]

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'tests', SimpleTestViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)
router.register(r'passed_tests', PassedTestViewSet)
router.register(r'students', StudentViewSet)



urlpatterns += router.urls
