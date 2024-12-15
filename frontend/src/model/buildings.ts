import { ComponentType } from "../component/component-type";
import { ConveyorComponent } from "../component/conveyor-component";
import { Harvester } from "../component/harvester";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { ItemType } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { EntityType } from "./EntityType";

export class WoodenInserter extends Building {
  constructor(pos: V2) {
    super(EntityType.WoodenInserter, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inserter, new InserterComponent());
  }
}

export class WoodenConveyor extends Building {
  constructor(pos: V2) {
    super(EntityType.WoodenConveyor, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Conveyor, new ConveyorComponent());
  }
}

export class StoneMiner extends Building {
  constructor(pos: V2) {
    super(EntityType.StoneMiner, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester(
        [
          { from: TileType.Iron, to: ItemType.IronOre },
          { from: TileType.Copper, to: ItemType.CopperOre },
        ],
        2,
        0.1
      )
    );
  }
}

export class Lumberyard extends Building {
  constructor(pos: V2) {
    super(EntityType.Lumberyard, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester([{ from: TileType.Tree, to: ItemType.Log }], 2, 0.05)
    );
  }
}
