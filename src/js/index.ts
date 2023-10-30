import { Game } from "./Game.js"

let game: Game;

const startScreen = document.getElementById("start-screen") as HTMLDivElement;
const gameScreen = document.getElementById("game-screen") as HTMLDivElement;
const endScreen = document.getElementById("end-screen") as HTMLDivElement;

const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;
const endGameButton = document.getElementById("end-game-button") as HTMLButtonElement;
const restartGameButton = document.getElementById("restart-game-button") as HTMLButtonElement;

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
})

restartGameButton.addEventListener("click", button => {
    startScreen.style.display = "grid";
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
})

document.addEventListener("keypress", event => {
    if (event.code == 'KeyW') {
        game.player.jump();
    }
    if (event.code == 'Space') {
        game.shootBullet();
    }
})