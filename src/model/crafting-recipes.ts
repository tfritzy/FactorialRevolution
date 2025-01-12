import { ItemType, ItemTypes } from "../item/item-type";

export type Recipe = {
  output: ItemType;
  outputQuantity?: number;
  ingredients: Map<ItemType, number>[];
  duration: number;
  playerCraftable: boolean;
};

export const recipes: Record<ItemType, Recipe> = {
  [ItemTypes.StoneBlock]: {
    output: ItemTypes.StoneBlock,
    ingredients: [new Map([[ItemTypes.Stone, 1]])],
    duration: 4,
    playerCraftable: true,
  },
  [ItemTypes.Board]: {
    output: ItemTypes.Board,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 4,
    playerCraftable: true,
  },
  [ItemTypes.Beam]: {
    output: ItemTypes.Beam,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 4,
    playerCraftable: true,
  },
  [ItemTypes.Charcoal]: {
    output: ItemTypes.Charcoal,
    ingredients: [
      new Map([[ItemTypes.Log, 1]]),
      new Map([[ItemTypes.Coal, 1]]),
    ],
    duration: 4,
    playerCraftable: false,
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
    duration: 4,
    playerCraftable: true,
  },

  // Metal
  [ItemTypes.IronBar]: {
    output: ItemTypes.IronBar,
    ingredients: [new Map([[ItemTypes.IronOre, 1]])],
    duration: 6,
    playerCraftable: false,
  },
  [ItemTypes.CopperBar]: {
    output: ItemTypes.CopperBar,
    ingredients: [new Map([[ItemTypes.CopperOre, 1]])],
    duration: 6,
    playerCraftable: false,
  },
  [ItemTypes.LeadBar]: {
    output: ItemTypes.LeadBar,
    ingredients: [new Map([[ItemTypes.Galena, 1]])],
    duration: 6,
    playerCraftable: false,
  },

  // Projectiles
  [ItemTypes.StoneArrow]: {
    output: ItemTypes.StoneArrow,
    outputQuantity: 1,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.Arrowhead, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.IronArrow]: {
    output: ItemTypes.IronArrow,
    outputQuantity: 1,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.IronArrowhead, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.CopperArrow]: {
    output: ItemTypes.CopperArrow,
    outputQuantity: 1,
    ingredients: [
      new Map([
        [ItemTypes.Log, 1],
        [ItemTypes.CopperArrowhead, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.Arrowhead]: {
    output: ItemTypes.Arrowhead,
    outputQuantity: 2,
    ingredients: [new Map([[ItemTypes.Stone, 1]])],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.IronArrowhead]: {
    output: ItemTypes.IronArrowhead,
    outputQuantity: 2,
    ingredients: [new Map([[ItemTypes.IronBar, 1]])],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.CopperArrowhead]: {
    output: ItemTypes.CopperArrowhead,
    outputQuantity: 2,
    ingredients: [new Map([[ItemTypes.CopperBar, 1]])],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.SteelPlate]: {
    output: ItemTypes.SteelPlate,
    outputQuantity: 1,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 5],
        [ItemTypes.Charcoal, 1],
      ]),
    ],
    duration: 12,
    playerCraftable: false,
  },
  [ItemTypes.CopperSheetRoll]: {
    output: ItemTypes.CopperSheetRoll,
    outputQuantity: 1,
    ingredients: [new Map([[ItemTypes.CopperBar, 5]])],
    duration: 8,
    playerCraftable: false,
  },
  [ItemTypes.LightMachineGunAmmo]: {
    output: ItemTypes.LightMachineGunAmmo,
    outputQuantity: 128,
    ingredients: [
      new Map([
        [ItemTypes.LeadBar, 1],
        [ItemTypes.CopperSheetRoll, 1],
        [ItemTypes.Gunpowder, 1],
      ]),
    ],
    duration: 8,
    playerCraftable: false,
  },
  [ItemTypes.MediumMachineGunAmmo]: {
    output: ItemTypes.MediumMachineGunAmmo,
    outputQuantity: 96,
    ingredients: [
      new Map([
        [ItemTypes.LeadBar, 1],
        [ItemTypes.CopperSheetRoll, 1],
        [ItemTypes.Gunpowder, 1],
      ]),
    ],
    duration: 8,
    playerCraftable: false,
  },
  [ItemTypes.HeavyMachineGunAmmo]: {
    output: ItemTypes.HeavyMachineGunAmmo,
    outputQuantity: 64,
    ingredients: [
      new Map([
        [ItemTypes.LeadBar, 1],
        [ItemTypes.CopperSheetRoll, 1],
        [ItemTypes.Gunpowder, 1],
      ]),
    ],
    duration: 8,
    playerCraftable: false,
  },

  // tools
  [ItemTypes.Anvil]: {
    output: ItemTypes.Anvil,
    ingredients: [new Map([[ItemTypes.IronBar, 8]])],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.Stick]: {
    output: ItemTypes.Stick,
    ingredients: [new Map([[ItemTypes.Log, 1]])],
    duration: 1,
    playerCraftable: true,
  },
  [ItemTypes.IronGear]: {
    output: ItemTypes.IronGear,
    ingredients: [new Map([[ItemTypes.IronBar, 2]])],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.SteelGear]: {
    output: ItemTypes.IronGear,
    ingredients: [new Map([[ItemTypes.SteelPlate, 1]])],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.Human]: {
    output: ItemTypes.Human,
    ingredients: [new Map([[ItemTypes.Food, 8]])],
    duration: 20,
    playerCraftable: false,
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
    playerCraftable: true,
  },
  [ItemTypes.Conveyor]: {
    output: ItemTypes.Conveyor,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.IronGear, 2],
      ]),
    ],
    duration: 1,
    playerCraftable: true,
  },
  [ItemTypes.Inserter]: {
    ingredients: [new Map([[ItemTypes.Human, 1]])],
    duration: 1,
    output: ItemTypes.Inserter,
    playerCraftable: true,
  },
  [ItemTypes.Crate]: {
    output: ItemTypes.Crate,
    ingredients: [new Map([[ItemTypes.Board, 8]])],
    duration: 1,
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
  },
  [ItemTypes.StoneFurnace]: {
    output: ItemTypes.StoneFurnace,
    ingredients: [new Map([[ItemTypes.Stone, 8]])],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.SteelFurnace]: {
    output: ItemTypes.SteelFurnace,
    ingredients: [
      new Map([
        [ItemTypes.SteelPlate, 10],
        [ItemTypes.StoneBlock, 20],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
  },

  // electric
  [ItemTypes.CopperWire]: {
    output: ItemTypes.CopperWire,
    ingredients: [new Map([[ItemTypes.CopperBar, 1]])],
    duration: 8,
    playerCraftable: false,
  },
  [ItemTypes.ElectricMotor]: {
    output: ItemTypes.ElectricMotor,
    ingredients: [
      new Map([
        [ItemTypes.CopperWire, 5],
        [ItemTypes.SteelPlate, 1],
        [ItemTypes.IronBar, 1],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.LargeElectricMotor]: {
    output: ItemTypes.LargeElectricMotor,
    ingredients: [
      new Map([
        [ItemTypes.CopperWire, 20],
        [ItemTypes.SteelPlate, 5],
        [ItemTypes.IronBar, 4],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.MetalRollingMill]: {
    output: ItemTypes.MetalRollingMill,
    ingredients: [
      new Map([
        [ItemTypes.MetalRoller, 3],
        [ItemTypes.LargeElectricMotor, 2],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.Gunsmith]: {
    output: ItemTypes.Gunsmith,
    ingredients: [
      new Map([
        [ItemTypes.SteelPlate, 5],
        [ItemTypes.StoneBlock, 10],
        [ItemTypes.ElectricMotor, 2],
        [ItemTypes.CopperWire, 5],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
  },
  [ItemTypes.MunitionsFactory]: {
    output: ItemTypes.MunitionsFactory,
    ingredients: [
      new Map([
        [ItemTypes.Conveyor, 5],
        [ItemTypes.SteelPlate, 10],
        [ItemTypes.StoneBlock, 20],
        [ItemTypes.ElectricMotor, 5],
        [ItemTypes.CopperWire, 10],
      ]),
    ],
    duration: 8,
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
  },
  [ItemTypes.MetalRoller]: {
    output: ItemTypes.MetalRoller,
    ingredients: [new Map([[ItemTypes.SteelPlate, 10]])],
    duration: 10,
    playerCraftable: true,
  },

  // tower components
  [ItemTypes.LightMachineGun]: {
    output: ItemTypes.LightMachineGun,
    ingredients: [
      new Map([
        [ItemTypes.SteelPlate, 5],
        [ItemTypes.SteelGear, 2],
      ]),
    ],
    duration: 8,
    playerCraftable: false,
  },
  [ItemTypes.MediumMachineGun]: {
    output: ItemTypes.MediumMachineGun,
    ingredients: [
      new Map([
        [ItemTypes.SteelPlate, 8],
        [ItemTypes.SteelGear, 2],
      ]),
    ],
    duration: 12,
    playerCraftable: false,
  },
  [ItemTypes.HeavyMachineGun]: {
    output: ItemTypes.HeavyMachineGun,
    ingredients: [
      new Map([
        [ItemTypes.SteelPlate, 10],
        [ItemTypes.SteelGear, 4],
      ]),
    ],
    duration: 16,
    playerCraftable: false,
  },

  // towers
  [ItemTypes.Slinger]: {
    output: ItemTypes.Slinger,
    ingredients: [
      new Map([
        [ItemTypes.Log, 8],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.ArcherTower]: {
    output: ItemTypes.ArcherTower,
    ingredients: [
      new Map([
        [ItemTypes.Log, 16],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
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
    playerCraftable: true,
  },

  [ItemTypes.Cannonball]: {
    output: ItemTypes.Cannonball,
    ingredients: [new Map([[ItemTypes.IronBar, 4]])],
    duration: 2,
    playerCraftable: false,
  },
  [ItemTypes.CarcassCannonShot]: {
    output: ItemTypes.CarcassCannonShot,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.Gunpowder, 1],
        [ItemTypes.Sulfur, 1],
        [ItemTypes.PineLog, 1],
      ]),
    ],
    duration: 2,
    playerCraftable: false,
  },
  [ItemTypes.GrapeCannonShot]: {
    output: ItemTypes.GrapeCannonShot,
    ingredients: [new Map([[ItemTypes.IronBar, 4]])],
    duration: 2,
    playerCraftable: false,
  },
  [ItemTypes.ExplosiveCannonShot]: {
    output: ItemTypes.ExplosiveCannonShot,
    ingredients: [
      new Map([
        [ItemTypes.IronBar, 2],
        [ItemTypes.Gunpowder, 2],
      ]),
    ],
    duration: 2,
    playerCraftable: false,
  },
  [ItemTypes.CannonBarrel]: {
    output: ItemTypes.CannonBarrel,
    ingredients: [new Map([[ItemTypes.IronBar, 32]])],
    duration: 2,
    playerCraftable: false,
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
    playerCraftable: true,
  },
  [ItemTypes.PalisadeWall]: {
    output: ItemTypes.PalisadeWall,
    ingredients: [new Map([[ItemTypes.Log, 2]])],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.BombardTower]: {
    output: ItemTypes.BombardTower,
    ingredients: [
      new Map([
        [ItemTypes.CannonBarrel, 4],
        [ItemTypes.StoneBlock, 128],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.CannonTower]: {
    output: ItemTypes.CannonTower,
    ingredients: [
      new Map([
        [ItemTypes.CannonBarrel, 1],
        [ItemTypes.Stone, 64],
        [ItemTypes.Log, 32],
      ]),
    ],
    duration: 2,
    playerCraftable: true,
  },
  [ItemTypes.LightMachineGunner]: {
    output: ItemTypes.LightMachineGunner,
    ingredients: [
      new Map([
        [ItemTypes.LightMachineGun, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 1,
    playerCraftable: true,
  },
  [ItemTypes.MediumMachineGunner]: {
    output: ItemTypes.MediumMachineGunner,
    ingredients: [
      new Map([
        [ItemTypes.MediumMachineGun, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 1,
    playerCraftable: true,
  },
  [ItemTypes.HeavyMachineGunner]: {
    output: ItemTypes.HeavyMachineGunner,
    ingredients: [
      new Map([
        [ItemTypes.HeavyMachineGun, 1],
        [ItemTypes.Human, 1],
      ]),
    ],
    duration: 1,
    playerCraftable: true,
  },

  // Uncraftable
  [ItemTypes.Log]: {
    output: ItemTypes.Log,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.PineLog]: {
    output: ItemTypes.PineLog,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Stone]: {
    output: ItemTypes.Stone,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.IronOre]: {
    output: ItemTypes.IronOre,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.CopperOre]: {
    output: ItemTypes.CopperOre,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Galena]: {
    output: ItemTypes.Galena,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Food]: {
    ingredients: [],
    duration: 0,
    playerCraftable: false,
    output: ItemTypes.Food,
  },
  [ItemTypes.Portal]: {
    ingredients: [],
    duration: 0,
    playerCraftable: false,
    output: ItemTypes.Portal,
  },
  [ItemTypes.Town]: {
    output: ItemTypes.Town,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Core]: {
    output: ItemTypes.Core,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.SpikedClub]: {
    output: ItemTypes.SpikedClub,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.RifleScope]: {
    output: ItemTypes.RifleScope,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.CrowsNest]: {
    output: ItemTypes.CrowsNest,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.LlamaHoof]: {
    output: ItemTypes.LlamaHoof,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  coal: {
    output: ItemTypes.Coal,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Niter]: {
    output: ItemTypes.Niter,
    ingredients: [],
    duration: 0,
    playerCraftable: false,
  },
  [ItemTypes.Sulfur]: {
    output: ItemTypes.Sulfur,
    ingredients: [],
    duration: 1,
    playerCraftable: false,
  },
};
