import { Inventory } from "../component/inventory";
import { Item, WorldItem } from "../item/item";
import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Harvesting, updateHarvest } from "../op/player-harvest";
import { Building } from "./building";
import { Entity } from "./entity";

export class Game {
  public map: TileType[][];
  public buildings: (string | undefined)[][];
  public items: Map<string, WorldItem>;
  public entities: Map<string, Entity>;
  public inventory: Inventory;
  public harvesting: Harvesting | undefined;
  public heldItem: Item | undefined;
  public changedBuildings: V2[] = [];
  public previewBuliding: Building | undefined;

  constructor(width: number, height: number) {
    this.map = generateMap(width, height);
    this.buildings = this.initBuildings(width, height);
    this.items = new Map();
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
