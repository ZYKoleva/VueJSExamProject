from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    name = models.CharField(max_length=100, default='Име')
    image = models.ImageField(upload_to='images', blank=True)
    description = models.TextField(max_length=1000, blank=True)
    can_be_cooked = models.BooleanField(default=True)
    recipe_ingredient = models.JSONField(blank=True)
    created_by = models.IntegerField(default=0)


class UserMyRecipe(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    user_my_recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)


