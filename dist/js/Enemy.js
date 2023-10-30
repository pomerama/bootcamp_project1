export class Enemy {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.left = 315;
        this.bottom = -25;
        this.width = 125;
        this.height = 125;
        this.element = document.createElement("img");
        this.element.classList.add("enemy");
        this.element.src = "./assets/enemy_run.gif";
        this.element.style.position = 'relative';
        this.element.style.gridRow = '2';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.border = `1px solid red`;
        this.gameBoard.appendChild(this.element);
    }
    move() {
        this.left -= 2;
        this.element.style.left = `${this.left}px`;
    }
}
