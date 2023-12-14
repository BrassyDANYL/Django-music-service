from django.db import models

class Genre(models.Model):
    name = models.CharField('Genre', max_length=100)

    def __str__(self):
        return self.name

class Singer(models.Model):
    name = models.CharField("Singer's name", max_length=100)
    photo = models.ImageField("Singer's photo", upload_to='img/singer/', default='static/img/singer/default.jpg')
    banner_photo = models.ImageField("Singer's banner photo", upload_to='img/singer/banners/', default='static/img/singer/default_banner.jpg')

    def __str__(self):
        return self.name

class Album(models.Model):
    name = models.CharField("Album name", max_length=100)
    photo = models.ImageField("Album photo", upload_to='img/album/', default='static/img/album/default.jpg')
    artist = models.ForeignKey(Singer, on_delete=models.CASCADE)
    release_year = models.PositiveIntegerField("Release Year", null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.artist} ({self.release_year})"

class Song(models.Model):
    song_name = models.CharField('Song name', max_length=100)
    singers = models.ManyToManyField(Singer, related_name='songs')
    albums = models.ManyToManyField(Album, related_name='songs')
    genres = models.ManyToManyField(Genre, related_name='songs')  
    pub_date = models.DateTimeField('Publication Date', auto_now_add=True)
    audio_file = models.FileField('Audio File', upload_to='audio/', default='static/audio/default_audio.mp3')

    def __str__(self):
        return self.song_name
