# Generated by Django 3.2.12 on 2022-03-16 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mycookbook', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='description',
            field=models.TextField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(default='../static/images/letscookimage.jpg', upload_to='images'),
        ),
    ]