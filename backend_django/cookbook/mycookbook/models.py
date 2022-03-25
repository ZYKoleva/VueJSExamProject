from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    STARTERS = 'Starters',
    MAIN_COURSES = 'Main Courses'
    DESERTS = 'Deserts'
    CATEGORY_CHOICES = [
        ('', ''),
        (STARTERS, 'Starters'),
        (MAIN_COURSES, 'Main Courses'),
        (DESERTS, 'Deserts')
    ]
    name = models.CharField(max_length=100, default="Name")
    image = models.ImageField(upload_to='images')
    ingredients = models.TextField(max_length=1000, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    viewed = models.IntegerField(default=0)
    liked = models.IntegerField(default=0)
    category = models.CharField(max_length=100, blank=True)



class MyRecipe(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    user_product = models.ForeignKey(Recipe, on_delete=models.CASCADE)


class MyFavoriteRecipes(models.Model):
    fav_by = models.ForeignKey(User, on_delete=models.CASCADE)
    fav_recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
