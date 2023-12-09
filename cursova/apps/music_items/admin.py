from django.contrib import admin

from .models import Album, Singer, Song, Genre

admin.site.register(Album)
admin.site.register(Singer)
admin.site.register(Genre)
admin.site.register(Song) 
