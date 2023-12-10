# Generated by Django 4.2.7 on 2023-12-09 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_items', '0010_genre_song_genres'),
    ]

    operations = [
        migrations.AddField(
            model_name='singer',
            name='banner_photo',
            field=models.ImageField(default='static/img/singer/default_banner.jpg', upload_to='img/singer/banners/', verbose_name="Singer's banner photo"),
        ),
    ]
