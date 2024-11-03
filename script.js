// Select necessary elements
const video = document.querySelector('.viewer');
const playButton = document.querySelector('.toggle');
const volumeControl = document.querySelector('.volume');
const speedControl = document.querySelector('.playbackSpeed');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('.skip');

// Play/pause toggle
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update the play/pause button symbol
function updatePlayButton() {
    playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Update volume
function handleVolumeChange() {
    video.volume = volumeControl.value;
}

// Update playback speed
function handleSpeedChange() {
    video.playbackRate = speedControl.value;
}

// Skip forward or backward
function skip() {
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

// Update the progress bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// Allow clicking on the progress bar to seek
function scrub(event) {
    const scrubTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', updateProgress);

volumeControl.addEventListener('input', handleVolumeChange);
speedControl.addEventListener('input', handleSpeedChange);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
