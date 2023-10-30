import { Game } from "./Game.js";
let game;
const startGameButton = document.getElementById("start-game-button");
const endGameButton = document.getElementById("end-game-button");
const restartGameButton = document.getElementById("restart-game-button");
startGameButton.addEventListener("click", button => {
    game = new Game();
    game.start();
});
endGameButton.addEventListener("click", button => {
    game.end();
});
restartGameButton.addEventListener("click", button => {
    game.end();
    game = new Game();
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
