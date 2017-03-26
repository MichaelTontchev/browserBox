import { IBlock } from './Main';

export class Space {
    private static space: { [key: string]: IBlock } = {};

    public static putBlock(block: IBlock) {
        Space.space[block.left + "_" + block.bottom] = block;
    }

    public static fuzzyGetBlock(x: number, y: number): IBlock {
        return Space.space[(x - (x % 15)) + "_" + (y - (y % 15))];
    }

    public static fuzzyHasBlock(x: number, y: number): boolean {
        return Space.fuzzyGetBlock(x, y) != undefined;
    }
}