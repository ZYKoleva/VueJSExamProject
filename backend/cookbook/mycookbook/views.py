from django.shortcuts import render

from .models import Recipe
from .serializers import RecipeSerializer

from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    # permission_classes = IsAuthenticated
    # authentication_classes = BasicAuthentication
    serializer_class = RecipeSerializer


# Create your views here.
class RecipeDefaultViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.filter(created_by=0)
    serializer_class = RecipeSerializer
