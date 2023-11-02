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
   albumName = document.querySelector('.player-album')


const songs = ["What I've Done", "Нервы"];
const albums = ["Minutes to Midnight", "Всё что вокруг"]

const cbox = document.querySelectorAll('.flex-elem');

function songChoice() {
   $(".song-single").on('click', function () {
      var text = $(this).find('.name').text();
      var textAlbum = $(this).find('.album').text();
      loadSong(text, textAlbum);
      playSong();
   })

}


//Load
function loadSong(song, album) {
   title.innerHTML = song
   albumName.innerHTML = album,
      audio.src = './audio/' + song + '.mp3'
   coverImage.src = 'img/' + album + '.jpg'
}

loadSong(songChoice(), "g");

//Play
function playSong() {
   player.classList.add('play');
   cover.classList.add('active__img');
   imgSrc.classList.remove('fa-play');
   imgSrc.classList.add('fa-pause');
   audio.play();
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
