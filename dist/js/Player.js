export class Player {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.name = "Awesome player";
        this.lives = 3;
        this.enemiesKilled = 0;
        this.isJumping = false;
        this.element = document.createElement("div");
        this.element.classList.add("player");
        // this.element.style.width = `calc(25px * var(--pixel-size))`;
        this.element.style.height = `130px`;
        this.element.style.width = '85px';
        this.element.style.overflow = 'hidden';
        this.element.style.gridRow = '2';
        this.element.style.border = `1px solid green`;
        let imgElement = document.createElement("img");
        imgElement.classList.add("player-spritesheet");
        imgElement.src = "./assets/stick_man_spritesheet.png";
        imgElement.style.width = `calc(100px * var(--pixel-size))`;
        imgElement.style.animation = `moveSpritesheet 0.5s steps(4) infinite`;
        imgElement.style.marginLeft = '-60px';
        imgElement.style.marginTop = '-10px';
        this.element.appendChild(imgElement);
        this.gameBoard.appendChild(this.element);
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
