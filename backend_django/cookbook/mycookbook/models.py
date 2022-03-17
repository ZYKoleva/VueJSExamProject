from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    name = models.CharField(max_length=100, default="Name")
    image = models.ImageField(upload_to='images', default=f'../static/images/placeholder.jpg')
    description = models.TextField(max_length=1000, blank=True)
    show_hide = models.BooleanField(default=False)


class MyRecipe(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    user_product = models.ForeignKey(Recipe, on_delete=models.CASCADE)
