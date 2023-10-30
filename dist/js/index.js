import { Game } from "./Game.js";
let game;
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const startGameButton = document.getElementById("start-game-button");
const endGameButton = document.getElementById("end-game-button");
const restartGameButton = document.getElementById("restart-game-button");
startGameButton.addEventListener("click", button => {
    startScreen.style.display = "none";
    gameScreen.style.display = "grid";
    endScreen.style.display = "none";
    game = new Game();
    game.start();
});
endGameButton.addEventListener("click", button => {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    endScreen.style.display = "grid";
});
restartGameButton.addEventListener("click", button => {
    startScreen.style.display = "grid";
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
});
document.addEventListener("keypress", event => {
    if (event.key == 'w') {
        game.player.jump();
    }
});
