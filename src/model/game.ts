import { Inventory } from "../component/inventory";
import { init2dArray } from "../helpers/init-2d-array";
import { randomElement, randomInt } from "../helpers/random";
import { Item, WorldItem } from "../item/item";
import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { buildBuilding } from "../op/build-building";
import { Harvesting, updateHarvest } from "../op/player-harvest";
import { Building } from "./building";
import { HomePortal } from "./buildings";
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
  public pathing: (V2 | null)[][];
  public homePortal: HomePortal | undefined;

  constructor(width: number, height: number) {
    this.map = generateMap(width, height);
    this.buildings = this.initBuildings(width, height);
    this.inventory = new Inventory(10, 1);
    this.pathing = init2dArray(width, height, null);
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

  removeBuilding(building: Building) {
    this.buildings[building.pos.y][building.pos.x] = undefined;
    this.entities.delete(building.id);
    this.removedBuildings.push(building.id);
  }

  addEntity(id: string, entity: Entity) {
    this.entities.set(id, entity);
  }

  removeEntity(id: string) {
    this.entities.delete(id);
  }
}
