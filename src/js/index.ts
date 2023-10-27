import { Player } from "./Player.js"

const player = new Player();

const startScreen = document.getElementById("start-screen") as HTMLDivElement;
const gameScreen = document.getElementById("game-screen") as HTMLDivElement;
const endScreen = document.getElementById("end-screen") as HTMLDivElement;

const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;
const endGameButton = document.getElementById("end-game-button") as HTMLButtonElement;
const restartGameButton = document.getElementById("restart-game-button") as HTMLButtonElement;

const playerChar = document.querySelector(".player") as HTMLDivElement;

startGameButton.addEventListener("click", button => {
    startScreen.style.display = "none";
    gameScreen.style.display = "grid";
    endScreen.style.display = "none";
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
    if (event.key == 'w') {
        player.jump();
    }
})