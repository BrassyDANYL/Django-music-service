# Generated by Django 4.2.6 on 2023-10-29 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_items', '0005_alter_album_photo_alter_singer_photo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='photo',
            field=models.ImageField(default='', upload_to='static/img/album', verbose_name='Album photo'),
        ),
        migrations.AlterField(
            model_name='singer',
            name='photo',
            field=models.ImageField(default='', upload_to='static/img/singer', verbose_name="Singer's photo"),
        ),
        migrations.AlterField(
            model_name='song',
            name='audio_file',
            field=models.FileField(default='default_audio.mp3', upload_to='./audio/', verbose_name='Audio File'),
        ),
    ]
