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
  name: string;
  maxStack: number;
  width: number;
  builds?: BuildingType;
  getEffects?: (rarity: Rarity) => Effect[];
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemTypes.Log]: {
    name: "Log",
    maxStack: 16,
    width: 0.5,
  },
  [ItemTypes.Stone]: {
    name: "Stone",
    maxStack: 16,
    width: 0.5,
  },
  [ItemTypes.Board]: {
    name: "Wooden Board",
    maxStack: 32,
    width: 0.25,
  },
  [ItemTypes.Beam]: {
    name: "Wooden Beam",
    maxStack: 16,
    width: 0.25,
  },
  [ItemTypes.StoneBlock]: {
    name: "Stone Block",
    maxStack: 16,
    width: 0.5,
  },

  // Foodish
  [ItemTypes.Wheat]: {
    name: "Wheat",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Berries]: {
    name: "Berries",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },

  // Metal
  [ItemTypes.IronOre]: {
    name: "Iron Ore",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.CopperOre]: {
    name: "Copper Ore",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.CopperBar]: {
    name: "Copper Bar",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.IronBar]: {
    name: "Iron Bar",
    maxStack: 64,
    width: 0.25,
  },

  // Projectiles
  [ItemTypes.StoneArrow]: {
    name: "Stone Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.IronArrow]: {
    name: "Iron Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.CopperArrow]: {
    name: "Copper Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.Arrowhead]: {
    name: "Stone Arrowhead",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.IronArrowhead]: {
    name: "Iron Arrowhead",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.CopperArrowhead]: {
    name: "Copper Arrowhead",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
  },

  // towers
  [ItemTypes.Slinger]: {
    name: "Slinger Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Slinger,
  },
  [ItemTypes.Keep]: {
    name: "Keep",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Keep,
  },
  [ItemTypes.Ballista]: {
    name: "Ballista Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Ballista,
  },
  [ItemTypes.OilTower]: {
    name: "Oil Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.OilTower,
  },
  [ItemTypes.Castle]: {
    name: "Castle",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Castle,
  },

  // buildings
  [ItemTypes.Lumberyard]: {
    name: "Lumberyard",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Lumberyard,
  },
  [ItemTypes.WoodenConveyor]: {
    name: "Wooden Conveyor",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WoodenConveyor,
  },
  [ItemTypes.Crate]: {
    name: "Storage Crate",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Crate,
  },
  [ItemTypes.Mine]: {
    name: "Mine",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Mine,
  },
  [ItemTypes.StoneCarver]: {
    name: "Stone Carver",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.StoneCarver,
  },
  [ItemTypes.GatheringHut]: {
    name: "Gathering Hut",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.GatheringHut,
  },
  [ItemTypes.Blacksmith]: {
    name: "Blacksmith",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Blacksmith,
  },
  [ItemTypes.Furnace]: {
    name: "Furnace",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Furnace,
  },
  [ItemTypes.Fletcher]: {
    name: "Fletcher",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Fletcher,
  },
  [ItemTypes.Inserter]: {
    name: "Wooden Inserter",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodenInserter,
  },
  [ItemTypes.WheatFarm]: {
    name: "Wheat Farm",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WheatFarm,
  },
  [ItemTypes.WoodShop]: {
    name: "Wood Shop",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.WoodShop,
  },
  [ItemTypes.Portal]: {
    name: "Portal",
    maxStack: 1,
    width: 0.5,
    builds: ItemTypes.Portal,
  },
  [ItemTypes.Town]: {
    name: "Town Center",
    maxStack: 1,
    width: 0.5,
    builds: ItemTypes.Town,
  },

  [ItemTypes.Anvil]: {
    name: "Anvil",
    maxStack: 1,
    width: 0.5,
    builds: undefined,
  },
  [ItemTypes.Hoe]: {
    name: "Hoe",
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Knife]: {
    name: "Knife",
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Saw]: {
    name: "Saw",
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Axe]: {
    name: "Axe",
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Pickaxe]: {
    name: "Pickaxe",
    maxStack: 1,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.Stick]: {
    name: "Wooden Stick",
    maxStack: 64,
    width: 0.2,
    builds: undefined,
  },
  [ItemTypes.Chisel]: {
    name: "Chisel",
    maxStack: 1,
    width: 0.25,
  },
  [ItemTypes.Human]: {
    name: "Human",
    maxStack: 1,
    width: 0.5,
  },

  // core
  [ItemTypes.Core]: {
    name: "Core",
    maxStack: 1,
    width: 0.25,
  },
  [ItemTypes.SpikedClub]: {
    name: "Spiked Club",
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
    name: "Rifle Scope",
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
    name: "Crow's Nest",
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
    name: "Llama Hoof",
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
