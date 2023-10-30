export class Enemy {
    gameBoard: HTMLDivElement;
    element: HTMLImageElement;
    left: number;
    bottom: number;
    height: number;
    isJumping: boolean;

    constructor(gameBoard: HTMLDivElement) {
        this.gameBoard = gameBoard;
        this.left = 450;
        this.bottom = -60;
        this.height = 70;
        this.isJumping = false

        this.element = document.createElement("img");
        this.element.classList.add("enemy");
        this.element.src = "./assets/enemy_run.gif";
        this.element.style.position = 'relative';
        this.element.style.gridRow = '2';
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.border = `1px solid red`;

        this.gameBoard.appendChild(this.element);
    }
    move() {
        this.left -= 5;
        this.element.style.left = `${this.left}px`;
    }
    jump() {
        if (this.isJumping) return;
        if (this.element.classList.contains('in-jump')) return;

        this.isJumping = true;
        this.element.classList.add('in-jump')
        setTimeout(() => {
            this.element.classList.remove('in-jump')
        }, 600);

        this.isJumping = false;
    }
}