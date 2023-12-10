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
   songerName = document.querySelector('.player-album'),
   timer = document.querySelector('.timer'),
   songer = document.querySelector('.author')

const cbox = document.querySelectorAll('.song-single');

function songChoice() {
   $(".song-single").on('click', function () {
      $(".song-single").removeClass('active');
      $(this).addClass('active');
      var text = $(this).find('.name').text();
      var songerName = $(this).find('.singer').text();
      var path = $(this).data('audio');
      var albumPath = $(this).find('.album-photo').find('img').attr('src');
      var playBtn = $(this).find('.play-button');
      playBtn.removeClass('fa-play');
      playBtn.addClass('fa-pause');
      console.log(albumPath);
      loadSong(text, songerName, path, albumPath);
      console.log(path);
      playSong();
   })

}


//Load
function loadSong(song, songer, path, albumPath) {
   title.innerHTML = song,
   songerName.innerHTML = songer,
   audio.src = path,
   coverImage.src = albumPath
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
   console.log(nextSongBox);
   $(".song-single").removeClass('active');
   nextSongBox.classList.add('active');
   const nextSongTitle = nextSongBox.querySelector('.name').textContent;
   const nextSongArtist = nextSongBox.querySelector('.singer').textContent;
   const nextSongPath = nextSongBox.getAttribute('data-audio');
   const nextSongAlbumPath = nextSongBox.querySelector('.album-photo img').getAttribute('src');

   loadSong(nextSongTitle, nextSongArtist, nextSongPath, nextSongAlbumPath);

   playSong();


}
prevBtn.addEventListener('click', prevSong);
//Next Song
function nextSong() {
   pauseSong();

   const currentSongIndex = Array.from(cbox).findIndex(box => box.classList.contains('active'));
   const nextSongIndex = currentSongIndex === cbox.length - 1 ? 0 : currentSongIndex + 1;
   const nextSongBox = cbox[nextSongIndex];
   console.log(nextSongBox);
   $(".song-single").removeClass('active');
   nextSongBox.classList.add('active');
   const nextSongTitle = nextSongBox.querySelector('.name').textContent;
   const nextSongArtist = nextSongBox.querySelector('.singer').textContent;
   const nextSongPath = nextSongBox.getAttribute('data-audio');
   const nextSongAlbumPath = nextSongBox.querySelector('.album-photo img').getAttribute('src');

   loadSong(nextSongTitle, nextSongArtist, nextSongPath, nextSongAlbumPath);

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

function startPlayAlbum() {
   const albumPlayButton = document.querySelector('.play-album');
   addEventListener()
}



