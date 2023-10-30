import { Player } from "./Player.js"
import { Enemy } from "./Enemy.js"

export class Game {
    enemies: Array<Enemy>;
    player: Player;
    status = 'running' || 'finished';
    startScreen: HTMLDivElement;
    gameScreen: HTMLDivElement;
    endScreen: HTMLDivElement;
    gameBoard: HTMLDivElement;
    constructor() {
        this.enemies = [];
        this.player = new Player();
        this.status = 'running';
        this.startScreen = document.getElementById("start-screen") as HTMLDivElement;
        this.gameScreen = document.getElementById("game-screen") as HTMLDivElement;
        this.endScreen = document.getElementById("end-screen") as HTMLDivElement;
        this.gameBoard = document.getElementById("game-board") as HTMLDivElement;
    }
    start() {
        this.gameLoop()
    }
    end() { }
    gameLoop() {
        if (this.status == 'finished') return;
        this.update()
        window.requestAnimationFrame(() => this.gameLoop())
    }
    update() {
        if (this.player.lives <= 0) this.status == 'finished';

        // spawn new enemy
        if (this.enemies.length == 0 && Math.random() > 0.75) {
            let newEnemy = new Enemy(this.gameBoard);
            this.enemies.push(newEnemy);
        }

    }
}