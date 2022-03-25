from django.urls import path
from .views import RegisterApi, LoginApi, ListUsers
from knox import views as knox_views


urlpatterns = [
    path('auth/register/', RegisterApi.as_view()),
    path('auth/login/', LoginApi.as_view()),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('auth/users/', ListUsers.as_view(), name='all-users')
]