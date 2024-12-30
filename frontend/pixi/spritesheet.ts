import { ItemType, ItemTypes } from "../../src/item/item-type";
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

    [ItemTypes.Board]: {
      frame: { x: 0 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Stone]: {
      frame: { x: 1 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Axe]: {
      frame: { x: 2 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Log]: {
      frame: { x: 3 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.IronOre]: {
      frame: { x: 4 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.IronBar]: {
      frame: { x: 5 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CopperOre]: {
      frame: { x: 6 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CopperBar]: {
      frame: { x: 7 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Human]: {
      frame: { x: 8 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Berries]: {
      frame: { x: 9 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemTypes.Hoe]: {
      frame: { x: 0 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Pickaxe]: {
      frame: { x: 1 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Wheat]: {
      frame: { x: 2 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Stick]: {
      frame: { x: 3 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Saw]: {
      frame: { x: 4 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Chisel]: {
      frame: { x: 5 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Knife]: {
      frame: { x: 6 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Anvil]: {
      frame: { x: 7 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.StoneBlock]: {
      frame: { x: 8 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Beam]: {
      frame: { x: 9 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemTypes.IronArrow]: {
      frame: { x: 0 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CopperArrow]: {
      frame: { x: 1 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.StoneArrow]: {
      frame: { x: 2 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.IronArrowhead]: {
      frame: { x: 3 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CopperArrowhead]: {
      frame: { x: 4 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Arrowhead]: {
      frame: { x: 5 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemTypes.Slinger]: {
      frame: { x: 0 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Keep]: {
      frame: { x: 1 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Ballista]: {
      frame: { x: 2 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.OilTower]: {
      frame: { x: 3 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Castle]: {
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
    [ItemTypes.Core]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.SpikedClub]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.RifleScope]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CrowsNest]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.LlamaHoof]: {
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
