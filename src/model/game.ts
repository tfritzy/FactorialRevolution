import { Inventory } from "../component/inventory";
import { Item, WorldItem } from "../item/item";
import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";
import { Harvesting, updateHarvest } from "../op/player-harvest";
import { Building } from "./building";
import { Entity } from "./entity";

export class Game {
  public map: TileType[][];
  public buildings: (string | undefined)[][];
  public removedBuildings: string[] = [];
  public addedBuildings: string[] = [];
  public items: Map<string, WorldItem> = new Map();
  public removedItems: string[] = [];
  public addedItems: string[] = [];
  public entities: Map<string, Entity> = new Map();
  public inventory: Inventory;
  public harvesting: Harvesting | undefined;
  public heldItem: Item | undefined;
  public previewBuliding: Building | undefined;

  constructor(width: number, height: number) {
    this.map = generateMap(width, height);
    this.buildings = this.initBuildings(width, height);
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

  addItem(item: WorldItem) {
    if (!this.items.has(item.item.id)) {
      this.items.set(item.item.id, item);
      this.addedItems.push(item.item.id);
    } else {
      this.items.get(item.item.id)!.pos = item.pos;
    }
  }

  removeItem(id: string) {
    this.items.delete(id);
    this.removedItems.push(id);
  }
}
