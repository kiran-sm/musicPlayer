const music = document.querySelector('audio');
const prevBtn = document.querySelector('#pre');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('#curent-time');
const durationTimeEl = document.querySelector('#duration');
// console.log(durationTimeEl);

const songs = [
    {
        name: 'jacinto-1',
        displayname : 'Electic Chill Machine',
        artist : 'jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayname : 'Seven Nation Army (Remix)',
        artist : 'jacinto Design',
    },
    {
        name: 'metric-1',
        displayname : 'Front Row(remix)',
        artist : 'metric /jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayname : 'Goodnight Disco, Queen',
        artist : 'jacinto Design',
    },
]

// console.log(playBtn);

let isPlaying = false;

function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play')
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong() ));

function loadSong(song) {
    title.textContent = song.displayname;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;

}

let songIndex = 0;

loadSong(songs[songIndex]);

function nextSong() {
    songIndex++;
    if(songIndex > songs.length-1)
    songIndex = 0;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {

    
    songIndex--;
    if(songIndex < 0)
    songIndex=songs.length - 1;
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

function updateProgressBar(e) {
    if(isPlaying) {

        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        const progresspercent = (currentTime / duration) * 100;
        progress.style.width = `${progresspercent}%`;

        const durationMinute = Math.floor( duration / 60 );
        console.log(durationMinute);
        console.log('minutes',durationMinute);
        let durationSeconds = Math.floor(duration % 60);
        console.log('seconds',durationSeconds);
        if(durationSeconds < 10)
        durationSeconds = `0${durationSeconds}`;
        
        if(durationSeconds)
        durationTimeEl.textContent=`${durationMinute}:${durationSeconds}`;
       
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) 
        currentSeconds= `0${currentSeconds}`

        currentTimeEl.textContent =` ${currentMinutes}:${currentSeconds}`;

    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log(width,clickX);
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// console.log(nextBtn);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);

music.addEventListener('ended',nextSong)