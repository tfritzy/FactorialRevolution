import { BuildingType, EntityTypes } from "../model/entity-type";
import { ItemType } from "./item-type";

type ItemProps = {
  maxStack: number;
  width: number;
  builds?: BuildingType;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemType.Log]: {
    maxStack: 4,
    width: 0.5,
  },
  [ItemType.Stone]: {
    maxStack: 4,
    width: 0.5,
  },
  [ItemType.Stick]: {
    maxStack: 16,
    width: 0.2,
  },
  [ItemType.PlantMatter]: {
    maxStack: 64,
    width: 0.25,
  },
  [ItemType.Board]: {
    maxStack: 8,
    width: 0.25,
  },
  [ItemType.Beam]: {
    maxStack: 4,
    width: 0.25,
  },
  [ItemType.Rope]: {
    maxStack: 16,
    width: 0.25,
  },
  [ItemType.Cloth]: {
    maxStack: 16,
    width: 0.25,
  },
  [ItemType.StoneBlock]: {
    maxStack: 32,
    width: 0.5,
  },
  [ItemType.Crucible]: {
    maxStack: 1,
    width: 0.5,
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
  },
  [ItemType.Keep]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.Ballista]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.OilTower]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.Castle]: {
    maxStack: 1,
    width: 0.5,
  },

  // buildings
  [ItemType.Lumberyard]: {
    maxStack: 1,
    width: 0.5,
    builds: EntityTypes.Lumberyard,
  },
  [ItemType.WoodenConveyor]: {
    maxStack: 64,
    width: 0.5,
    builds: EntityTypes.WoodenConveyor,
  },
  [ItemType.Crate]: {
    maxStack: 1,
    width: 0.5,
    builds: EntityTypes.Crate,
  },
  [ItemType.WoodenInserter]: {
    maxStack: 8,
    width: 0.5,
    builds: EntityTypes.WoodenInserter,
  },
  [ItemType.StoneMiner]: {
    maxStack: 1,
    width: 0.5,
    builds: EntityTypes.StoneMiner,
  },
};
