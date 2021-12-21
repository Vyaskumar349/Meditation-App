
const app=()=>{
    const song=document.querySelector('.song');
const play=document.querySelector('.play');
const outline=document.querySelector('.moving-outline circle');
const video=document.querySelector('.vid-container video');
const timeSelect=document.querySelectorAll('.time-select button');
const sound=document.querySelectorAll('.sound-picker button');
const timeDisplay=document.querySelector('.time-display');

const outlineLength=outline.getTotalLength();
//console.log(outlineLength);

outline.style.strokeDasharray=outlineLength;
outline.style.strokeDashoffset=outlineLength;
let fakeDuration=600;

play.addEventListener('click',()=>{
checkSongPlaying(song);
});


sound.forEach(option=>{
option.addEventListener('click',function(){
    song.src=this.getAttribute('data-sound');
    video.src=this.getAttribute('data-video');
     checkSongPlaying(song);
})
})
timeSelect.forEach(option=>{
    option.addEventListener('click',function(){
        fakeDuration=this.getAttribute('data-time');
        timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
    })
});

let checkSongPlaying=(song)=>{
    if(song.paused){
        song.play();
        video.play();
        play.src="./svgs/newpause.svg"
    }
    else{
        song.pause();
        video.pause();
        play.src="./svgs/media-play.svg";
    }
  
};

song.ontimeupdate=()=>{
    let currentTime=song.currentTime;
    let elapsed=fakeDuration-currentTime;
    let seconds=Math.floor(elapsed % 60);
    let minutes=Math.floor(elapsed / 60);

let progress=outlineLength-(currentTime/fakeDuration)*outlineLength;
outline.style.strokeDashoffset=progress;
timeDisplay.textContent=`${minutes}:${seconds}`;
if(song.currentTime >=fakeDuration){
    song.pause();
    song.currentTime=0;
    play.src="./svgs/media-play.svg";
    video.pause();
}
}
}


app();



