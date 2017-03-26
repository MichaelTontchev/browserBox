import { Keyboard } from './Keyboard';
import { Space } from './Space';

export class Player {
    private static player = document.getElementById('player') || new HTMLElement();

    public static readonly instance = new Player();

    public readonly width = 15;
    public readonly height = 30;
    public readonly speed = 2;

    public isFalling = false;

    public tryJumping = false;

    private ascendingTickCount = 0;
    private isOnGround = true;

    private constructor() {
        Player.player.style.left = '240px';
        Player.player.style.bottom = '150px';
    }

    public getX(): number {
        return parseInt(Player.player.style.left as string, 10);
    }

    public setX(newX: number) {
        Player.player.style.left = newX + 'px';
    }

    public getY(): number {
        return parseInt(Player.player.style.bottom as string, 10);
    }

    public setY(newY: number) {
        Player.player.style.bottom = newY + 'px';
    }

    public tick() {
        this.moveTick();
        this.jumpTick();
        this.gravityTick();
    }

    private moveTick() {
        let currPlayerX = this.getX();

        if (Keyboard.leftKeyDown) {
            this.setX(currPlayerX - this.speed);
        } else if (Keyboard.rightKeyDown) {
            this.setX(currPlayerX + this.speed)
        }
    }

    private jumpTick() {
        if(this.isOnGround) {
            this.ascendingTickCount = 0;
        }

        const doneWithAscendingTicks = this.ascendingTickCount === 38;
        const haveJumped = this.ascendingTickCount > 0;

        if (this.isOnGround && !this.tryJumping
            || !this.isOnGround && !haveJumped
            || doneWithAscendingTicks) {
            return;
        }

        let currPlayerY = this.getY();

        this.setY(currPlayerY + 4);

        this.ascendingTickCount++;
    }

    private gravityTick() {
        var currPlayerY = this.getY();
        var currPlayerX = this.getX();

        const isBlockBelowFree = !Space.fuzzyHasBlock(currPlayerX, currPlayerY - 1);

        if (isBlockBelowFree) {
            this.isOnGround = false;

            this.setY(currPlayerY - 2);
        } else {
            this.isOnGround = true;
        }
    }
}