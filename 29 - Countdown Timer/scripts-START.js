let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const alarm = document.querySelector('#alarm');

function handleTimer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const end = now + seconds*1000;
    const finalEnd = new Date(end);

    endTime.textContent = `${finalEnd.getHours()}:${finalEnd.getMinutes()}`;
    displayTimeLeft(seconds);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) /1000);
        
        if(secondsLeft < 0 ) {
            clearInterval(countdown);
            alarm.play();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
    
}

function displayTimeLeft(totalSeconds) {
    let secondsLeft = totalSeconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = Math.floor(secondsLeft % 3600);
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft = Math.floor(secondsLeft % 60);
    const seconds = secondsLeft % 60;
    
    let timer = '';
    timer += `${hours !== 0 ? `${hours}:` : ''}`;  
    timer += `${minutes < 10 ? `0${minutes}:`: `${minutes}:`}`;
    timer += `${seconds < 10 ? `0${seconds}`: `${seconds}`}`;
    
    timerDisplay.textContent = `${timer}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    handleTimer(seconds);
    console.log(seconds);
}

buttons.forEach(b => b.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value * 60;
    handleTimer(mins);
    this.reset();
})
document.dateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = this.date.value;
    const actualDate = parseInt(Date.parse(date));
    console.log(actualDate);
    
    handleTimer(actualDate / 1000);
    ///this.reset();
})