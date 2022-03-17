from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)