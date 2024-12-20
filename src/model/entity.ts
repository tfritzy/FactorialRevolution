import { Component } from "../component/component";
import { ComponentType } from "../component/component-type";
import { Converter } from "../component/converter";
import { ConveyorComponent } from "../component/conveyor-component";
import { Harvester } from "../component/harvester";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { EntityType } from "./EntityType";
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

  constructor(type: EntityType, pos: V2, facing: Side = Side.North) {
    this.type = type;
    this.id = generateId(this.type);
    this.components = new Map();
    this.pos = pos;
    this.facing = facing;
    this.initComponents();
    this.claimOwnership();
  }

  converter(): Converter | undefined {
    return this.components.get(ComponentType.Converter) as Converter;
  }

  inputs(): Inventory | undefined {
    return this.components.get(ComponentType.InputsInventory) as Inventory;
  }

  inventory(): Inventory | undefined {
    return this.components.get(ComponentType.Inventory) as Inventory;
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

  tick(deltaTime_s: number) {
    this.components.forEach((component) => {
      component.tick(deltaTime_s);
    });
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
}
