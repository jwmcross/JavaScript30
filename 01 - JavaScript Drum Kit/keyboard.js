function playSound(event) {
    //Get the audio element matching the dom key pressed
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if(!audio) {
        return;
    } else if(audio) {
        //Get the dom element. Add class effects
        const keyBtn = document.querySelector(`div[data-key="${event.keyCode}"]`);
        keyBtn.classList.add('playing');
        //Return play time to the start
        audio.currentTime = 0;
        audio.play();
    }
}

function endTransition(event) {
    //The element does not contains transform css (i.e playing class)
    if(event.propertyName !== 'transform') return;
    //this=> refering to the event dom triggering this func
    this.classList.remove('playing');
}

//Add event listeners only for sound keys
const soundkeys = document.querySelectorAll('.key');
soundkeys.forEach(key => key.addEventListener('transitionend', endTransition));
window.addEventListener('keydown', playSound);

