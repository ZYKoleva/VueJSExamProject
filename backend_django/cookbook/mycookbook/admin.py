from django.contrib import admin
from .models import Recipe, MyRecipe


class MyRecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_by', 'user_product')
# Register your models here.

admin.site.register(Recipe)
admin.site.register(MyRecipe, MyRecipeAdmin)