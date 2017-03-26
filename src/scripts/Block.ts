import { ISpaceOccupying, IPoint } from './Space';

export class Block implements ISpaceOccupying {
    public readonly x: number;
    public readonly y: number;
    public readonly color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public getCoordinatesForSpaces(): IPoint[] {
        return [{ x: this.x, y: this.y }];
    }
}