import { ItemType } from "../item/item-type";

export type Recipe = {
  ingredients: Map<ItemType, number>;
  duration: number;
  output: ItemType;
};

export const recipes: Record<ItemType, Recipe> = {
  [ItemType.Rope]: {
    output: ItemType.Rope,
    ingredients: new Map([[ItemType.PlantMatter, 4]]),
    duration: 2,
  },
  [ItemType.Cloth]: {
    output: ItemType.Cloth,
    ingredients: new Map([[ItemType.PlantMatter, 8]]),
    duration: 3,
  },
  [ItemType.StoneBlock]: {
    output: ItemType.StoneBlock,
    ingredients: new Map([[ItemType.Stone, 1]]),
    duration: 1,
  },
  [ItemType.Board]: {
    output: ItemType.Board,
    ingredients: new Map([[ItemType.Log, 1]]),
    duration: 1,
  },
  [ItemType.Beam]: {
    output: ItemType.Beam,
    ingredients: new Map([[ItemType.Log, 1]]),
    duration: 1,
  },

  // Projectiles
  [ItemType.StoneArrow]: {
    output: ItemType.StoneArrow,
    ingredients: new Map([
      [ItemType.Stick, 1],
      [ItemType.Arrowhead, 1],
    ]),
    duration: 1,
  },
  [ItemType.IronArrow]: {
    output: ItemType.IronArrow,
    ingredients: new Map([
      [ItemType.Stick, 1],
      [ItemType.IronArrowhead, 1],
    ]),
    duration: 1,
  },
  [ItemType.CopperArrow]: {
    output: ItemType.CopperArrow,
    ingredients: new Map([
      [ItemType.Stick, 1],
      [ItemType.CopperArrowhead, 1],
    ]),
    duration: 1,
  },
  [ItemType.Arrowhead]: {
    output: ItemType.Arrowhead,
    ingredients: new Map([[ItemType.Stone, 1]]),
    duration: 1,
  },
  [ItemType.IronArrowhead]: {
    output: ItemType.IronArrowhead,
    ingredients: new Map([[ItemType.IronBar, 1]]),
    duration: 1,
  },
  [ItemType.CopperArrowhead]: {
    output: ItemType.CopperArrowhead,
    ingredients: new Map([[ItemType.CopperBar, 1]]),
    duration: 1,
  },

  // buildings
  [ItemType.Lumberyard]: {
    output: ItemType.Lumberyard,
    ingredients: new Map([
      [ItemType.Log, 4],
      [ItemType.Stone, 1],
    ]),
    duration: 4,
  },
  [ItemType.WoodenConveyor]: {
    output: ItemType.WoodenConveyor,
    ingredients: new Map([[ItemType.Log, 2]]),
    duration: 1,
  },
  [ItemType.WoodenInserter]: {
    output: ItemType.WoodenInserter,
    ingredients: new Map([
      [ItemType.Log, 2],
      [ItemType.Stick, 2],
    ]),
    duration: 1,
  },
  [ItemType.Crate]: {
    output: ItemType.Crate,
    ingredients: new Map([[ItemType.Board, 8]]),
    duration: 2,
  },
  [ItemType.StoneMiner]: {
    output: ItemType.StoneMiner,
    ingredients: new Map([
      [ItemType.Log, 2],
      [ItemType.Stone, 1],
    ]),
    duration: 4,
  },

  // towers
  [ItemType.Slinger]: {
    output: ItemType.Slinger,
    ingredients: new Map([
      [ItemType.Log, 4],
      [ItemType.Rope, 2],
      [ItemType.Cloth, 1],
    ]),
    duration: 4,
  },
  [ItemType.Keep]: {
    output: ItemType.Keep,
    ingredients: new Map([
      [ItemType.Stone, 16],
      [ItemType.Log, 8],
      [ItemType.Cloth, 4],
    ]),
    duration: 4,
  },
  [ItemType.Ballista]: {
    output: ItemType.Ballista,
    ingredients: new Map([
      [ItemType.Board, 4],
      [ItemType.Beam, 3],
      [ItemType.Rope, 16],
      [ItemType.Stick, 2],
    ]),
    duration: 4,
  },
  [ItemType.OilTower]: {
    output: ItemType.OilTower,
    ingredients: new Map([
      [ItemType.Crucible, 1],
      [ItemType.Log, 4],
      [ItemType.StoneBlock, 32],
    ]),
    duration: 4,
  },
  [ItemType.Castle]: {
    output: ItemType.Castle,
    ingredients: new Map([
      [ItemType.StoneBlock, 128],
      [ItemType.Beam, 64],
      [ItemType.Board, 32],
    ]),
    duration: 4,
  },

  // Uncraftable
  [ItemType.Log]: {
    output: ItemType.Log,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.Stick]: {
    output: ItemType.Stick,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.PlantMatter]: {
    output: ItemType.PlantMatter,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.Stone]: {
    output: ItemType.Stone,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.IronBar]: {
    output: ItemType.IronBar,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.IronOre]: {
    output: ItemType.IronOre,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.CopperOre]: {
    output: ItemType.CopperOre,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.CopperBar]: {
    output: ItemType.CopperBar,
    ingredients: new Map(),
    duration: 0,
  },
  [ItemType.Crucible]: {
    output: ItemType.Crucible,
    ingredients: new Map(),
    duration: 0,
  },
};
