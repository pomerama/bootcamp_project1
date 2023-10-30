export class Player {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.lives = 10;
        this.enemiesKilled = 0;
        this.isJumping = false;
        this.element = document.querySelector(".player");
    }
    jump() {
        if (this.isJumping)
            return;
        if (this.element.classList.contains('in-jump'))
            return;
        this.isJumping = true;
        this.element.classList.add('in-jump');
        setTimeout(() => {
            this.element.classList.remove('in-jump');
        }, 500);
        this.isJumping = false;
    }
}
