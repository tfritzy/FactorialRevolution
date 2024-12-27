import { ItemType } from "../item/item-type";

export type Recipe = {
  output: ItemType;
  ingredients: Map<ItemType, number>[];
  duration: number;
};

export const recipes: Record<ItemType, Recipe> = {
  [ItemType.StoneBlock]: {
    output: ItemType.StoneBlock,
    ingredients: [new Map([[ItemType.Stone, 1]])],
    duration: 1,
  },
  [ItemType.Board]: {
    output: ItemType.Board,
    ingredients: [new Map([[ItemType.Log, 1]])],
    duration: 1,
  },
  [ItemType.Beam]: {
    output: ItemType.Beam,
    ingredients: [new Map([[ItemType.Log, 1]])],
    duration: 1,
  },

  // Metal
  [ItemType.IronBar]: {
    output: ItemType.IronBar,
    ingredients: [new Map([[ItemType.IronOre, 1]])],
    duration: 2,
  },
  [ItemType.CopperBar]: {
    output: ItemType.CopperBar,
    ingredients: [new Map([[ItemType.CopperOre, 1]])],
    duration: 2,
  },

  // Projectiles
  [ItemType.StoneArrow]: {
    output: ItemType.StoneArrow,
    ingredients: [
      new Map([
        [ItemType.Stick, 1],
        [ItemType.Arrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemType.IronArrow]: {
    output: ItemType.IronArrow,
    ingredients: [
      new Map([
        [ItemType.Stick, 1],
        [ItemType.IronArrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemType.CopperArrow]: {
    output: ItemType.CopperArrow,
    ingredients: [
      new Map([
        [ItemType.Stick, 1],
        [ItemType.CopperArrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemType.Arrowhead]: {
    output: ItemType.Arrowhead,
    ingredients: [new Map([[ItemType.Stone, 1]])],
    duration: 1,
  },
  [ItemType.IronArrowhead]: {
    output: ItemType.IronArrowhead,
    ingredients: [new Map([[ItemType.IronBar, 1]])],
    duration: 1,
  },
  [ItemType.CopperArrowhead]: {
    output: ItemType.CopperArrowhead,
    ingredients: [new Map([[ItemType.CopperBar, 1]])],
    duration: 1,
  },

  // tools
  [ItemType.Anvil]: {
    output: ItemType.Anvil,
    ingredients: [new Map([[ItemType.IronBar, 8]])],
    duration: 4,
  },
  [ItemType.Hoe]: {
    output: ItemType.Hoe,
    ingredients: [
      new Map([
        [ItemType.IronBar, 1],
        [ItemType.Log, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Knife]: {
    output: ItemType.Knife,
    ingredients: [
      new Map([
        [ItemType.Log, 1],
        [ItemType.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Saw]: {
    output: ItemType.Saw,
    ingredients: [
      new Map([
        [ItemType.Log, 1],
        [ItemType.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Axe]: {
    output: ItemType.Axe,
    ingredients: [
      new Map([
        [ItemType.Log, 1],
        [ItemType.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Pickaxe]: {
    output: ItemType.Pickaxe,
    ingredients: [
      new Map([
        [ItemType.Log, 1],
        [ItemType.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Chisel]: {
    output: ItemType.Chisel,
    ingredients: [
      new Map([
        [ItemType.Log, 1],
        [ItemType.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemType.Stick]: {
    output: ItemType.Stick,
    ingredients: [new Map([[ItemType.Log, 1]])],
    duration: 1,
  },
  [ItemType.Human]: {
    output: ItemType.Human,
    ingredients: [
      new Map([[ItemType.Berries, 16]]),
      new Map([[ItemType.Wheat, 8]]),
    ],
    duration: 30,
  },

  // buildings
  [ItemType.Lumberyard]: {
    output: ItemType.Lumberyard,
    ingredients: [
      new Map([
        [ItemType.Log, 4],
        [ItemType.Axe, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.WoodenConveyor]: {
    output: ItemType.WoodenConveyor,
    ingredients: [new Map([[ItemType.Log, 2]])],
    duration: 1,
  },
  [ItemType.Inserter]: {
    ingredients: [new Map([[ItemType.Human, 1]])],
    duration: 1,
    output: ItemType.Inserter,
  },
  [ItemType.Crate]: {
    output: ItemType.Crate,
    ingredients: [new Map([[ItemType.Board, 8]])],
    duration: 2,
  },
  [ItemType.Mine]: {
    output: ItemType.Mine,
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Pickaxe, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.StoneCarver]: {
    output: ItemType.StoneCarver,
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Chisel, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Blacksmith]: {
    output: ItemType.Blacksmith,
    ingredients: [
      new Map([
        [ItemType.Stone, 8],
        [ItemType.Anvil, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Furnace]: {
    output: ItemType.Furnace,
    ingredients: [
      new Map([
        [ItemType.Stone, 8],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Fletcher]: {
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Knife, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
    output: ItemType.Fletcher,
  },
  [ItemType.WheatFarm]: {
    output: ItemType.WheatFarm,
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Hoe, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.WoodShop]: {
    output: ItemType.WoodShop,
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Saw, 1],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.GatheringHut]: {
    output: ItemType.GatheringHut,
    ingredients: [
      new Map([
        [ItemType.Log, 8],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },

  // towers
  [ItemType.Slinger]: {
    output: ItemType.Slinger,
    ingredients: [
      new Map([
        [ItemType.Log, 4],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Keep]: {
    output: ItemType.Keep,
    ingredients: [
      new Map([
        [ItemType.Stone, 8],
        [ItemType.Log, 8],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Ballista]: {
    output: ItemType.Ballista,
    ingredients: [
      new Map([
        [ItemType.Board, 4],
        [ItemType.Beam, 3],
        [ItemType.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemType.OilTower]: {
    output: ItemType.OilTower,
    ingredients: [
      new Map([
        [ItemType.Log, 4],
        [ItemType.StoneBlock, 32],
        [ItemType.Human, 2],
      ]),
    ],
    duration: 4,
  },
  [ItemType.Castle]: {
    output: ItemType.Castle,
    ingredients: [
      new Map([
        [ItemType.StoneBlock, 128],
        [ItemType.Beam, 64],
        [ItemType.Board, 32],
        [ItemType.Human, 4],
      ]),
    ],
    duration: 4,
  },

  // Uncraftable
  [ItemType.Log]: {
    output: ItemType.Log,
    ingredients: [],
    duration: 0,
  },
  [ItemType.Stone]: {
    output: ItemType.Stone,
    ingredients: [],
    duration: 0,
  },
  [ItemType.IronOre]: {
    output: ItemType.IronOre,
    ingredients: [],
    duration: 0,
  },
  [ItemType.CopperOre]: {
    output: ItemType.CopperOre,
    ingredients: [],
    duration: 0,
  },
  [ItemType.Wheat]: {
    ingredients: [],
    duration: 0,
    output: ItemType.Wheat,
  },
  [ItemType.Berries]: {
    ingredients: [],
    duration: 0,
    output: ItemType.Berries,
  },
  [ItemType.Portal]: {
    ingredients: [],
    duration: 0,
    output: ItemType.Portal,
  },
  [ItemType.Town]: {
    output: ItemType.Town,
    ingredients: [],
    duration: 0,
  },
};
