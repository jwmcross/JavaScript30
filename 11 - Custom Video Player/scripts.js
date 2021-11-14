
const player = document.querySelector('.player');
const video = player.querySelector('.viewer') 
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreenBtn = player.querySelectorAll('.player__button.fullscreen');
const ranges = player.querySelectorAll('.player__slider');

/* Functions */
function handlePlay()
{
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton()
{
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip()
{
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

function handleRangeUpdate()
{
    video[this.name] = this.value;
}

function handleProgress()
{
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e)
{
    const x = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = x;

}

function toggleFullScreen()
{
    fullscreenMode = !fullscreenMode;
    if(fullscreenMode) {
        video.requestFullscreen();
    }
}

/* Listeners */
video.addEventListener('click', handlePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', handlePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let fullscreenMode = false;
skipButtons.forEach(b => b.addEventListener('click', skip));
fullscreenBtn.forEach(b => b.addEventListener('click', toggleFullScreen));


ranges.forEach(r => r.addEventListener('change', handleRangeUpdate));
ranges.forEach(r => r.addEventListener('mousemove', handleRangeUpdate));
