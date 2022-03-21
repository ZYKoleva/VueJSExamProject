from django.urls import path
from .views import RecipesListApiView, RecipeDetailsApiView, RecipesAuthListApiView, RecipeAuthDetailsApiView, RecipesFavouriteListApiView


urlpatterns = [
    path('cook_recipes/', RecipesListApiView.as_view()),
    path('cook_recipes/auth/', RecipesAuthListApiView.as_view()),
    path('cook_recipes/<int:pk>/', RecipeDetailsApiView.as_view()),
    path('cook_recipes/auth/<int:pk>/', RecipeAuthDetailsApiView.as_view()),
    path('cook_recipes/my_favorite_recipes/<int:pk>/', RecipesFavouriteListApiView.as_view()),
    path('cook_recipes/my_favorite_recipes/', RecipesFavouriteListApiView.as_view()),
]