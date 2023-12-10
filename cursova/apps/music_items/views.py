from django.shortcuts import render, get_object_or_404
from .models import Singer, Song, Album
from django.views.generic import ListView
from random import shuffle

def index(request):
   songs = Song.objects.all()
   shuffled_songs = list(songs)
   shuffle(shuffled_songs)
   return render(request, 'music_items/index.html', {'songs': shuffled_songs})

def artists(request):
    singers = Singer.objects.all()
    return render(request, 'music_items/artists.html', {'singers': singers})

def artist_detail(request, singer_id):
    singer = get_object_or_404(Singer, pk=singer_id)
    albums = Album.objects.filter(artist=singer)
    return render(request, 'music_items/artist_detail.html', {'singer': singer, 'albums': albums})

def album_songs(request, album_id):
    album = get_object_or_404(Album, id=album_id)
    songs = album.songs.all()  # Припустимо, що у вас є зворотні зв'язки для пісень у моделі Album
    song_count = songs.count()  
    return render(request, 'music_items/album_songs.html', {'album': album, 'songs': songs, 'song_count': song_count})

class Search(ListView):
    model = Song  
    template_name = 'music_items/search-results.html' 
    context_object_name = 'search_results'  
    paginate_by = 10 

    def get_queryset(self):
        query = self.request.GET.get('q')
        if query:
            # Ваша логіка пошуку. Тут ви можете виконувати пошук по піснях, співаках і альбомах за введеним пошуковим запитом.
            return Song.objects.filter(song_name__icontains=query)
        return Song.objects.none()  # Пустий результат, якщо пошуковий запит порожній

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['q'] = self.request.GET.get('q')
        return context
