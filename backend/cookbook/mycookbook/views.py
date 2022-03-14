from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import views as rest_views
from rest_framework.response import Response
from rest_framework import status


class RecipesApiView(rest_views.APIView):
    def get(self, request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response({"recipes": serializer.data})

    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

