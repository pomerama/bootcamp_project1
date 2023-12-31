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
    won: boolean;

    constructor() {
        this.enemies = [];
        this.bullets = [];
        this.gameStats = []; // elements of type { name: this.player.name, enemiesKilled: this.player.enemiesKilled, time: this.chronometer.split() }
        this.status = 'running';
        this.won = false;

        this.chronometer = new Chronometer();

        this.startScreen = document.querySelector(".start.screen") as HTMLDivElement;
        this.gameScreen = document.querySelector(".game.screen") as HTMLDivElement;
        this.endScreen = document.querySelector(".end.screen") as HTMLDivElement;
        this.gameBoard = document.getElementById("game-board") as HTMLDivElement;
        this.initialScreensVisibility(this.startScreen, this.gameScreen, this.endScreen, this.gameBoard);

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
        gameBoard: HTMLDivElement) {
        startScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        gameBoard.classList.add('hidden');
        endScreen.classList.add('hidden');
    }
    start() {
        this.status = 'running';
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.gameBoard.classList.remove('hidden');
        this.endScreen.classList.add('hidden');
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
        let topTen = this.getTopTen();

        if (topTen) {
            for (let i = 0; i < topTen.length; i++) {
                let highScoreLi = document.createElement("li");
                highScoreLi.innerHTML = `${topTen[i].name} | ${topTen[i].enemiesKilled} | ${topTen[i].time}`;
                highScoreLi.style.listStyle = 'none';
                highScoreUl.appendChild(highScoreLi);
            }
        }
        highScoreContainer.appendChild(highScoreUl);
    }

    getTopTen() {
        if (this.gameStats.length == 0) return null;
        if (this.gameStats.length == 1) return this.gameStats;
        // sort by enemies killed 
        if (this.gameStats.length >= 2) {
            let sortedGameStats = this.gameStats.sort((a, b) => {
                if (a.enemiesKilled > b.enemiesKilled) return -1;
                if (a.enemiesKilled < b.enemiesKilled) return 1;
                return a.time - b.time; // TODO implement time comparison
            });
            let topTen = sortedGameStats.slice(0, 10);
            return topTen
        }
        return null;
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
            display.innerHTML = `${this.player.name}`;
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
        this.gameScreen.classList.add('hidden')
        this.endScreen.classList.remove('hidden');
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
                let enemyCollisionSFX = document.getElementById("sfx-enemy-hits-player") as HTMLAudioElement;
                enemyCollisionSFX.play();
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
                    let bulletCollisionSFX = document.getElementById("sfx-player-shoots-enemy") as HTMLAudioElement;
                    bulletCollisionSFX.play();
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
        // place the bullet near player, at a height where it can collide with enemy
        let currentBulletTop = this.player.element.getBoundingClientRect().top + 30;
        currentBullet.element.style.top = `${currentBulletTop}px`;
        currentBullet.element.style.animation = 'bullet-animation 0.7s linear'
    }
}