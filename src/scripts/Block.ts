import { ISpaceOccupying, IPoint } from './Space';
import { blockSize } from './Constants';

export class Block implements ISpaceOccupying, IPoint {
    public readonly x: number;
    public readonly y: number;
    public readonly color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x - (x % blockSize);
        this.y = y - (y % blockSize);
        this.color = color;
    }

    public getCoordinatesForSpaces(): IPoint[] {
        return [{ x: this.x, y: this.y }];
    }
}