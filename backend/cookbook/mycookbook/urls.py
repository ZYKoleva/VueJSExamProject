from rest_framework import routers
from django.urls import path, include
from .views import RecipeViewSet, RecipeDefaultViewSet

router = routers.DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'default_recipe', RecipeDefaultViewSet)

urlpatterns = [
    path('', include(router.urls))
]