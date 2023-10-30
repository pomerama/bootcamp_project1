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
    gameBoardWidth: number;
    gameBoardHeight: number;
    constructor() {
        this.enemies = [];
        this.player = new Player();
        this.status = 'running';
        this.startScreen = document.getElementById("start-screen") as HTMLDivElement;
        this.gameScreen = document.getElementById("game-screen") as HTMLDivElement;
        this.endScreen = document.getElementById("end-screen") as HTMLDivElement;
        this.gameBoard = document.getElementById("game-board") as HTMLDivElement;
        this.gameBoardWidth = 800;
        this.gameBoardHeight = 600;

        this.gameBoard.style.width = `${this.gameBoardWidth}px`;
        this.gameBoard.style.height = `${this.gameBoardHeight}px`;
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateRows = '1fr auto';
        this.gameBoard.style.border = '1px solid brown';

    }
    start() {
        this.gameLoop()
    }
    end() {
        this.status = 'finished';
        this.player.element.remove();
        this.enemies.forEach((en) => {
            en.element.remove();
        })
        this.gameScreen.style.display = 'none';
        this.endScreen.style.display = 'block';
    }
    gameLoop() {
        if (this.status == 'finished') return;
        this.update()
        window.requestAnimationFrame(() => this.gameLoop())
    }
    update() {
        if (this.player.lives <= 0) this.end();

        // spawn new enemy
        if (this.enemies.length == 0 && Math.random() > 0.5) {
            let newEnemy = new Enemy(this.gameBoard);
            this.enemies.push(newEnemy);
        }

        this.enemies.forEach(enemy => {
            enemy.move();

            // check for collission
            let playerBox = this.player.element.getBoundingClientRect();
            let enemyBox = enemy.element.getBoundingClientRect();
            if (this.didCollide(playerBox, enemyBox)) {
                enemy.element.remove();
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                this.player.lives--;

            }

            // enemy moved out of screen
            if (enemy.left <= -this.gameBoardWidth) {
                enemy.element.remove();
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
            this.updateLivesKills();
        })
    }
    didCollide(firstBox: DOMRect, secondBox: DOMRect) {
        if (firstBox.right >= secondBox.left &&
            firstBox.left <= secondBox.right &&
            firstBox.bottom >= secondBox.top &&
            firstBox.top <= secondBox.bottom) {
            return true;
        }
        return false;
    }
    updateLivesKills() {
        let livesDisplay = document.getElementById("lives") as HTMLElement;
        let enemiesKilledDisplay = document.getElementById("enemies-killed") as HTMLElement;

        livesDisplay.innerHTML = `${this.player.lives}`;
        enemiesKilledDisplay.innerHTML = `${this.player.enemiesKilled}`;
    }
}