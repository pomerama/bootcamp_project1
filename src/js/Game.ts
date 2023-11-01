import { Player } from "./Player.js"
import { Enemy } from "./Enemy.js"
import { Bullet } from "./Bullet.js"
import { Chronometer } from "./Chronometer.js";

export class Game {
    enemies: Array<Enemy>;
    player: Player;
    bullets: Array<Bullet>;
    gameStats: Array<any>;
    chronometer: Chronometer;
    status = 'running' || 'finished';
    startScreen: HTMLDivElement;
    gameScreen: HTMLDivElement;
    endScreen: HTMLDivElement;
    gameBoard: HTMLDivElement;
    gameBoardWidth: number;
    gameBoardHeight: number;
    gameInfo: HTMLDivElement;
    won: boolean;

    constructor() {
        this.enemies = [];
        this.bullets = [];
        this.gameStats = [];
        this.status = 'running';
        this.won = false;

        this.chronometer = new Chronometer();

        this.startScreen = document.querySelector(".start.screen") as HTMLDivElement;
        this.gameScreen = document.querySelector(".game.screen") as HTMLDivElement;
        this.endScreen = document.querySelector(".end.screen") as HTMLDivElement;
        this.gameBoard = document.getElementById("game-board") as HTMLDivElement;
        this.gameInfo = document.querySelector(".game-info") as HTMLDivElement;
        this.initialScreensVisibility(this.startScreen, this.gameScreen, this.endScreen, this.gameBoard, this.gameInfo);

        this.gameBoardWidth = 1000;
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

    initialScreensVisibility(startScreen: HTMLDivElement,
        gameScreen: HTMLDivElement,
        endScreen: HTMLDivElement,
        gameBoard: HTMLDivElement,
        gameInfo: HTMLDivElement) {
        startScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        endScreen.style.display = 'none';
        gameBoard.style.display = 'none';
        // gameInfo.style.display = 'none';

    }
    start() {
        this.status = 'running';
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "grid";
        this.endScreen.style.display = "none";
        this.gameInfo.style.display = 'block';
        this.gameLoop()
    }

    loadGameStats() {
        const savedGameStats = localStorage.getItem("gameStats")
        if ((savedGameStats) && (savedGameStats.length > 0)) {
            const parsedGameStats = JSON.parse(savedGameStats);
            for (let i = 0; i < parsedGameStats.length; i++) {
                this.gameStats.push(parsedGameStats[i]);
            }
        }
    }

    saveGameStats() {
        this.loadGameStats();
        const currentGameStats = {
            name: `${this.player.name}`,
            enemiesKilled: this.player.enemiesKilled,
            time: this.chronometer.split(),
        }
        this.gameStats.push(currentGameStats);
        localStorage.setItem("gameStats", JSON.stringify(this.gameStats));
    }

    displayGameStats() {
        let highScoreContainer = document.getElementById("high-score") as HTMLDivElement;
        let highScoreUl = document.createElement("ul");

        for (let i = this.gameStats.length - 1; i >= 0; i--) {
            if (this.gameStats.length - i <= 10) {
                let highScoreLi = document.createElement("li");
                highScoreLi.innerHTML = `${this.gameStats[i].name} | ${this.gameStats[i].enemiesKilled} | ${this.gameStats[i].time}`;
                highScoreUl.appendChild(highScoreLi);
            }
        }
        highScoreContainer.appendChild(highScoreUl);
    }

    wonLostDisplay() {
        if (this.won) {
            let wonDisplay = document.getElementById("end-won") as HTMLElement;
            wonDisplay.style.display = 'block'
            let lostDisplay = document.getElementById("end-lost") as HTMLElement;
            lostDisplay.style.display = 'none'
        } else {
            let wonDisplay = document.getElementById("end-won") as HTMLElement;
            wonDisplay.style.display = 'none'
            let lostDisplay = document.getElementById("end-lost") as HTMLElement;
            lostDisplay.style.display = 'block'
        }
    }

    nameEnemiesKilledTimeDisplay() {
        let nameDisplays = document.querySelectorAll(".player-name") as NodeListOf<HTMLElement>
        Array.from(nameDisplays).forEach((display: HTMLElement) => {
            display.innerHTML = `${this.player.name} `;
        })

        let endEnemiesKilledDisplay = document.getElementById("end-enemies-killed") as HTMLElement;
        endEnemiesKilledDisplay.innerHTML = `${this.player.enemiesKilled} `;
        let endTimeDisplay = document.getElementById("end-time") as HTMLElement;
        endTimeDisplay.innerHTML = `${this.chronometer.split()} `
    }

    end() {
        this.status = 'finished';

        this.wonLostDisplay();

        this.nameEnemiesKilledTimeDisplay();

        this.saveGameStats();

        this.displayGameStats();

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
        if (this.chronometer.getMinutes() >= 1) this.won = true; // allow player to play further
        if (this.player.enemiesKilled >= 10) this.won = true;

        // spawn new enemy
        if (this.enemies.length == 0 && Math.random() > 0.5) {
            let newEnemy = new Enemy(this.gameBoard);
            this.enemies.push(newEnemy);
        }

        this.enemies.forEach(enemy => {
            enemy.move();

            if (Math.random() > 0.99) {
                enemy.jump();
            }

            // check for collission with player
            let playerBox = this.player.element.getBoundingClientRect();
            let enemyBox = enemy.element.getBoundingClientRect();
            if (this.didCollide(playerBox, enemyBox)) {
                this.player.lives--;
                enemy.element.remove();
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                let enemeyCollisionSFX = document.getElementById("sfx-enemy-collision") as HTMLAudioElement;
                enemeyCollisionSFX.play();
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
        let livesDisplay = document.getElementById("info-lives") as HTMLElement;
        livesDisplay.innerHTML = `${this.player.lives} `;
        let enemiesKilledDisplay = document.getElementById("info-enemies-killed") as HTMLElement;
        enemiesKilledDisplay.innerHTML = `${this.player.enemiesKilled} `
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
        currentBullet.element.style.left = `${this.player.element.getBoundingClientRect().right} px`;
        currentBullet.element.style.top = `${this.player.element.getBoundingClientRect().top + 50} px`;
        currentBullet.element.style.animation = 'bullet-animation 0.7s linear'
    }
}