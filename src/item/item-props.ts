import { BuildingType, BuildingTypes } from "../model/entity-type";
import { ItemType } from "./item-type";

type ItemProps = {
  maxStack: number;
  width: number;
  builds?: BuildingType;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemType.Log]: {
    maxStack: 16,
    width: 0.5,
  },
  [ItemType.Stone]: {
    maxStack: 16,
    width: 0.5,
  },
  [ItemType.Board]: {
    maxStack: 32,
    width: 0.25,
  },
  [ItemType.Beam]: {
    maxStack: 16,
    width: 0.25,
  },
  [ItemType.StoneBlock]: {
    maxStack: 16,
    width: 0.5,
  },

  // Foodish
  [ItemType.Wheat]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Berries]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },

  // Metal
  [ItemType.IronOre]: {
    maxStack: 64,
    width: 0.5,
  },
  [ItemType.CopperOre]: {
    maxStack: 64,
    width: 0.5,
  },
  [ItemType.CopperBar]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.IronBar]: {
    maxStack: 64,
    width: 0.25,
  },

  // Projectiles
  [ItemType.StoneArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemType.IronArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemType.CopperArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemType.Arrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemType.IronArrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemType.CopperArrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },

  // towers
  [ItemType.Slinger]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Slinger,
  },
  [ItemType.Keep]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Keep,
  },
  [ItemType.Ballista]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Ballista,
  },
  [ItemType.OilTower]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.OilTower,
  },
  [ItemType.Castle]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Castle,
  },

  // buildings
  [ItemType.Lumberyard]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Lumberyard,
  },
  [ItemType.WoodenConveyor]: {
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WoodenConveyor,
  },
  [ItemType.Crate]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Crate,
  },
  [ItemType.Mine]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Mine,
  },
  [ItemType.StoneCarver]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.StoneCarver,
  },
  [ItemType.GatheringHut]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.GatheringHut,
  },
  [ItemType.Blacksmith]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Blacksmith,
  },
  [ItemType.Furnace]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Furnace,
  },
  [ItemType.Fletcher]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Fletcher,
  },
  [ItemType.Inserter]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodenInserter,
  },
  [ItemType.WheatFarm]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WheatFarm,
  },
  [ItemType.WoodShop]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodShop,
  },
  [ItemType.Portal]: {
    maxStack: 1,
    width: 0.5,
    builds: ItemType.Portal,
  },
  [ItemType.Town]: {
    maxStack: 1,
    width: 0.5,
    builds: ItemType.Town,
  },

  [ItemType.Anvil]: {
    maxStack: 1,
    width: 0.5,
    builds: undefined,
  },
  [ItemType.Hoe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Knife]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Saw]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Axe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Pickaxe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemType.Stick]: {
    maxStack: 64,
    width: 0.2,
    builds: undefined,
  },
  [ItemType.Chisel]: {
    maxStack: 1,
    width: 0.25,
  },
  [ItemType.Human]: {
    maxStack: 1,
    width: 0.5,
  },
};
