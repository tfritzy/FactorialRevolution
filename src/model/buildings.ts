import { ComponentType } from "../component/component-type";
import { Converter } from "../component/converter";
import { ConveyorComponent } from "../component/conveyor-component";
import { Harvester } from "../component/harvester";
import { Health } from "../component/health";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { Tower } from "../component/tower";
import { ItemTypes } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { recipes } from "./crafting-recipes";
import { BuildingTypes } from "./entity-type";

export class WoodenInserter extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodenInserter, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inserter, new InserterComponent());
  }
}

export class WoodenConveyor extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodenConveyor, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Conveyor, new ConveyorComponent());
  }
}

export class StoneMiner extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Mine, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester(
        [
          { from: TileType.Iron, to: ItemTypes.IronOre },
          { from: TileType.Copper, to: ItemTypes.CopperOre },
          { from: TileType.Stone, to: ItemTypes.Stone },
        ],
        1,
        0.1
      )
    );
  }
}

export class Lumberyard extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Lumberyard, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester([{ from: TileType.Tree, to: ItemTypes.Log }], 2, 0.05)
    );
  }
}

export class GatheringHut extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.GatheringHut, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester(
        [{ from: TileType.BerryBush, to: ItemTypes.Berries }],
        2,
        0.05
      )
    );
  }
}

export class WheatFarm extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WheatFarm, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester([{ from: TileType.Grass, to: ItemTypes.Wheat }], 3, 0.02)
    );
  }
}

export class Blacksmith extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Blacksmith, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [
          recipes[ItemTypes.IronArrowhead]!,
          recipes[ItemTypes.CopperArrowhead]!,
        ],
        1
      )
    );
  }
}

export class StoneCarver extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.StoneCarver, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [recipes[ItemTypes.Arrowhead]!, recipes[ItemTypes.StoneBlock]!],
        1
      )
    );
  }
}

export class Furnace extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Furnace, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [recipes[ItemTypes.CopperBar]!, recipes[ItemTypes.IronBar]!],
        1,
        true
      )
    );
  }
}

export class WoodShop extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WoodShop, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [
          recipes[ItemTypes.Stick]!,
          recipes[ItemTypes.Board]!,
          recipes[ItemTypes.Beam]!,
        ],
        1
      )
    );
  }
}

export class Fletcher extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Fletcher, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(3, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Converter,
      new Converter(
        [
          recipes[ItemTypes.StoneArrow]!,
          recipes[ItemTypes.IronArrow]!,
          recipes[ItemTypes.CopperArrow]!,
        ],
        1
      )
    );
  }
}

export class Town extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Town, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Health, new Health(100));
    this.components.set(ComponentType.InputsInventory, new Inventory(4, 1));
    this.components.set(ComponentType.Inventory, new Inventory(4, 4));
    this.components.set(
      ComponentType.Converter,
      new Converter([recipes.human], 1, true)
    );
  }
}

export class Crate extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Crate, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 3));
  }
}

export class Keep extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Keep, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 2));
  }
}

export class Slinger extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Slinger, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 2));
    this.components.set(
      ComponentType.Tower,
      new Tower(5, 2, 10, ItemTypes.Stone)
    );
  }
}

export class Ballista extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Ballista, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 2));
  }
}

export class OilTower extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.OilTower, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 2));
  }
}

export class Castle extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Castle, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 2));
  }
}
