from django.urls import path
from .views import RecipesListApiView, RecipeDetailsApiView, RecipesAuthListApiView, RecipeAuthDetailsApiView


urlpatterns = [
    path('cook_recipes/', RecipesListApiView.as_view()),
    path('cook_recipes/auth/', RecipesAuthListApiView.as_view()),
    path('cook_recipes/<int:pk>/', RecipeDetailsApiView.as_view()),
    path('cook_recipes/auth/<int:pk>', RecipeAuthDetailsApiView.as_view()),
]