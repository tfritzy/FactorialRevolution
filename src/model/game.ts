import { Inventory } from "../component/inventory";
import { inBounds } from "../helpers/grid-helpers";
import { init2dArray } from "../helpers/init-2d-array";
import { Item, WorldItem } from "../item/item";
import { generateMap } from "../map/generate-map";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { dijkstra } from "../op/pathing";
import { Harvesting, updateHarvest } from "../op/player-harvest";
import { Building } from "./building";
import { Town } from "./buildings";
import { Enemy } from "./enemy";
import { Entity } from "./entity";
import { Portal } from "./portal";
import { Shop, ShopItem } from "./shop";

export class Game {
  public map: TileType[][];
  public buildings: (string | undefined)[][];
  public removedBuildings: string[] = [];
  public addedBuildings: string[] = [];
  public items: Map<string, WorldItem> = new Map();
  public removedItems: string[] = [];
  public addedItems: string[] = [];
  public entities: Map<string, Entity> = new Map();
  public addedEnemies: string[] = [];
  public enemies: string[] = [];
  public inventory: Inventory;
  public harvesting: Harvesting | undefined;
  public heldItem: Item | undefined;
  public previewBuliding: Building | undefined;
  public pathing: (V2 | null)[][];
  public enemyPortal: Portal | undefined;
  public town: Town | undefined;
  public paused: boolean = false;
  public shopDetails:
    | {
        shopOptions: Shop[];
        selectedShop?: Shop;
      }
    | undefined;
  public gold: number = 0;

  // events
  public onShopOpen: (() => void) | undefined;
  public onShopChosen: (() => void) | undefined;

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
    if (this.paused) return;

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

  addEntity(entity: Entity) {
    this.entities.set(entity.id, entity);
    entity.game = this;
    entity.init();
    entity.onAddToGrid();

    if (entity instanceof Building) {
      for (const occupied of entity.occupied) {
        if (!inBounds(this.buildings, occupied.y, occupied.x)) {
          throw new Error("Not in bound: " + occupied.toString());
        }

        this.buildings[occupied.y][occupied.x] = entity.id;
      }
    }

    if (entity instanceof Town) {
      this.town = entity;
    }

    if (entity instanceof Portal) {
      this.enemyPortal = entity;
    }

    if (entity instanceof Enemy) {
      this.addedEnemies.push(entity.id);
      this.enemies.push(entity.id);
    }

    if (entity instanceof Building) {
      this.addedBuildings.push(entity.id);
      if (this.town) {
        this.pathing = dijkstra(this, this.town.occupied);
      }
    }
  }

  removeEntity(entity: Entity) {
    this.entities.delete(entity.id);
    if (entity instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(entity.id), 1);
    }
  }
}
