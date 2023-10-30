import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";
export class Game {
    constructor() {
        this.status = 'running' || 'finished';
        this.enemies = [];
        this.player = new Player();
        this.status = 'running';
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("end-screen");
        this.gameBoard = document.getElementById("game-board");
    }
    start() {
        this.gameLoop();
    }
    end() { }
    gameLoop() {
        if (this.status == 'finished')
            return;
        this.update();
        window.requestAnimationFrame(() => this.gameLoop());
    }
    update() {
        if (this.player.lives <= 0)
            this.status == 'finished';
        // spawn new enemy
        if (this.enemies.length == 0 && Math.random() > 0.75) {
            let newEnemy = new Enemy(this.gameBoard);
            this.enemies.push(newEnemy);
        }
    }
}
