import { ItemType } from "../item/item-type";

export type Recipe = {
  output: ItemType;
  ingredients: Map<ItemType, number>;
  duration: number;
};

export const recipes: Record<ItemType, Recipe> = {
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
  [ItemType.Crucible]: {
    output: ItemType.Crucible,
    ingredients: new Map([[ItemType.Stone, 4]]),
    duration: 2,
  },

  // Metal
  [ItemType.IronBar]: {
    output: ItemType.IronBar,
    ingredients: new Map([[ItemType.IronOre, 1]]),
    duration: 2,
  },
  [ItemType.CopperBar]: {
    output: ItemType.CopperBar,
    ingredients: new Map([[ItemType.CopperOre, 1]]),
    duration: 2,
  },

  // Projectiles
  [ItemType.StoneArrow]: {
    output: ItemType.StoneArrow,
    ingredients: new Map([
      [ItemType.ArrowShaft, 1],
      [ItemType.Arrowhead, 1],
    ]),
    duration: 1,
  },
  [ItemType.IronArrow]: {
    output: ItemType.IronArrow,
    ingredients: new Map([
      [ItemType.ArrowShaft, 1],
      [ItemType.IronArrowhead, 1],
    ]),
    duration: 1,
  },
  [ItemType.CopperArrow]: {
    output: ItemType.CopperArrow,
    ingredients: new Map([
      [ItemType.ArrowShaft, 1],
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
  [ItemType.ArrowShaft]: {
    output: ItemType.ArrowShaft,
    ingredients: new Map([[ItemType.Log, 1]]),
    duration: 1,
  },

  // tools
  [ItemType.Anvil]: {
    output: ItemType.Anvil,
    ingredients: new Map([[ItemType.IronBar, 8]]),
    duration: 4,
  },
  [ItemType.Hoe]: {
    output: ItemType.Hoe,
    ingredients: new Map([
      [ItemType.IronBar, 1],
      [ItemType.ToolShaft, 1],
    ]),
    duration: 2,
  },
  [ItemType.Knife]: {
    output: ItemType.Knife,
    ingredients: new Map([
      [ItemType.Log, 1],
      [ItemType.IronBar, 1],
    ]),
    duration: 2,
  },
  [ItemType.Saw]: {
    output: ItemType.Saw,
    ingredients: new Map([
      [ItemType.Log, 1],
      [ItemType.IronBar, 1],
    ]),
    duration: 2,
  },
  [ItemType.Axe]: {
    output: ItemType.Axe,
    ingredients: new Map([
      [ItemType.ToolShaft, 1],
      [ItemType.IronBar, 1],
    ]),
    duration: 2,
  },
  [ItemType.Pickaxe]: {
    output: ItemType.Pickaxe,
    ingredients: new Map([
      [ItemType.ToolShaft, 1],
      [ItemType.IronBar, 1],
    ]),
    duration: 2,
  },
  [ItemType.ToolShaft]: {
    output: ItemType.ToolShaft,
    ingredients: new Map([[ItemType.Log, 1]]),
    duration: 1,
  },

  // buildings
  [ItemType.Lumberyard]: {
    output: ItemType.Lumberyard,
    ingredients: new Map([
      [ItemType.Log, 4],
      [ItemType.Axe, 2],
    ]),
    duration: 4,
  },
  [ItemType.WoodenConveyor]: {
    output: ItemType.WoodenConveyor,
    ingredients: new Map([[ItemType.Log, 2]]),
    duration: 1,
  },
  [ItemType.WoodenInserter]: {
    ingredients: new Map([[ItemType.Log, 4]]),
    duration: 1,
    output: ItemType.WoodenInserter,
  },
  [ItemType.Crate]: {
    output: ItemType.Crate,
    ingredients: new Map([[ItemType.Board, 8]]),
    duration: 2,
  },
  [ItemType.Mine]: {
    output: ItemType.Mine,
    ingredients: new Map([
      [ItemType.Log, 8],
      [ItemType.Pickaxe, 2],
    ]),
    duration: 4,
  },
  [ItemType.Blacksmith]: {
    output: ItemType.Blacksmith,
    ingredients: new Map([
      [ItemType.Stone, 8],
      [ItemType.Log, 4],
      [ItemType.Anvil, 1],
    ]),
    duration: 4,
  },
  [ItemType.Furnace]: {
    output: ItemType.Furnace,
    ingredients: new Map([
      [ItemType.Crucible, 1],
      [ItemType.Stone, 16],
    ]),
    duration: 4,
  },
  [ItemType.Fletcher]: {
    ingredients: new Map([
      [ItemType.Log, 8],
      [ItemType.Knife, 2],
    ]),
    duration: 4,
    output: ItemType.Fletcher,
  },
  [ItemType.WheatFarm]: {
    output: ItemType.WheatFarm,
    ingredients: new Map([
      [ItemType.Log, 8],
      [ItemType.Hoe, 2],
    ]),
    duration: 4,
  },
  [ItemType.WoodShop]: {
    output: ItemType.WoodShop,
    ingredients: new Map([
      [ItemType.Log, 8],
      [ItemType.Saw, 2],
    ]),
    duration: 4,
  },
  [ItemType.GatheringHut]: {
    output: ItemType.GatheringHut,
    ingredients: new Map([[ItemType.Log, 8]]),
    duration: 4,
  },

  // towers
  [ItemType.Slinger]: {
    output: ItemType.Slinger,
    ingredients: new Map([[ItemType.Log, 4]]),
    duration: 4,
  },
  [ItemType.Keep]: {
    output: ItemType.Keep,
    ingredients: new Map([
      [ItemType.Stone, 16],
      [ItemType.Log, 8],
    ]),
    duration: 4,
  },
  [ItemType.Ballista]: {
    output: ItemType.Ballista,
    ingredients: new Map([
      [ItemType.Board, 4],
      [ItemType.Beam, 3],
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
  [ItemType.Stone]: {
    output: ItemType.Stone,
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
  [ItemType.Wheat]: {
    ingredients: new Map(),
    duration: 0,
    output: ItemType.Wheat,
  },
  [ItemType.Berries]: {
    ingredients: new Map(),
    duration: 0,
    output: ItemType.Berries,
  },
  [ItemType.Portal]: {
    ingredients: new Map(),
    duration: 0,
    output: ItemType.Portal,
  },
  [ItemType.HomePortal]: {
    output: ItemType.HomePortal,
    ingredients: new Map(),
    duration: 0,
  },
};
