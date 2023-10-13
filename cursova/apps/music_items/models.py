from django.db import models

class Singer(models.Model):
    name = models.CharField("Singer's name", max_length=100)
    photo = models.ImageField("Singer's photo", default='', upload_to='static/img/singer')

class Album(models.Model):
    name = models.CharField("Album name", max_length=100)
    photo = models.ImageField("Album photo", default='', upload_to='static/img/album')
    artist = models.ForeignKey(Singer, on_delete=models.CASCADE)

class Song(models.Model):
    song_name = models.CharField('Song name', max_length=100)
    singers = models.ManyToManyField(Singer, related_name='songs')
    albums = models.ManyToManyField(Album, related_name='songs')
