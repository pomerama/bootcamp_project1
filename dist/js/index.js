import { Game } from "./Game.js";
// Game
let game;
let chronometer;
const startGameButton = document.getElementById("start-game-button");
const endGameButton = document.getElementById("end-game-button");
const restartGameButton = document.getElementById("restart-game-button");
startGameButton.addEventListener("click", button => {
    game = new Game();
    chronometer = game.chronometer;
    chronometer.reset();
    chronometer.start(printTime);
    game.start();
});
endGameButton.addEventListener("click", button => {
    chronometer.stop();
    game.end();
});
restartGameButton.addEventListener("click", button => {
    game.end();
    game = new Game();
    chronometer = game.chronometer;
    chronometer.reset();
    chronometer.start(printTime);
    game.start();
});
document.addEventListener("keypress", event => {
    if (event.code == 'KeyW') {
        game.player.jump();
    }
    if (event.code == 'Space') {
        game.shootBullet();
    }
});
// Chronometer
let minDec = document.getElementById('minDec');
let minUni = document.getElementById('minUni');
let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni');
let centisecDec = document.getElementById('centisecDec');
let centisecUni = document.getElementById('centisecUni');
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
