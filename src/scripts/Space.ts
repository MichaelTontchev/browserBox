import { IBlock } from './Main';
import { blockSize } from './Constants';

export interface IPoint {
    x: number;
    y: number;
}

export interface ISpaceOccupying {
    getCoordinatesForSpaces(): IPoint[];
}

export class Space {
    private static space: { [key: string]: ISpaceOccupying } = {};

    public static movableObjects: ISpaceOccupying[] = [];

    public static put(object: ISpaceOccupying) {
        let coordinatesOccupied = object.getCoordinatesForSpaces();

        coordinatesOccupied.forEach((point) => {
            Space.space[point.x + "_" + point.y] = object;
        });
    }

    public static fuzzyGetBlock(x: number, y: number): ISpaceOccupying {
        return Space.space[(x - (x % blockSize)) + "_" + (y - (y % blockSize))];
    }

    public static fuzzyHasBlock(x: number, y: number): boolean {
        return Space.fuzzyGetBlock(x, y) != undefined;
    }

    public static fuzzyHaveBlocks(points: IPoint[]): boolean {
        return points.map((point) => Space.fuzzyGetBlock(point.x, point.y) != undefined).reduce((previous, current) => previous || current, false);
    }

    public static getCoordinatesForFutureSpaces(currentSpaces: IPoint[], deltaX: number, deltaY: number): IPoint[] {
        return currentSpaces.map((point) => {
            return { x: point.x + deltaX, y: point.y + deltaY };
        });
    }
}