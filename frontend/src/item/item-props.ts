import { ItemType } from "./item-type";

type ItemProps = {
  maxStack: number;
  width: number;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemType.IronBar]: {
    maxStack: 8,
    width: 0.25,
  },
  [ItemType.Log]: {
    maxStack: 4,
    width: 0.5,
  },
  [ItemType.Stone]: {
    maxStack: 4,
    width: 0.5,
  },
  [ItemType.IronOre]: {
    maxStack: 4,
    width: 0.5,
  },
  [ItemType.CopperOre]: {
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
};
