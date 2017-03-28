import { blockSize } from './Constants';

export const gravitySpeed = 2;

export const canvas = document.getElementById('canvas') || new HTMLElement();
export const canvasWidth = 495;
export const canvasHeight = 495;

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

    public static getCoordinatesForBlock(blockLocation: IPoint): IPoint[] {
        const x = blockLocation.x;
        const y = blockLocation.y;

        return [
            { x: x, y: y },
            { x: x + blockSize - 1, y: y },
            { x: x, y: y + blockSize - 1 },
            { x: x + blockSize - 1, y: y + blockSize - 1 }
        ];
    }

    public static getCoordinatesForBlocks(blockLocations: IPoint[]): IPoint[] {
        return blockLocations
            .map((location) => Space.getCoordinatesForBlock(location))
            .reduce((locations, aggregator) => aggregator.concat(locations), []);
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