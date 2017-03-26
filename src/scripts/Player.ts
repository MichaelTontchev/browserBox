import { Keyboard } from './Keyboard';
import { Space } from './Space';
import { blockSize } from './Constants';

export class Player {
    private static player = document.getElementById('player') || new HTMLElement();

    public static readonly instance = new Player();

    public readonly width = blockSize;
    public readonly height = blockSize * 2;
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
        let currPlayerY = this.getY();

        if (Keyboard.leftKeyDown) {
            const isFutureBlockFree = !Space.fuzzyHasBlock(currPlayerX - this.speed, currPlayerY);

            let allowedMovementDisplacement;

            if (isFutureBlockFree) {
                allowedMovementDisplacement = this.speed;
            } else {
                const remainingDistanceUntilFutureBlock = currPlayerX % blockSize;

                allowedMovementDisplacement = remainingDistanceUntilFutureBlock;
            }

            this.setX(currPlayerX - allowedMovementDisplacement);
        } else if (Keyboard.rightKeyDown) {
            const possibleFutureLocation = currPlayerX + this.speed + this.width;

            const isFutureBlockFree = !Space.fuzzyHasBlock(possibleFutureLocation, currPlayerY);

            let allowedMovementDisplacement;

            if (isFutureBlockFree) {
                allowedMovementDisplacement = this.speed;
            } else {
                const beginningOfFutureBlock = possibleFutureLocation - (possibleFutureLocation % blockSize);

                const remainingDistanceUntilFutureBlock = beginningOfFutureBlock - (currPlayerX + this.width);

                allowedMovementDisplacement = remainingDistanceUntilFutureBlock;
            }

            this.setX(currPlayerX + allowedMovementDisplacement);
        }
    }

    private jumpTick() {
        if (this.isOnGround) {
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
        const gravitySpeed = 2;

        const currPlayerX = this.getX();
        const currPlayerY = this.getY();

        const areBlocksBelowFeetFree =
            !Space.fuzzyHasBlock(currPlayerX, currPlayerY - gravitySpeed)
            && !Space.fuzzyHasBlock(currPlayerX + this.width, currPlayerY - gravitySpeed);

        if (areBlocksBelowFeetFree) {
            this.isOnGround = false;

            this.setY(currPlayerY - gravitySpeed);
        } else {
            const remainingDistanceUntilBlockBelow = currPlayerY % blockSize;

            this.setY(currPlayerY - remainingDistanceUntilBlockBelow);

            this.isOnGround = true;
        }
    }
}