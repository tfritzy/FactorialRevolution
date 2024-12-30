import { ItemType, ItemTypes } from "../item/item-type";

export type Recipe = {
  output: ItemType;
  ingredients: Map<ItemType, number>[];
  duration: number;
};

export const recipes: Record<ItemType, Recipe> = {
  [ItemTypes.StoneBlock]: {
    output: ItemTypes.StoneBlock,
    ingredients: [new Map([[ItemTypes.Stone, 1]])],
    duration: 1,
  },
  [ItemTypes.Board]: {
    output: ItemTypes.Board,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 1,
  },
  [ItemTypes.Beam]: {
    output: ItemTypes.Beam,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 1,
  },

  // Metal
  [ItemTypes.IronBar]: {
    output: ItemTypes.IronBar,
    ingredients: [new Map([[ItemTypes.IronOre, 1]])],
    duration: 2,
  },
  [ItemTypes.CopperBar]: {
    output: ItemTypes.CopperBar,
    ingredients: [new Map([[ItemTypes.CopperOre, 1]])],
    duration: 2,
  },

  // Projectiles
  [ItemTypes.StoneArrow]: {
    output: ItemTypes.StoneArrow,
    ingredients: [
      new Map([
        [ItemTypes.Stick, 1],
        [ItemTypes.Arrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemTypes.IronArrow]: {
    output: ItemTypes.IronArrow,
    ingredients: [
      new Map([
        [ItemTypes.Stick, 1],
        [ItemTypes.IronArrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemTypes.CopperArrow]: {
    output: ItemTypes.CopperArrow,
    ingredients: [
      new Map([
        [ItemTypes.Stick, 1],
        [ItemTypes.CopperArrowhead, 1],
      ]),
    ],
    duration: 1,
  },
  [ItemTypes.Arrowhead]: {
    output: ItemTypes.Arrowhead,
    ingredients: [new Map([[ItemTypes.Stone, 1]])],
    duration: 1,
  },
  [ItemTypes.IronArrowhead]: {
    output: ItemTypes.IronArrowhead,
    ingredients: [new Map([[ItemTypes.IronBar, 1]])],
    duration: 1,
  },
  [ItemTypes.CopperArrowhead]: {
    output: ItemTypes.CopperArrowhead,
    ingredients: [new Map([[ItemTypes.CopperBar, 1]])],
    duration: 1,
  },

  // tools
  [ItemTypes.Anvil]: {
    output: ItemTypes.Anvil,
    ingredients: [new Map([[ItemTypes.IronBar, 8]])],
    duration: 4,
  },
  [ItemTypes.Hoe]: {
    output: ItemTypes.Hoe,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 1],
        [ItemTypes.Log, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Knife]: {
    output: ItemTypes.Knife,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Saw]: {
    output: ItemTypes.Saw,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Axe]: {
    output: ItemTypes.Axe,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Pickaxe]: {
    output: ItemTypes.Pickaxe,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Chisel]: {
    output: ItemTypes.Chisel,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Stick]: {
    output: ItemTypes.Stick,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 1,
  },
  [ItemTypes.Human]: {
    output: ItemTypes.Human,
    ingredients: [
      new Map([[ItemTypes.Berries, 16]]),
      new Map([[ItemTypes.Wheat, 8]]),
    ],
    duration: 30,
  },

  // buildings
  [ItemTypes.Lumberyard]: {
    output: ItemTypes.Lumberyard,
    ingredients: [
      new Map([
        [ItemTypes.Log, 4],
        [ItemTypes.Axe, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.WoodenConveyor]: {
    output: ItemTypes.WoodenConveyor,
    ingredients: [new Map([[ItemTypes.Log, 2]])],
    duration: 1,
  },
  [ItemTypes.Inserter]: {
    ingredients: [new Map([[ItemTypes.Human, 1]])],
    duration: 1,
    output: ItemTypes.Inserter,
  },
  [ItemTypes.Crate]: {
    output: ItemTypes.Crate,
    ingredients: [new Map([[ItemTypes.Board, 8]])],
    duration: 2,
  },
  [ItemTypes.Mine]: {
    output: ItemTypes.Mine,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Pickaxe, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.StoneCarver]: {
    output: ItemTypes.StoneCarver,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Chisel, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Blacksmith]: {
    output: ItemTypes.Blacksmith,
    ingredients: [
      new Map([
        [ItemTypes.Stone, 8],
        [ItemTypes.Anvil, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Furnace]: {
    output: ItemTypes.Furnace,
    ingredients: [
      new Map([
        [ItemTypes.Stone, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Fletcher]: {
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Knife, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
    output: ItemTypes.Fletcher,
  },
  [ItemTypes.WheatFarm]: {
    output: ItemTypes.WheatFarm,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Hoe, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.WoodShop]: {
    output: ItemTypes.WoodShop,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Saw, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.GatheringHut]: {
    output: ItemTypes.GatheringHut,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },

  // towers
  [ItemTypes.Slinger]: {
    output: ItemTypes.Slinger,
    ingredients: [
      new Map([
        [ItemTypes.Log, 4],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Keep]: {
    output: ItemTypes.Keep,
    ingredients: [
      new Map([
        [ItemTypes.Stone, 8],
        [ItemTypes.Log, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Ballista]: {
    output: ItemTypes.Ballista,
    ingredients: [
      new Map([
        [ItemTypes.Board, 4],
        [ItemTypes.Beam, 3],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.OilTower]: {
    output: ItemTypes.OilTower,
    ingredients: [
      new Map([
        [ItemTypes.Log, 4],
        [ItemTypes.StoneBlock, 32],
        [ItemTypes.Human, 2],
      ]),
    ],
    duration: 4,
  },
  [ItemTypes.Castle]: {
    output: ItemTypes.Castle,
    ingredients: [
      new Map([
        [ItemTypes.StoneBlock, 128],
        [ItemTypes.Beam, 64],
        [ItemTypes.Board, 32],
        [ItemTypes.Human, 4],
      ]),
    ],
    duration: 4,
  },

  // Uncraftable
  [ItemTypes.Log]: {
    output: ItemTypes.Log,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.Stone]: {
    output: ItemTypes.Stone,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.IronOre]: {
    output: ItemTypes.IronOre,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.CopperOre]: {
    output: ItemTypes.CopperOre,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.Wheat]: {
    ingredients: [],
    duration: 0,
    output: ItemTypes.Wheat,
  },
  [ItemTypes.Berries]: {
    ingredients: [],
    duration: 0,
    output: ItemTypes.Berries,
  },
  [ItemTypes.Portal]: {
    ingredients: [],
    duration: 0,
    output: ItemTypes.Portal,
  },
  [ItemTypes.Town]: {
    output: ItemTypes.Town,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.Core]: {
    output: ItemTypes.Core,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.SpikedClub]: {
    output: ItemTypes.SpikedClub,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.RifleScope]: {
    output: ItemTypes.RifleScope,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.CrowsNest]: {
    output: ItemTypes.CrowsNest,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.LlamaHoof]: {
    output: ItemTypes.LlamaHoof,
    ingredients: [],
    duration: 0,
  },
};
