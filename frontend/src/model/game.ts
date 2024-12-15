import { Inventory } from "../component/inventory";
import { Item } from "../item/item";
import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";
import { Harvesting, updateHarvest } from "../op/player-harvest";
import { Entity } from "./entity";

export class Game {
  public map: TileType[][];
  public buildings: (string | undefined)[][];
  public entities: Map<string, Entity>;
  public inventory: Inventory;
  public harvesting: Harvesting | undefined;
  public heldItem: Item | undefined;

  constructor(width: number, height: number) {
    this.map = generateMap(width, height);
    this.buildings = this.initBuildings(width, height);
    this.entities = new Map();
    this.inventory = new Inventory(10, 1);
  }

  initBuildings(width: number, height: number): (string | undefined)[][] {
    const buildings: (string | undefined)[][] = [];
    for (let y = 0; y < height; y++) {
      buildings[y] = [];
      buildings[y][width - 1] = undefined;
    }

    return buildings;
  }

  tick(deltaTime_s: number) {
    this.entities.forEach((e) => {
      e.tick(deltaTime_s);
    });
    updateHarvest(this, deltaTime_s);
  }
}
