const player = document.querySelector('.player'),
   playBtn = document.querySelector('.play'),
   prevBtn = document.querySelector('.prev'),
   nextBtn = document.querySelector('.next'),
   audio = document.querySelector('.audio'),
   progressContainer = document.querySelector('.progress__container'),
   progress = document.querySelector('.progress'),
   title = document.querySelector('.song'),
   cover = document.querySelector('.cover'),
   coverImage = document.querySelector('.cover__img'),
   imgSrc = document.querySelector('.img__src'),
   albumName = document.querySelector('.player-album'),
   timer = document.querySelector('.timer'),
   songer = document.querySelector('.author')

const cbox = document.querySelectorAll('.song-single');

function songChoice() {
   $(".song-single").on('click', function () {
      $(".song-single").removeClass('active');
      $(this).addClass('active');
      var text = $(this).find('.name').text();
      var textAlbum = $(this).find('.album').text();
      var songerName = $(this).find('.singer').text();
      var path = $(this).data('audio');
      loadSong(text, textAlbum, songerName, path);
      console.log(path);
      playSong();
   })

}


//Load
function loadSong(song, album, songer, path) {
   title.innerHTML = song,
   albumName.innerHTML = songer,
   audio.src = path
   // coverImage.src = 'img/albums/' + album + '.jpg'
}

loadSong(songChoice(), "g");

//Play
function playSong() {
   player.classList.add('play');
   player.classList.remove('player-hidden');
   player.classList.add('player-show');
   cover.classList.add('active__img');
   imgSrc.classList.remove('fa-play');
   imgSrc.classList.add('fa-pause');
   audio.play();
   $('.flex-container').css('padding-bottom', '120px');
}

//Pause
function pauseSong() {
   player.classList.remove('play'),
      imgSrc.classList.add('fa-play'),
      imgSrc.classList.remove('fa-pause'),
      cover.classList.remove('active__img'),
      audio.pause();
}
playBtn.addEventListener('click', () => {
   const isPlaying = player.classList.contains('play');

   if (isPlaying) {
      pauseSong();
   }
   else {
      playSong();
   }
});
//Prev Song
function prevSong() {
   pauseSong();

   const currentSongIndex = Array.from(cbox).findIndex(box => box.classList.contains('active'));
   const nextSongIndex = currentSongIndex === 0 ? cbox.length - 1 : currentSongIndex - 1;
   const nextSongBox = cbox[nextSongIndex];
   $(".flex-elem").removeClass('active');
   nextSongBox.classList.add('active');
   const nextSongTitle = nextSongBox.querySelector('.name').textContent;
   const nextSongAlbum = nextSongBox.querySelector('.album').textContent;
   const nextSongArtist = nextSongBox.querySelector('.author').textContent;

   loadSong(nextSongTitle, nextSongAlbum, nextSongArtist);

   playSong();


}
prevBtn.addEventListener('click', prevSong);
//Next Song
function nextSong() {
   pauseSong();

   const currentSongIndex = Array.from(cbox).findIndex(box => box.classList.contains('active'));
   const nextSongIndex = currentSongIndex === cbox.length - 1 ? 0 : currentSongIndex + 1;
   const nextSongBox = cbox[nextSongIndex];
   $(".flex-elem").removeClass('active');
   nextSongBox.classList.add('active');
   const nextSongTitle = nextSongBox.querySelector('.name').textContent;
   const nextSongAlbum = nextSongBox.querySelector('.album').textContent;
   const nextSongArtist = nextSongBox.querySelector('.author').textContent;

   loadSong(nextSongTitle, nextSongAlbum, nextSongArtist);

   playSong();
}

nextBtn.addEventListener('click', nextSong);
//Progress bar
function updateProgress(e) {
   const { duration, currentTime } = e.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = progressPercent + "%";
   var sec_num = audio.currentTime;// don't forget the second param
   var hours = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = Math.floor((sec_num - (hours * 3600) - (minutes * 60)));

   if (minutes < 10) { minutes = "0" + minutes; }
   if (seconds < 10) { seconds = "0" + seconds; }
   timer.innerHTML = minutes + ':' + seconds;
   if (duration == currentTime) {
      nextSong();
   }
}
audio.addEventListener('timeupdate', updateProgress);

//Set progress 
function setProgress(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;
   audio.currentTime = (clickX / width) * duration;

}
progressContainer.addEventListener('click', setProgress);


//change header color
$(function () {
   $(document).scroll(function () {
      var $nav = $(".header");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
   });
})

//burger
$('.burger').on('click', function () {

   $('.header-menu').toggleClass('open-burger');

});
//loadmore 
let offset = 3; // Початкове значення змінної offset

function loadMore() {
   // Відправити AJAX-запит на сервер з параметром offset
   $.ajax({
      url: 'loadmore.php',
      type: 'POST',
      data: { offset: offset },
      success: function (data) {
         // Додати отримані дані до списку пісень
         $('.flex-container').append(data);
         // Збільшити значення змінної offset
         offset += 3;
      }
   });
}

// Відслідковувати скролінг сторінки
$(window).scroll(function () {
   // Якщо користувач докрутив до кінця списку
   if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      $('.load-more-container').css('display', 'none');
   }
});

// Відслідковувати клік на кнопку "Load More"
$('.load-more-btn').click(function () {
   loadMore();
});






