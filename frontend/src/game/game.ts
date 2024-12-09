import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";

export class Game
{
    public map: TileType[][];

    constructor(width: number, height: number)
    {
        this.map = generateMap(width, height);
    }
}