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
  description?: string;
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
    description: "Can be used as a material or combusted.",
  },
  [ItemTypes.PineLog]: {
    name: "Pine log",
    maxStack: 64,
    width: 0.5,
    energy_kwh: 0.5,
    category: "category-log",
    description: "Same as a normal log, but also has resin.",
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
  [ItemTypes.Galena]: {
    name: "Galena",
    description: "Galena",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.LeadBar]: {
    name: "Lead Bar",
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
    name: "Steel Plate",
    description: "Strong metal made by smelting iron with charcoal.",
    maxStack: 64,
    width: 0.25,
  },
  [ItemTypes.CopperSheetRoll]: {
    name: "Copper Sheet Roll",
    description: "Copper bar rolled into a sheet. Used for bullet casings.",
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
  [ItemTypes.LightMachineGunAmmo]: {
    name: "Light Machine Gun Ammo",
    description: "Bullets compatible with light machine guns.",
    maxStack: 256,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.MediumMachineGunAmmo]: {
    name: "Medium Machine Gun Ammo",
    description: "Bullets compatible with medium machine guns.",
    maxStack: 256,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.HeavyMachineGunAmmo]: {
    name: "Heavy Machine Gun Ammo",
    description: "Bullets compatible with heavy machine guns.",
    maxStack: 256,
    width: 0.1,
    builds: undefined,
  },
  [ItemTypes.Musket]: {
    name: "Musket",
    description: "A primitive gun that fires lead pellets with gunpowder",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.RifledMusket]: {
    name: "Rifled Musket",
    description: "A musket with a rifled barrel, increasing range and damage.",
    maxStack: 64,
    width: 0.25,
    builds: undefined,
  },
  [ItemTypes.MusketBall]: {
    name: "Musket Ball",
    description: "A ball of lead. Ammunition for muskets.",
    maxStack: 128,
    width: 0.1,
    builds: undefined,
  },

  // towers
  [ItemTypes.Slinger]: {
    name: "Slinger Tower",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Slinger,
  },
  [ItemTypes.ArcherTower]: {
    name: "Archer Tower",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.ArcherTower,
  },
  [ItemTypes.Keep]: {
    name: "Keep",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Keep,
  },
  [ItemTypes.Musketeer]: {
    name: "Musketeer",
    description: "A person armed with a musket.",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Musketeer,
  },
  [ItemTypes.RifledMusketeer]: {
    name: "Rifled Musketeer",
    description:
      "A person armed with a rifled musket, a slower weapon with increased range and damage.",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.RifledMusketeer,
  },
  [ItemTypes.Ballista]: {
    name: "Ballista Tower",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Ballista,
  },
  [ItemTypes.OilTower]: {
    name: "Oil Tower",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.OilTower,
  },
  [ItemTypes.Castle]: {
    name: "Castle",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Castle,
  },

  // buildings
  [ItemTypes.Lumberyard]: {
    name: "Lumberyard",
    maxStack: 64,
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
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Crate,
  },
  [ItemTypes.Mine]: {
    name: "Mine",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Mine,
  },
  [ItemTypes.StoneCarver]: {
    name: "Stone Carver",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.StoneCarver,
  },
  [ItemTypes.GatheringHut]: {
    name: "Gathering Hut",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.GatheringHut,
  },
  [ItemTypes.Blacksmith]: {
    name: "Blacksmith",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Blacksmith,
  },
  [ItemTypes.StoneFurnace]: {
    name: "Stone Furnace",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.StoneFurnace,
  },
  [ItemTypes.SteelFurnace]: {
    name: "Steel Furnace",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.SteelFurnace,
  },
  [ItemTypes.MetalRollingMill]: {
    name: "Metal Rolling Mill",
    description: "Rolls metal into thin sheets or wire.",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.MetalRollingMill,
  },
  [ItemTypes.Gunsmith]: {
    name: "Gunsmith",
    description: "Crafts guns",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Gunsmith,
  },
  [ItemTypes.MunitionsFactory]: {
    name: "Munitions Factory",
    description: "Manufactures advanced ammunition",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.MunitionsFactory,
  },
  [ItemTypes.Fletcher]: {
    name: "Fletcher",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Fletcher,
  },
  [ItemTypes.Inserter]: {
    name: "Wooden Inserter",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WoodenInserter,
  },
  [ItemTypes.WheatFarm]: {
    name: "Wheat Farm",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WheatFarm,
  },
  [ItemTypes.WoodShop]: {
    name: "Wood Shop",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.WoodShop,
  },
  [ItemTypes.Portal]: {
    name: "Portal",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Portal,
  },
  [ItemTypes.Town]: {
    name: "Town Center",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.Town,
  },
  [ItemTypes.SteamMiningDrill]: {
    name: "Steam Mining Drill",
    maxStack: 64,
    width: 0.5,
    builds: BuildingTypes.SteamMiningDrill,
  },

  [ItemTypes.Anvil]: {
    name: "Anvil",
    maxStack: 64,
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
    description: "A gear made of iron.",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.SteelGear]: {
    name: "Steel gear",
    description: "A gear made of steel.",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.Human]: {
    name: "Human",
    maxStack: 64,
    width: 0.5,
  },

  // electric
  [ItemTypes.CopperWire]: {
    name: "Copper Wire",
    description:
      "A coil of copper wire. Can only be created by a metal rolling mill.",
    maxStack: 64,
    width: 0.25,
  },
  [ItemTypes.MetalRoller]: {
    name: "Metal Roller",
    description: "Main component of a metal rolling mill.",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.ElectricMotor]: {
    name: "Electric Motor",
    description: "An electric motor. Produces rotational force.",
    maxStack: 64,
    width: 0.5,
  },
  [ItemTypes.LargeElectricMotor]: {
    name: "Large Electric Motor",
    description:
      "A large electric motor. Produces a large amount of rotational force.",
    maxStack: 64,
    width: 0.5,
  },

  // core
  [ItemTypes.Core]: {
    name: "Core",
    maxStack: 1,
    width: 0.25,
    category: "category-core",
  },
  [ItemTypes.ClottedCore]: {
    name: "Clotted Core",
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
  [ItemTypes.LightMachineGun]: {
    name: "Light Machine Gun",
    description: "Rapid fire, relatively lower damage. Crafted at a gunsmith.",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.MediumMachineGun]: {
    name: "Medium Machine Gun",
    description: "Fast fire rate, solid damage. Crafted at a gunsmith.",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.HeavyMachineGun]: {
    name: "Heavy Machine Gun",
    description:
      "Heavy damage, relatively slower fire rate. Crafted at a gunsmith.",
    maxStack: 64,
    width: 0.2,
  },
  [ItemTypes.LightMachineGunner]: {
    name: "Light Machine Gunner",
    description: "A guy with a light machine gun.",
    maxStack: 64,
    width: 0.2,
    builds: BuildingTypes.LightMachineGunner,
  },
  [ItemTypes.MediumMachineGunner]: {
    name: "Medium Machine Gunner",
    description: "A guy with a medium machine gun.",
    maxStack: 64,
    width: 0.2,
    builds: BuildingTypes.MediumMachineGunner,
  },
  [ItemTypes.HeavyMachineGunner]: {
    name: "Heavy Machine Gunner",
    description: "A guy with a heavy machine gun.",
    maxStack: 64,
    width: 0.2,
    builds: BuildingTypes.HeavyMachineGunner,
  },
  [ItemTypes.CannonBarrel]: {
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
