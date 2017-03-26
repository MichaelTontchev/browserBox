import { Keyboard } from './Keyboard';
import { Space, ISpaceOccupying, IPoint } from './Space';
import { blockSize } from './Constants';

export class Player implements ISpaceOccupying {
    private static player = document.getElementById('player') || new HTMLElement();

    public static readonly instance = new Player();

    public readonly width = blockSize;
    public readonly height = blockSize * 2;
    public readonly jumpSpeed = 4;
    public readonly speed = 1;

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

    public getCoordinatesForSpaces(): IPoint[] {
        const x = this.getX();
        const y = this.getY();

        return Space.getCoordinatesForBlocks([
            { x: x, y: y },
            { x: x, y: y + blockSize }
        ]);
    }

    public tick() {
        this.moveTick();
        this.jumpTick();
        this.gravityTick();
    }

    private moveTick() {
        let currPlayerX = this.getX();

        let allowedMovementDisplacement = 0;

        if (Keyboard.leftKeyDown) {
            const coordinatesForFutureSpaces = Space.getCoordinatesForFutureSpaces(this.getCoordinatesForSpaces(), -this.speed, 0);
            const areFutureBlocksFree = !Space.fuzzyHaveBlocks(coordinatesForFutureSpaces);

            if (areFutureBlocksFree) {
                allowedMovementDisplacement = -this.speed;
            } else {
                const remainingDistanceUntilFutureBlock = currPlayerX % blockSize;

                allowedMovementDisplacement = -remainingDistanceUntilFutureBlock;
            }
        } else if (Keyboard.rightKeyDown) {
            const coordinatesForFutureSpaces = Space.getCoordinatesForFutureSpaces(this.getCoordinatesForSpaces(), this.speed, 0);
            const areFutureBlocksFree = !Space.fuzzyHaveBlocks(coordinatesForFutureSpaces);

            if (areFutureBlocksFree) {
                allowedMovementDisplacement = this.speed;
            } else {
                const possibleFutureLocation = currPlayerX + this.width + this.speed;

                const beginningOfFutureBlock = possibleFutureLocation - (possibleFutureLocation % blockSize);

                const remainingDistanceUntilFutureBlock = beginningOfFutureBlock - (currPlayerX + this.width);

                allowedMovementDisplacement = remainingDistanceUntilFutureBlock;
            }
        }

        this.setX(currPlayerX + allowedMovementDisplacement);
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

        const coordinatesForFutureSpaces = Space.getCoordinatesForFutureSpaces(this.getCoordinatesForSpaces(), 0, this.jumpSpeed);
        const areFutureBlocksFree = !Space.fuzzyHaveBlocks(coordinatesForFutureSpaces);

        let allowedMovementDisplacement = 0;
        const currPlayerY = this.getY();

        if (areFutureBlocksFree) {
            allowedMovementDisplacement = this.jumpSpeed;
        } else {
            const possibleFutureLocation = currPlayerY + this.height + this.jumpSpeed;

            const beginningOfFutureBlock = possibleFutureLocation - (possibleFutureLocation % blockSize);

            const remainingDistanceUntilFutureBlock = beginningOfFutureBlock - (currPlayerY + this.height);

            allowedMovementDisplacement = remainingDistanceUntilFutureBlock;
        }
        
        this.setY(currPlayerY + allowedMovementDisplacement);

        this.ascendingTickCount++;
    }

    private gravityTick() {
        const gravitySpeed = 2;

        const currPlayerX = this.getX();
        const currPlayerY = this.getY();

        const areBlocksBelowFeetFree =
            !Space.fuzzyHasBlock(currPlayerX, currPlayerY - gravitySpeed)
            && !Space.fuzzyHasBlock(currPlayerX + this.width - 1, currPlayerY - gravitySpeed);

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