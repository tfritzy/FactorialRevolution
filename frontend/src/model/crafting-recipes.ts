import { ItemType } from "../item/item-type";

export type Recipe = {
  ingredients: Map<ItemType, number>;
  craftDuration: number;
};

export const recipes: Record<ItemType, Recipe | null> = {
  [ItemType.Rope]: {
    ingredients: new Map([[ItemType.PlantMatter, 4]]),
    craftDuration: 2,
  },
  [ItemType.Cloth]: {
    ingredients: new Map([[ItemType.PlantMatter, 8]]),
    craftDuration: 3,
  },
  [ItemType.StoneBlock]: {
    ingredients: new Map([[ItemType.Stone, 1]]),
    craftDuration: 1,
  },
  [ItemType.Board]: {
    ingredients: new Map([[ItemType.Log, 1]]),
    craftDuration: 1,
  },
  [ItemType.Beam]: {
    ingredients: new Map([[ItemType.Log, 1]]),
    craftDuration: 1,
  },

  // towers
  [ItemType.Slinger]: {
    ingredients: new Map([
      [ItemType.Log, 4],
      [ItemType.Rope, 2],
      [ItemType.Cloth, 1],
    ]),
    craftDuration: 4,
  },
  [ItemType.Keep]: {
    ingredients: new Map([
      [ItemType.Stone, 16],
      [ItemType.Log, 8],
      [ItemType.Cloth, 4],
    ]),
    craftDuration: 4,
  },
  [ItemType.Ballista]: {
    ingredients: new Map([
      [ItemType.Board, 4],
      [ItemType.Beam, 3],
      [ItemType.Rope, 16],
      [ItemType.Stick, 2],
    ]),
    craftDuration: 4,
  },
  [ItemType.OilTower]: {
    ingredients: new Map([
      [ItemType.Crucible, 1],
      [ItemType.Log, 4],
      [ItemType.StoneBlock, 32],
    ]),
    craftDuration: 4,
  },
  [ItemType.Castle]: {
    ingredients: new Map([
      [ItemType.StoneBlock, 128],
      [ItemType.Beam, 64],
      [ItemType.Board, 32],
    ]),
    craftDuration: 4,
  },
  [ItemType.Log]: null,
  [ItemType.Stick]: null,
  [ItemType.PlantMatter]: null,
  [ItemType.Stone]: null,
  [ItemType.IronBar]: null,
  [ItemType.IronOre]: null,
  [ItemType.CopperOre]: null,
  [ItemType.Crucible]: null,
};
