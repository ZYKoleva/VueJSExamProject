# Generated by Django 3.2.12 on 2022-03-03 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Име', max_length=100)),
                ('image', models.ImageField(blank=True, upload_to='images')),
                ('description', models.TextField(blank=True, max_length=1000)),
                ('can_be_cooked', models.BooleanField(default=True)),
                ('recipe_ingredient', models.JSONField(blank=True)),
                ('created_by', models.IntegerField(default=0)),
            ],
        ),
    ]