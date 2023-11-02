export class Enemy {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.left = 450;
        this.bottom = -60;
        this.height = 70;
        this.isJumping = false;
        this.element = document.createElement("img");
        this.element.classList.add("enemy");
        this.element.src = "./assets/enemy_run.gif";
        this.element.style.position = 'relative';
        this.element.style.gridRow = '2';
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.gameBoard.appendChild(this.element);
    }
    move() {
        this.left -= 5;
        this.element.style.left = `${this.left}px`;
    }
    jump() {
        if (this.isJumping)
            return;
        if (this.element.classList.contains('in-jump'))
            return;
        this.isJumping = true;
        this.element.classList.add('in-jump');
        this.element.style.animation = 'jump-animation 0.5s linear';
        setTimeout(() => {
            this.element.classList.remove('in-jump');
            this.element.style.animation = '';
        }, 600);
        this.isJumping = false;
    }
}
