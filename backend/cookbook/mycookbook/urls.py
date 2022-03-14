from rest_framework import routers
from django.urls import path, include
from .views import RecipesApiView


urlpatterns = [
    path('recipes/', RecipesApiView.as_view()),
]