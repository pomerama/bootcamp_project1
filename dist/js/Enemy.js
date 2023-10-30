export class Enemy {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.left = 0;
        this.top = 0;
        this.element = document.createElement("img");
        this.element.classList.add("enemy");
        this.element.src = "./assets/enemy_run.gif";
        this.element.style.position = 'relative';
        this.element.style.gridRow = '2';
        this.element.style.width = `125px`;
        this.element.style.height = `125px`;
        this.element.style.left = `315px`;
        this.element.style.bottom = `-25px`;
        this.element.style.border = `1px solid red`;
        this.gameBoard.appendChild(this.element);
    }
}
