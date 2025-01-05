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
  [ItemTypes.Charcoal]: {
    output: ItemTypes.Charcoal,
    ingredients: [
      new Map([[ItemTypes.Log, 1]]),
      new Map([[ItemTypes.Coal, 1]]),
    ],
    duration: 1,
  },
  [ItemTypes.Gunpowder]: {
    output: ItemTypes.Gunpowder,
    ingredients: [
      new Map([
        [ItemTypes.Niter, 3],
        [ItemTypes.Charcoal, 1],
        [ItemTypes.Sulfur, 1],
      ]),
    ],
    duration: 1,
  },

  // Metal
  [ItemTypes.IronBar]: {
    output: ItemTypes.IronBar,
    ingredients: [new Map([[ItemTypes.IronOre, 1]])],
    duration: 6,
  },
  [ItemTypes.CopperBar]: {
    output: ItemTypes.CopperBar,
    ingredients: [new Map([[ItemTypes.CopperOre, 1]])],
    duration: 6,
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
    duration: 2,
  },
  [ItemTypes.IronArrow]: {
    output: ItemTypes.IronArrow,
    ingredients: [
      new Map([
        [ItemTypes.Stick, 1],
        [ItemTypes.IronArrowhead, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.CopperArrow]: {
    output: ItemTypes.CopperArrow,
    ingredients: [
      new Map([
        [ItemTypes.Stick, 1],
        [ItemTypes.CopperArrowhead, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Arrowhead]: {
    output: ItemTypes.Arrowhead,
    ingredients: [new Map([[ItemTypes.Stone, 1]])],
    duration: 2,
  },
  [ItemTypes.IronArrowhead]: {
    output: ItemTypes.IronArrowhead,
    ingredients: [new Map([[ItemTypes.IronBar, 1]])],
    duration: 2,
  },
  [ItemTypes.CopperArrowhead]: {
    output: ItemTypes.CopperArrowhead,
    ingredients: [new Map([[ItemTypes.CopperBar, 1]])],
    duration: 2,
  },

  // tools
  [ItemTypes.Anvil]: {
    output: ItemTypes.Anvil,
    ingredients: [new Map([[ItemTypes.IronBar, 8]])],
    duration: 2,
  },
  [ItemTypes.Stick]: {
    output: ItemTypes.Stick,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 1,
  },
  [ItemTypes.IronGear]: {
    output: ItemTypes.IronGear,
    ingredients: [new Map([[ItemTypes.IronBar, 2]])],
    duration: 2,
  },
  [ItemTypes.Human]: {
    output: ItemTypes.Human,
    ingredients: [new Map([[ItemTypes.Food, 8]])],
    duration: 20,
  },

  // buildings
  [ItemTypes.Lumberyard]: {
    output: ItemTypes.Lumberyard,
    ingredients: [
      new Map([
        [ItemTypes.Log, 4],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
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
    duration: 1,
  },
  [ItemTypes.Mine]: {
    output: ItemTypes.Mine,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.StoneCarver]: {
    output: ItemTypes.StoneCarver,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
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
    duration: 2,
  },
  [ItemTypes.StoneFurnace]: {
    output: ItemTypes.StoneFurnace,
    ingredients: [new Map([[ItemTypes.Stone, 8]])],
    duration: 2,
  },
  [ItemTypes.Fletcher]: {
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
    output: ItemTypes.Fletcher,
  },
  [ItemTypes.WheatFarm]: {
    output: ItemTypes.WheatFarm,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.WoodShop]: {
    output: ItemTypes.WoodShop,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.IronBar, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.GatheringHut]: {
    output: ItemTypes.GatheringHut,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.SteamMiningDrill]: {
    output: ItemTypes.SteamMiningDrill,
    ingredients: [
      new Map([
        [ItemTypes.StoneFurnace, 1],
        [ItemTypes.IronBar, 7],
        [ItemTypes.IronGear, 3],
      ]),
    ],
    duration: 2,
  },

  // towers
  [ItemTypes.Slinger]: {
    output: ItemTypes.Slinger,
    ingredients: [
      new Map([
        [ItemTypes.Log, 16],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Keep]: {
    output: ItemTypes.Keep,
    ingredients: [
      new Map([
        [ItemTypes.Stone, 32],
        [ItemTypes.Log, 32],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Ballista]: {
    output: ItemTypes.Ballista,
    ingredients: [
      new Map([
        [ItemTypes.Board, 64],
        [ItemTypes.Beam, 32],
        [ItemTypes.IronBar, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.OilTower]: {
    output: ItemTypes.OilTower,
    ingredients: [
      new Map([
        [ItemTypes.Log, 64],
        [ItemTypes.StoneBlock, 128],
        [ItemTypes.Human, 2],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.Castle]: {
    output: ItemTypes.Castle,
    ingredients: [
      new Map([
        [ItemTypes.StoneBlock, 512],
        [ItemTypes.Beam, 128],
        [ItemTypes.Board, 128],
        [ItemTypes.Human, 8],
      ]),
    ],
    duration: 2,
  },

  [ItemTypes.Cannonball]: {
    output: ItemTypes.Cannonball,
    ingredients: [new Map([[ItemTypes.IronBar, 4]])],
    duration: 2,
  },
  [ItemTypes.CarcassCannonShot]: {
    output: ItemTypes.Cannonball,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.Gunpowder, 1],
        [ItemTypes.Sulfur, 1],
        [ItemTypes.PineLog, 1],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.GrapeCannonShot]: {
    output: ItemTypes.Cannonball,
    ingredients: [new Map([[ItemTypes.IronBar, 4]])],
    duration: 2,
  },
  [ItemTypes.ExplosiveCannonShot]: {
    output: ItemTypes.Cannonball,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.Gunpowder, 2],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.CannonBarrel]: {
    output: ItemTypes.CannonBarrel,
    ingredients: [new Map([[ItemTypes.IronBar, 128]])],
    duration: 2,
  },
  [ItemTypes.BallistaBolt]: {
    output: ItemTypes.BallistaBolt,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.Log, 4],
      ]),
    ],
    duration: 2,
  },
  [ItemTypes.PalisadeWall]: {
    output: ItemTypes.PalisadeWall,
    ingredients: [new Map([[ItemTypes.Log, 2]])],
    duration: 2,
  },

  // Uncraftable
  [ItemTypes.Log]: {
    output: ItemTypes.Log,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.PineLog]: {
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
  [ItemTypes.Food]: {
    ingredients: [],
    duration: 0,
    output: ItemTypes.Food,
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
  [ItemTypes.BombardTower]: {
    output: ItemTypes.BombardTower,
    ingredients: [
      new Map([
        [ItemTypes.CannonBarrel, 1],
        [ItemTypes.Stone, 256],
      ]),
    ],
    duration: 2,
  },
  coal: {
    output: ItemTypes.Coal,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.Niter]: {
    output: ItemTypes.Niter,
    ingredients: [],
    duration: 0,
  },
  [ItemTypes.Sulfur]: {
    output: ItemTypes.Sulfur,
    ingredients: [],
    duration: 1,
  },
};
