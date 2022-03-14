from rest_framework import routers
from django.urls import path, include
from .views import ListRecipesView


urlpatterns = [
    path('recipes/', ListRecipesView.as_view()),
]