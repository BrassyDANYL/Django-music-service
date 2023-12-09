from django.shortcuts import render
from .models import Singer, Song, Album
from django.views.generic import ListView

def index(request):
   songs = Song.objects.all()
   return render(request, 'music_items/index.html', {'songs': songs})

def artists(request):
    return render(request, 'music_items/artists.html')
class Search(ListView):
    model = Song  # Модель для пошуку
    template_name = 'music_items/search-results.html'  # Шаблон для відображення результатів
    context_object_name = 'search_results'  # Назва змінної контексту
    paginate_by = 10  # Кількість результатів на сторінці

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
