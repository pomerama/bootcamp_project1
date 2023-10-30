import { Player } from "./Player.js"
import { Enemy } from "./Enemy.js"
import { Bullet } from "./Bullet.js"

export class Game {
    enemies: Array<Enemy>;
    player: Player;
    bullets: Array<Bullet>;
    status = 'running' || 'finished';
    startScreen: HTMLDivElement;
    gameScreen: HTMLDivElement;
    endScreen: HTMLDivElement;
    gameBoard: HTMLDivElement;
    gameBoardWidth: number;
    gameBoardHeight: number;
    gameInfo: HTMLDivElement;
    constructor() {
        this.enemies = [];
        this.bullets = []
        this.status = 'running';
        this.startScreen = document.getElementById("start-screen") as HTMLDivElement;
        this.gameScreen = document.getElementById("game-screen") as HTMLDivElement;
        this.endScreen = document.getElementById("end-screen") as HTMLDivElement;
        this.gameBoard = document.getElementById("game-board") as HTMLDivElement;
        this.gameInfo = document.getElementById("game-info") as HTMLDivElement;
        this.gameBoardWidth = 800;
        this.gameBoardHeight = 600;

        this.gameBoard.style.width = `${this.gameBoardWidth}px`;
        this.gameBoard.style.height = `${this.gameBoardHeight}px`;
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateRows = '1fr auto';
        this.gameBoard.style.border = '1px solid brown';

        this.player = new Player(this.gameBoard);
        let newBullet = new Bullet(this.gameBoard);
        this.bullets.push(newBullet);
    }
    start() {
        this.status = 'running';
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "grid";
        this.endScreen.style.display = "none";
        this.gameInfo.style.display = 'block';
        this.gameLoop()
    }
    end() {
        this.status = 'finished';
        this.player.element.remove();
        this.enemies.forEach((en) => {
            en.element.remove();
        })
        this.enemies = [];
        this.bullets = [];
        this.gameScreen.style.display = 'none';
        this.gameInfo.style.display = 'none';
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
            // check for collission with player
            let playerBox = this.player.element.getBoundingClientRect();
            let enemyBox = enemy.element.getBoundingClientRect();
            if (this.didCollide(playerBox, enemyBox)) {
                this.player.lives--;
                enemy.element.remove();
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
            // enemy moved out of screen
            if (enemy.left <= -this.gameBoardWidth) {
                enemy.element.remove();
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
            // check for collission with bullet

            if (this.bullets.length > 0) {
                let currentBullet = this.bullets[0];
                let bulletBox = currentBullet.element.getBoundingClientRect();
                if (this.didCollide(bulletBox, enemyBox)) {
                    this.player.enemiesKilled++;
                    enemy.element.remove();
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    currentBullet.element.remove();
                    this.bullets.splice(this.bullets.indexOf(currentBullet), 1);
                }
            }
        });

        if (this.bullets.length > 0) {
            let currentBullet = this.bullets[0];
            let bulletBox = currentBullet.element.getBoundingClientRect();
            if (bulletBox.left >= this.gameBoardWidth) {
                console.log("bullet left screen")
                currentBullet.element.remove();
                this.bullets.splice(this.bullets.indexOf(currentBullet), 1);
            }
        }

        this.updateLivesKills();
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

        livesDisplay.innerHTML = `Lives: ${this.player.lives}`;
        enemiesKilledDisplay.innerHTML = `Enemies killed: ${this.player.enemiesKilled}`;
    }
    shootBullet() {
        let currentBullet: Bullet;
        if (this.bullets.length > 0) {
            currentBullet = this.bullets[0] as Bullet;
        } else {
            currentBullet = new Bullet(this.gameBoard);
            this.bullets.push(currentBullet);
        }
        currentBullet.element.style.display = 'block';
        currentBullet.element.style.left = `${this.player.element.getBoundingClientRect().right}px`;
        currentBullet.element.style.top = `${this.player.element.getBoundingClientRect().top + 50}px`;
        currentBullet.element.style.animation = 'bullet-animation 0.7s linear'
    }
}