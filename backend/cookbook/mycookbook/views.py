from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import views as rest_views
from rest_framework.response import Response

class ListRecipesView(rest_views.APIView):
    def get(selfself, request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response({"recipes": serializer.data})

