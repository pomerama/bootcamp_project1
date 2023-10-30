export class Player {
    constructor() {
        this.lives = 10;
        this.isJumping = false;
        this.playerElement = document.querySelector(".player");
    }
    jump() {
        if (this.isJumping)
            return;
        if (this.playerElement.classList.contains('in-jump'))
            return;
        this.isJumping = true;
        this.playerElement.classList.add('in-jump');
        setTimeout(() => {
            this.playerElement.classList.remove('in-jump');
        }, 500);
        this.isJumping = false;
    }
}
