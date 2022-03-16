from django.shortcuts import render
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import views as rest_views
from rest_framework.response import Response
from rest_framework import status
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import MyRecipe


class RecipesListApiView(rest_views.APIView):
    def get(self, request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response({"recipes": serializer.data})

    def post(self, request):
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            recipe = serializer.save()
            my_recipe = MyRecipe(created_by=request.user, user_product=recipe)
            my_recipe.save()
            return Response({"recipe": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipesAuthListApiView(rest_views.APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        recipes = MyRecipe.objects.filter(created_by=request.user)
        my_recipes_ids = [my_recipe.user_product_id for my_recipe in recipes]
        my_recipes = Recipe.objects.filter(pk__in=my_recipes_ids)
        serializer = RecipeSerializer(my_recipes, many=True, context={'request': request})
        return Response({"recipes": serializer.data})

    def post(self, request):
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            recipe = serializer.save()
            my_recipe = MyRecipe(created_by=request.user, user_product=recipe)
            my_recipe.save()
            return Response({"recipe": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailsApiView(rest_views.APIView):
    def get(self, request, pk):
        recipe = Recipe.objects.get(pk=pk)
        serializer = RecipeSerializer(recipe, many=False, context={'request': request})
        return Response({"recipe": serializer.data})

    def delete(self, request, pk):
        recipe = Recipe.objects.get(pk=pk)
        recipe.delete()
        return Response(status=status.HTTP_200_OK)