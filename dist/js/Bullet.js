export class Bullet {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.left = 0;
        this.top = 0;
        this.imgSrc = './assets/bullet.png';
        this.element = document.createElement("img");
        this.element.classList.add("bullet");
        this.element.src = this.imgSrc;
        this.element.style.height = '60px';
        this.element.style.position = 'fixed';
        this.element.style.display = 'none';
        this.gameBoard.appendChild(this.element);
    }
}
