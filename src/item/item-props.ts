import { BuildingType, BuildingTypes } from "../model/entity-type";
import { ItemType, ItemTypes } from "./item-type";
import { Rarity } from "./rarity";
import {
  Effect,
  flatDamageEffect,
  percentDamageEffect,
  rangeEffect,
} from "./effect";
import { ItemCategory } from "./item";

type ItemProps = {
  name: string;
  maxStack: number;
  width: number;
  builds?: BuildingType;
  getEffects?: (rarity: Rarity) => Effect[];
  category?: ItemCategory;
  energy_kwh?: number;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemTypes.Log]: {
    name: "Log",
    maxStack: 64,
    width: 0.5,
    energy_kwh: 0.5,
    category: "category-log",
  },
  [ItemTypes.PineLog]: {
    name: "Pine log",
    maxStack: 64,
    width: 0.5,
    energy_kwh: 0.5,
    category: "category-log",
  },
  [ItemTypes.Stone]: {
    name: "Stone",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.Board]: {
    name: "Wooden Board",
    maxStack: 64,
    width: 0.25,
    energy_kwh: 0.25,
  },
  [ItemTypes.Beam]: {
    name: "Wooden Beam",
    maxStack: 64,
    width: 0.25,
    energy_kwh: 0.25,
  },
  [ItemTypes.StoneBlock]: {
    name: "Stone Block",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.Charcoal]: {
    name: "Charcoal",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.Gunpowder]: {
    name: "Gunpowder",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.Sulfur]: {
    name: "Sulfur",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.Niter]: {
    name: "Niter",
    maxStack: 64,
    width: 0.2,
  },

  // Foodish
  [ItemTypes.Food]: {
    name: "Food",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },

  // Ores
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
  [ItemTypes.Coal]: {
    name: "Coal",
    maxStack: 64,
    width: 0.25,
    energy_kwh: 1,
  },
  [ItemTypes.SteelPlate]: {
    name: "Iron Plate",
    maxStack: 64,
    width: 0.25,
  },

  // Projectiles
  [ItemTypes.StoneArrow]: {
    name: "Stone Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
    category: "category-arrow",
  },
  [ItemTypes.CopperArrow]: {
    name: "Copper Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
    category: "category-arrow",
  },
  [ItemTypes.IronArrow]: {
    name: "Iron Arrow",
    maxStack: 64,
    width: 0.1,
    builds: undefined,
    category: "category-arrow",
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
  [ItemTypes.ArcherTower]: {
    name: "Archer Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.ArcherTower,
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
  [ItemTypes.Conveyor]: {
    name: "Conveyor",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Conveyor,
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
  [ItemTypes.StoneFurnace]: {
    name: "Furnace",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.StoneFurnace,
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
    builds: BuildingTypes.Portal,
  },
  [ItemTypes.Town]: {
    name: "Town Center",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.Town,
  },
  [ItemTypes.SteamMiningDrill]: {
    name: "Steam Mining Drill",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.SteamMiningDrill,
  },

  [ItemTypes.Anvil]: {
    name: "Anvil",
    maxStack: 1,
    width: 0.5,
    builds: undefined,
  },
  [ItemTypes.Stick]: {
    name: "Wooden Stick",
    maxStack: 64,
    width: 0.2,
    builds: undefined,
  },
  [ItemTypes.IronGear]: {
    name: "Iron Gear",
    maxStack: 64,
    width: 0.2,
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
    category: "category-core",
  },
  [ItemTypes.SpikedClub]: {
    name: "Spiked Club",
    maxStack: 1,
    width: 0.25,
    category: "category-relic",
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [flatDamageEffect(2)];
        case "magic":
          return [flatDamageEffect(3)];
        case "rare":
          return [flatDamageEffect(4)];
        case "legendary":
          return [flatDamageEffect(5)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.RifleScope]: {
    name: "Rifle Scope",
    maxStack: 1,
    width: 0.25,
    category: "category-relic",
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [rangeEffect(1)];
        case "magic":
          return [rangeEffect(1.25)];
        case "rare":
          return [rangeEffect(1.5)];
        case "legendary":
          return [rangeEffect(2)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.CrowsNest]: {
    name: "Crow's Nest",
    maxStack: 1,
    width: 0.25,
    category: "category-relic",
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [percentDamageEffect(2)];
        case "magic":
          return [percentDamageEffect(3)];
        case "rare":
          return [percentDamageEffect(4)];
        case "legendary":
          return [percentDamageEffect(5)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.LlamaHoof]: {
    name: "Llama Hoof",
    maxStack: 1,
    width: 0.25,
    category: "category-relic",
    getEffects: (rarity: Rarity) => {
      switch (rarity) {
        case "common":
          return [flatDamageEffect(2)];
        case "magic":
          return [flatDamageEffect(3)];
        case "rare":
          return [flatDamageEffect(4)];
        case "legendary":
          return [flatDamageEffect(5)];
        default:
          throw new Error("Unknown rarity " + rarity);
      }
    },
  },
  [ItemTypes.Cannonball]: {
    name: "Cannonball",
    maxStack: 64,
    width: 0.2,
    category: "category-cannon-ball",
  },
  [ItemTypes.GrapeCannonShot]: {
    name: "Shrapnesl Cannon Shot",
    maxStack: 64,
    width: 0.2,
    category: "category-cannon-ball",
  },
  [ItemTypes.CarcassCannonShot]: {
    name: "Carcass Cannon Shot",
    maxStack: 64,
    width: 0.2,
    category: "category-cannon-ball",
  },
  [ItemTypes.ExplosiveCannonShot]: {
    name: "Explosive Cannon Shot",
    maxStack: 64,
    width: 0.2,
    category: "category-cannon-ball",
  },
  "cannon-barrel": {
    name: "Cannon Barrel",
    maxStack: 1,
    width: 0.25,
  },
  [ItemTypes.BombardTower]: {
    name: "Bombard Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.BombardTower,
  },
  [ItemTypes.CannonTower]: {
    name: "Cannon Tower",
    maxStack: 1,
    width: 0.5,
    builds: BuildingTypes.CannonTower,
  },
  [ItemTypes.BallistaBolt]: {
    name: "Ballista Bolt",
    maxStack: 64,
    width: 0.1,
  },
  [ItemTypes.PalisadeWall]: {
    name: "Palisade Wall",
    maxStack: 64,
    width: 0.2,
    builds: BuildingTypes.PalisadeWall,
  },
};
