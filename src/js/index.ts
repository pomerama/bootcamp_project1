import { Game } from "./Game.js"

let game: Game;

const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;
const endGameButton = document.getElementById("end-game-button") as HTMLButtonElement;
const restartGameButton = document.getElementById("restart-game-button") as HTMLButtonElement;

startGameButton.addEventListener("click", button => {
    game = new Game();
    game.start();
});

endGameButton.addEventListener("click", button => {
    game.end();
})

restartGameButton.addEventListener("click", button => {
    game.end()
    game = new Game();
    game.start();
})

document.addEventListener("keypress", event => {
    if (event.code == 'KeyW') {
        game.player.jump();
    }
    if (event.code == 'Space') {
        game.shootBullet();
    }
})