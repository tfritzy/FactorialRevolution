import { AmmoInventory } from "../component/ammo-inventory";
import { Component } from "../component/component";
import { ComponentType } from "../component/component-type";
import { Converter } from "../component/converter";
import { ConveyorComponent } from "../component/conveyor-component";
import { FuelInventory } from "../component/fuel-inventory";
import { Harvester } from "../component/harvester";
import { Health } from "../component/health";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { RelicInventory } from "../component/relic-inventory";
import { Smelter } from "../component/smelter";
import { Tower } from "../component/tower";
import { Walker } from "../component/walker";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { Status, StatusType } from "../status/status";
import { EntityType } from "./entity-type";
import { Game } from "./game";
import { Side } from "./side";

export class Entity {
  public id: string;
  public type: EntityType;
  public components: Map<ComponentType, Component>;
  public pos: V2;
  public facing: Side;
  public game: Game | undefined;
  public ghost: boolean = false;
  public statuses: Map<StatusType, Status> = new Map();

  private statusTickCd: number;

  constructor(type: EntityType, pos: V2, facing: Side = Side.North) {
    this.type = type;
    this.id = generateId(this.type);
    this.components = new Map();
    this.pos = pos.clone();
    this.facing = facing;
    this.statusTickCd = Status.TICK_RATE;
  }

  init() {
    this.initComponents();
    this.claimOwnership();
  }

  tick(deltaTime_s: number) {
    this.components.forEach((component) => {
      component.tick(deltaTime_s);
    });

    this.statusTickCd -= deltaTime_s;
    if (this.statusTickCd <= 0) {
      this.statuses.forEach((s) => {
        s.tick(this);
      });
      this.statusTickCd = Status.TICK_RATE;
    }
  }

  onAddToGrid() {
    this.components.forEach((component) => {
      component.onAddToGrid();
    });
  }

  initComponents() {}

  claimOwnership() {
    this.components.forEach((component) => {
      component.owner = this;
    });
  }

  recalculateStats() {
    this.tower()?.resetStats();

    const inventory = this.inventory();
    if (inventory) {
      for (let y = 0; y < inventory.height; y++) {
        for (let x = 0; x < inventory.width; x++) {
          const item = inventory.getAt(y, x);
          item?.effects?.forEach((e) => e.apply(this));
        }
      }
    }

    const relics = this.game?.town?.relics();
    if (relics) {
      for (let y = 0; y < relics.height; y++) {
        for (let x = 0; x < relics.width; x++) {
          const item = relics.getAt(y, x);
          item?.effects?.forEach((e) => e.apply(this));
        }
      }
    }
  }

  addStatus(status: Status) {
    if (!this.statuses.has(status.type)) {
      this.statuses.set(status.type, status);
      status.onInitialAdd(this);
    } else {
      this.statuses.get(status.type)!.stackWith(status);
    }
  }

  walker(): Walker | undefined {
    return this.components.get(ComponentType.Walker) as Walker;
  }

  tower(): Tower | undefined {
    return this.components.get(ComponentType.Tower) as Tower;
  }

  health(): Health | undefined {
    return this.components.get(ComponentType.Health) as Health;
  }

  converter(): Converter | undefined {
    return this.components.get(ComponentType.Converter) as Converter;
  }

  smelter(): Smelter | undefined {
    return this.components.get(ComponentType.Smelter) as Smelter;
  }

  inputs(): Inventory | undefined {
    return this.components.get(ComponentType.InputsInventory) as Inventory;
  }

  fuel(): Inventory | undefined {
    return this.components.get(ComponentType.FuelInventory) as FuelInventory;
  }

  inventory(): Inventory | undefined {
    return this.components.get(ComponentType.Inventory) as Inventory;
  }

  relics(): RelicInventory | undefined {
    return this.components.get(ComponentType.RelicInventory) as RelicInventory;
  }

  ammo(): AmmoInventory | undefined {
    return this.components.get(ComponentType.AmmoInventory) as AmmoInventory;
  }

  harvester(): Harvester | undefined {
    return this.components.get(ComponentType.Harvester) as Harvester;
  }

  inserter(): InserterComponent | undefined {
    return this.components.get(ComponentType.Inserter) as InserterComponent;
  }

  conveyor(): ConveyorComponent | undefined {
    return this.components.get(ComponentType.Conveyor) as ConveyorComponent;
  }
}
