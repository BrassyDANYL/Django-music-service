# Generated by Django 4.2.7 on 2023-12-03 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_items', '0009_alter_album_photo_alter_singer_photo_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Genre')),
            ],
        ),
        migrations.AddField(
            model_name='song',
            name='genres',
            field=models.ManyToManyField(related_name='songs', to='music_items.genre'),
        ),
    ]
