import { ItemType } from "../../src/item/item-type";
import { TileType } from "../../src/map/tile-type";
import {
  BuildingTypes,
  EnemyTypes,
  EntityType,
} from "../../src/model/entity-type";

type SpriteFrame = {
  frame: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
  spriteSourceSize: { x: number; y: number; w: number; h: number };
};

export type SpriteType = EntityType | ItemType | TileType;

type SpritesheetData = {
  frames: Record<SpriteType, SpriteFrame>;
  meta: {
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
  };
};

export const spritesheetData: SpritesheetData = {
  frames: {
    [TileType.Tree]: {
      frame: { x: 0, y: 0, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Grass]: {
      frame: { x: 1 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.BerryBush]: {
      frame: { x: 2 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Copper]: {
      frame: { x: 4 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Iron]: {
      frame: { x: 5 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Stone]: {
      frame: { x: 6 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Water]: {
      frame: { x: 89 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemType.Board]: {
      frame: { x: 0 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Stone]: {
      frame: { x: 1 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Axe]: {
      frame: { x: 2 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Log]: {
      frame: { x: 3 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronOre]: {
      frame: { x: 4 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronBar]: {
      frame: { x: 5 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperOre]: {
      frame: { x: 6 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperBar]: {
      frame: { x: 7 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Human]: {
      frame: { x: 8 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Berries]: {
      frame: { x: 9 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemType.Hoe]: {
      frame: { x: 0 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Pickaxe]: {
      frame: { x: 1 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Wheat]: {
      frame: { x: 2 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Stick]: {
      frame: { x: 3 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Saw]: {
      frame: { x: 4 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Chisel]: {
      frame: { x: 5 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Knife]: {
      frame: { x: 6 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Anvil]: {
      frame: { x: 7 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.StoneBlock]: {
      frame: { x: 8 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Beam]: {
      frame: { x: 9 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemType.IronArrow]: {
      frame: { x: 0 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperArrow]: {
      frame: { x: 1 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.StoneArrow]: {
      frame: { x: 2 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronArrowhead]: {
      frame: { x: 3 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperArrowhead]: {
      frame: { x: 4 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Arrowhead]: {
      frame: { x: 5 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemType.Slinger]: {
      frame: { x: 0 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Keep]: {
      frame: { x: 1 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Ballista]: {
      frame: { x: 2 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.OilTower]: {
      frame: { x: 3 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Castle]: {
      frame: { x: 4 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [BuildingTypes.Lumberyard]: {
      frame: { x: 0 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.WoodenConveyor]: {
      frame: { x: 1 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.WoodenInserter]: {
      frame: { x: 2 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Crate]: {
      frame: { x: 3 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Mine]: {
      frame: { x: 4 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.StoneCarver]: {
      frame: { x: 5 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.GatheringHut]: {
      frame: { x: 6 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Blacksmith]: {
      frame: { x: 7 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Furnace]: {
      frame: { x: 8 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Fletcher]: {
      frame: { x: 9 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [BuildingTypes.WheatFarm]: {
      frame: { x: 0 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.WoodShop]: {
      frame: { x: 1 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Portal]: {
      frame: { x: 2 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Town]: {
      frame: { x: 3 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [EnemyTypes.Goblin]: {
      frame: { x: 0 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    Minotaur: {
      frame: { x: 1 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    slime: {
      frame: { x: 2 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    lizard: {
      frame: { x: 3 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "doglike-thingy": {
      frame: { x: 4 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "phat-walkey-guy": {
      frame: { x: 5 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "armoured-walkey-guy": {
      frame: { x: 6 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    giant: {
      frame: { x: 7 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "basically-a-bloon": {
      frame: { x: 8 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    wisp: {
      frame: { x: 9 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    bat: {
      frame: { x: 9 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    jellyfish: {
      frame: { x: 9 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "flayed-demon": {
      frame: { x: 9 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    // cores
    [ItemType.Core]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.SpikedClub]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.RifleScope]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CrowsNest]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.LlamaHoof]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
  },
  meta: {
    image: "spritesheet.png",
    format: "RGBA8888",
    size: { w: 160, h: 320 },
    scale: "1",
  },
};
