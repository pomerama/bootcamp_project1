import { Game } from "./Game.js"


// Game
let game: Game = new Game();
let chronometer: any;

const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;
const endGameButton = document.getElementById("end-game-button") as HTMLButtonElement;
const restartGameButton = document.getElementById("restart-game-button") as HTMLButtonElement;
const playerNameInput = document.getElementById("player-name-input") as HTMLInputElement;
const jumpButton = document.getElementById("jump-button") as HTMLButtonElement;
const shootButton = document.getElementById("shoot-button") as HTMLButtonElement;


startGameButton.addEventListener("click", button => {
    let playerName = '';
    if (playerNameInput.value == '') playerName = 'Awesome Player';
    else playerName = playerNameInput.value;
    game.player.name = playerName;
    chronometer = game.chronometer;
    chronometer.reset();
    chronometer.start(printTime);
    game.start();

    document.addEventListener("keypress", event => {
        if (game.status != 'running') return;

        if (event.code == 'KeyW') {
            game.player.jump();
        }
        if (event.code == 'KeyJ') {
            game.shootBullet();
        }
    })
});

endGameButton.addEventListener("click", button => {
    chronometer.stop();
    game.end();
})

restartGameButton.addEventListener("click", button => {
    window.location.reload();
})

jumpButton.addEventListener('click', () => {
    game.player.jump();
})

shootButton.addEventListener('click', () => {
    game.shootBullet();
})

// Chronometer
let minDec = document.getElementById('minDec') as HTMLElement;
let minUni = document.getElementById('minUni') as HTMLElement;
let secDec = document.getElementById('secDec') as HTMLElement;
let secUni = document.getElementById('secUni') as HTMLElement;
let centisecDec = document.getElementById('centisecDec') as HTMLElement;
let centisecUni = document.getElementById('centisecUni') as HTMLElement;

function printTime() {
    printMinutes();
    printSeconds();
    printCentiseconds();
}

function printMinutes() {
    minUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[1];
    minDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[0];
}

function printSeconds() {
    secUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[1];
    secDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0];
}

function printCentiseconds() {
    centisecUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getCentiseconds())[1];
    centisecDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getCentiseconds())[0];
}

// Music

const music = document.getElementById('music') as HTMLAudioElement;
const playPauseButton = document.getElementById('playPauseButton') as HTMLButtonElement;

playPauseButton.addEventListener('click', () => {
    if (!music.paused && music.currentTime > 0) {
        music.pause();
    } else {
        music.play();
    }
});


const muteButton = document.getElementById('mute-all') as HTMLButtonElement;
muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
muteButton.style.background = 'green'
let muted = false;

muteButton.addEventListener('click', (event) => {
    const clickedElement = event.currentTarget as HTMLButtonElement;
    let audioElements = document.querySelectorAll('audio');
    for (let i = 0; i < audioElements.length; i++) {
        let audio = audioElements[i];
        audio.muted = !audio.muted;
    }

    if (!muted) {
        clickedElement.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        clickedElement.style.background = 'red';
    } else {
        clickedElement.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        clickedElement.style.background = 'green';
    }
    muted = !muted;
})

