import { AmmoInventory } from "../component/ammo-inventory";
import { ComponentType } from "../component/component-type";
import { Converter } from "../component/converter";
import { ConveyorComponent } from "../component/conveyor-component";
import { Harvester } from "../component/harvester";
import { Health } from "../component/health";
import { InserterComponent } from "../component/inserter-component";
import { Inventory } from "../component/inventory";
import { RelicInventory } from "../component/relic-inventory";
import { Smelter } from "../component/smelter";
import { Tower } from "../component/tower";
import { ItemTypes } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { getBuilding } from "../op/get-building";
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

export class Conveyor extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Conveyor, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Conveyor, new ConveyorComponent());
  }
}

export class Mine extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Mine, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(1, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester({
        harvestTypes: [
          { from: TileType.Iron, to: ItemTypes.IronOre },
          { from: TileType.Copper, to: ItemTypes.CopperOre },
          { from: TileType.Grass, to: ItemTypes.Stone },
          { from: TileType.Stone, to: ItemTypes.Stone },
          { from: TileType.Coal, to: ItemTypes.Coal },
          {
            from: TileType.SulfurCave,
            to: ItemTypes.Niter,
          },
        ],
        range: 0,
        harvestRatePerTile: 0.3,
      })
    );
  }
}

export class SteamMiningDrill extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.SteamMiningDrill, pos, 2, 2);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(ComponentType.FuelInventory, new Inventory(3, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester({
        harvestTypes: [
          { from: TileType.Iron, to: ItemTypes.IronOre },
          { from: TileType.Copper, to: ItemTypes.CopperOre },
          { from: TileType.Stone, to: ItemTypes.Stone },
          { from: TileType.Coal, to: ItemTypes.Coal },
        ],
        range: 1,
        harvestRatePerTile: 0.2,
        energyConsumption_kw: 200,
      })
    );
  }
}

export class Lumberyard extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Lumberyard, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(1, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester({
        harvestTypes: [{ from: TileType.Tree, to: ItemTypes.Log }],
        range: 2,
        harvestRatePerTile: 0.05,
      })
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
      new Harvester({
        harvestTypes: [{ from: TileType.BerryBush, to: ItemTypes.Food }],
        range: 2,
        harvestRatePerTile: 0.0125,
      })
    );
  }
}

export class WheatFarm extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.WheatFarm, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(1, 1));
    this.components.set(
      ComponentType.Harvester,
      new Harvester({
        harvestTypes: [{ from: TileType.Grass, to: ItemTypes.Food }],
        range: 3,
        harvestRatePerTile: 0.005,
      })
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
      new Converter({
        craftable: [
          recipes[ItemTypes.IronArrowhead]!,
          recipes[ItemTypes.CopperArrowhead]!,
          recipes[ItemTypes.Cannonball]!,
          recipes[ItemTypes.CarcassCannonShot]!,
          recipes[ItemTypes.GrapeCannonShot]!,
          recipes[ItemTypes.ExplosiveCannonShot]!,
        ],
        speed: 1,
      })
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
      new Converter({
        craftable: [
          recipes[ItemTypes.Arrowhead]!,
          recipes[ItemTypes.StoneBlock]!,
        ],
        speed: 1,
      })
    );
  }
}

export class StoneFurnace extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.StoneFurnace, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.InputsInventory, new Inventory(1, 1));
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(ComponentType.FuelInventory, new Inventory(1, 1));
    this.components.set(ComponentType.Smelter, new Smelter(0.5, 1));
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
      new Converter({
        craftable: [
          recipes[ItemTypes.Stick]!,
          recipes[ItemTypes.Board]!,
          recipes[ItemTypes.Beam]!,
          recipes[ItemTypes.PalisadeWall]!,
        ],
        speed: 1,
      })
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
      new Converter({
        craftable: [
          recipes[ItemTypes.StoneArrow]!,
          recipes[ItemTypes.IronArrow]!,
          recipes[ItemTypes.CopperArrow]!,
        ],
        speed: 1,
      })
    );
  }
}

export class Town extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Town, pos, 3, 3);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Health, new Health(100));
    this.components.set(ComponentType.RelicInventory, new RelicInventory(4, 1));
    this.components.set(ComponentType.InputsInventory, new Inventory(4, 1));
    this.components.set(ComponentType.Inventory, new Inventory(4, 4));
    this.components.set(
      ComponentType.Converter,
      new Converter({ craftable: [recipes.human], speed: 1 })
    );
  }

  override recalculateStats(): void {
    super.recalculateStats();

    const buildings = this.game?.buildings;
    if (buildings) {
      for (let y = 0; y < buildings.length; y++) {
        for (let x = 0; x < buildings[0].length; x++) {
          const building = getBuilding(this.game!, y, x);
          if (!(building instanceof Town)) {
            building?.recalculateStats();
          }
        }
      }
    }
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

export class CannonTower extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.CannonTower, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(4, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 10,
        baseCooldown: 2,
        baseDamage: 100,
        ammoType: "category-cannon-ball",
        firePeriodPercent: 0.1,
        projectileConfig: {
          maxHits: 1,
          posVariance: 0,
          radius: 0.3,
          scale: 0.5,
          speed: 12,
        },
      })
    );
  }
}

export class ArcherTower extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.ArcherTower, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(2, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 8,
        baseCooldown: 2,
        baseDamage: 15,
        ammoType: "category-arrow",
        projectileConfig: {
          maxHits: 1,
          radius: 0.2,
          speed: 10,
          scale: 0.7,
          posVariance: 0,
        },
      })
    );
  }
}

export class Keep extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Keep, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 10,
        baseCooldown: 1,
        baseDamage: 15,
        ammoType: "category-arrow",
        multishotCount: 5,
        firePeriodPercent: 0.2,
        projectileConfig: {
          maxHits: 1,
          radius: 0.2,
          speed: 10,
          scale: 0.7,
          posVariance: 0.5,
        },
      })
    );
  }
}

export class Slinger extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Slinger, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(1, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 4,
        baseCooldown: 1,
        baseDamage: 10,
        ammoType: ItemTypes.Stone,
        projectileConfig: {
          maxHits: 1,
          radius: 0.2,
          speed: 7,
          scale: 0.5,
          posVariance: 0,
        },
      })
    );
  }
}

export class Ballista extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Ballista, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(2, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 12,
        baseCooldown: 5,
        baseDamage: 50,
        ammoType: ItemTypes.Stone,
      })
    );
  }
}

export class BombardTower extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.BombardTower, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        baseRange: 5,
        baseCooldown: 1,
        baseDamage: 75,
        ammoType: ItemTypes.Cannonball,
      })
    );
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

export class PalisadeWall extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.PalisadeWall, pos, 1, 1);
  }

  override initComponents(): void {}
}
