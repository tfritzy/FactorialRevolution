import { ComponentType } from "../component/component-type";
import { Converter } from "../component/converter";
import { ConveyorComponent } from "../component/conveyor-component";
import { Harvester } from "../component/harvester";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { ItemType } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { recipes } from "./crafting-recipes";
import { BuildingTypes } from "./entity-type";

export class WoodenInserter extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodenInserter, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inserter, new InserterComponent());
  }
}

export class WoodenConveyor extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodenConveyor, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Conveyor, new ConveyorComponent());
  }
}

export class StoneMiner extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.StoneMiner, pos);
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
    super(BuildingTypes.Lumberyard, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester([{ from: TileType.Tree, to: ItemType.Log }], 2, 0.05)
    );
  }
}

export class GatheringHut extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.GatheringHut, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester(
        [{ from: TileType.BerryBush, to: ItemType.Berries }],
        2,
        0.05
      )
    );
  }
}

export class WheatFarm extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WheatFarm, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester([{ from: TileType.Grass, to: ItemType.Wheat }], 3, 0.02)
    );
  }
}

export class Blacksmith extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Blacksmith, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [recipes[ItemType.IronArrowhead]!, recipes[ItemType.CopperArrowhead]!],
        1
      )
    );
  }
}

export class Furnace extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Furnace, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [recipes[ItemType.CopperBar]!, recipes[ItemType.IronBar]!],
        1
      )
    );
  }
}

export class WoodShop extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodShop, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [
          recipes[ItemType.ArrowShaft]!,
          recipes[ItemType.Board]!,
          recipes[ItemType.Beam]!,
        ],
        1
      )
    );
  }
}

export class Fletcher extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Fletcher, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [
          recipes[ItemType.StoneArrow]!,
          recipes[ItemType.IronArrow]!,
          recipes[ItemType.CopperArrow]!,
        ],
        1
      )
    );
  }
}
