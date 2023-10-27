export class Player {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
    playerElm: HTMLElement;

    constructor() {

        this.width = 20;
        this.height = 10;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;


        this.playerElm = document.querySelector(".player")!;
        this.playerElm.style.left = this.positionX + "vw";
        this.playerElm.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        this.positionX--;
        this.playerElm.style.left = this.positionX + "vw";
    }
    moveRight() {
        this.positionX++;
        this.playerElm.style.left = this.positionX + "vw";
    }
    jump() {
        console.log("JUMP")
        console.log(this.positionY)
        this.positionY++;
        this.playerElm.style.top = this.positionY + "vw"
    }
}