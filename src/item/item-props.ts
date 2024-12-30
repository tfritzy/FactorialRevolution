import { BuildingType, BuildingTypes } from "../model/entity-type";
import { ItemType, ItemTypes } from "./item-type";
import { Rarity } from "./rarity";
import {
  Effect,
  flatDamageEffect,
  percentDamageEffect,
  rangeEffect,
} from "./effect";

type ItemProps = {
  maxStack: number;
  width: number;
  builds?: BuildingType;
  getEffects?: (rarity: Rarity) => Effect[];
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemTypes.Log]: {
    maxStack: 16,
    width: 0.5,
  },
  [ItemTypes.Stone]: {
    maxStack: 16,
    width: 0.5,
  },
  [ItemTypes.Board]: {
    maxStack: 32,
    width: 0.25,
  },
  [ItemTypes.Beam]: {
    maxStack: 16,
    width: 0.25,
  },
  [ItemTypes.StoneBlock]: {
    maxStack: 16,
    width: 0.5,
  },

  // Foodish
  [ItemTypes.Wheat]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Berries]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },

  // Metal
  [ItemTypes.IronOre]: {
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.CopperOre]: {
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.CopperBar]: {
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.IronBar]: {
    maxStack: 64,
    width: 0.25,
  },

  // Projectiles
  [ItemTypes.StoneArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.IronArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.CopperArrow]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.Arrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.IronArrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.CopperArrowhead]: {
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },

  // towers
  [ItemTypes.Slinger]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Slinger,
  },
  [ItemTypes.Keep]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Keep,
  },
  [ItemTypes.Ballista]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Ballista,
  },
  [ItemTypes.OilTower]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.OilTower,
  },
  [ItemTypes.Castle]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Castle,
  },

  // buildings
  [ItemTypes.Lumberyard]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Lumberyard,
  },
  [ItemTypes.WoodenConveyor]: {
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WoodenConveyor,
  },
  [ItemTypes.Crate]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Crate,
  },
  [ItemTypes.Mine]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Mine,
  },
  [ItemTypes.StoneCarver]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.StoneCarver,
  },
  [ItemTypes.GatheringHut]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.GatheringHut,
  },
  [ItemTypes.Blacksmith]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Blacksmith,
  },
  [ItemTypes.Furnace]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Furnace,
  },
  [ItemTypes.Fletcher]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Fletcher,
  },
  [ItemTypes.Inserter]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodenInserter,
  },
  [ItemTypes.WheatFarm]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WheatFarm,
  },
  [ItemTypes.WoodShop]: {
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodShop,
  },
  [ItemTypes.Portal]: {
    maxStack: 1,
    width: 0.5,
    builds: ItemTypes.Portal,
  },
  [ItemTypes.Town]: {
    maxStack: 1,
    width: 0.5,
    builds: ItemTypes.Town,
  },

  [ItemTypes.Anvil]: {
    maxStack: 1,
    width: 0.5,
    builds: undefined,
  },
  [ItemTypes.Hoe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Knife]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Saw]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Axe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Pickaxe]: {
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Stick]: {
    maxStack: 64,
    width: 0.2,
    builds: undefined,
  },
  [ItemTypes.Chisel]: {
    maxStack: 1,
    width: 0.25,
  },
  [ItemTypes.Human]: {
    maxStack: 1,
    width: 0.5,
  },

  // core
  [ItemTypes.Core]: {
    maxStack: 1,
    width: 0.25,
  },
  [ItemTypes.SpikedClub]: {
    maxStack: 1,
    width: 0.25,
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [flatDamageEffect(20)];
        case "magic":
          return [flatDamageEffect(25)];
        case "rare":
          return [flatDamageEffect(30)];
        case "legendary":
          return [flatDamageEffect(35)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.RifleScope]: {
    maxStack: 1,
    width: 0.25,
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [rangeEffect(2)];
        case "magic":
          return [rangeEffect(2.5)];
        case "rare":
          return [rangeEffect(3)];
        case "legendary":
          return [rangeEffect(3.5)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.CrowsNest]: {
    maxStack: 1,
    width: 0.25,
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [percentDamageEffect(20)];
        case "magic":
          return [percentDamageEffect(25)];
        case "rare":
          return [percentDamageEffect(30)];
        case "legendary":
          return [percentDamageEffect(35)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.LlamaHoof]: {
    maxStack: 1,
    width: 0.25,
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [flatDamageEffect(20)];
        case "magic":
          return [flatDamageEffect(25)];
        case "rare":
          return [flatDamageEffect(30)];
        case "legendary":
          return [flatDamageEffect(35)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
};
