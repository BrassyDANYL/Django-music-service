from django.urls import path
from . import views
from .views import Search

urlpatterns = [
    path('', views.index),
    path('search/', Search.as_view(), name='search'),
    path('artists/', views.artists, name='artists'),
    path('artist/<int:singer_id>/', views.artist_detail, name='artist_detail'),
    path('album/<int:album_id>/', views.album_songs, name='album_songs'),
    path('genres/', views.genres, name="genres"),
    path('genres/<int:genre_id>/', views.genre_detail, name='genre_detail'),
]
