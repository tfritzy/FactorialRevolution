import { ItemType } from "../../src/item/item-type";
import { TileType } from "../../src/map/tile-type";
import { EntityType } from "../../src/model/entity-type";

type SpriteFrame = {
  frame: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
  spriteSourceSize: { x: number; y: number; w: number; h: number };
};

type SpritesheetData = {
  frames: Record<EntityType | ItemType | TileType, SpriteFrame>;
  meta: {
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
  };
};

export const spritesheetData: SpritesheetData = {
  frames: {
    tree: {
      frame: { x: 0, y: 0, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    grass: {
      frame: { x: 91 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    water: {
      frame: { x: 8 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    stone: {
      frame: { x: 9 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    copper: {
      frame: { x: 4 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    iron: {
      frame: { x: 14 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    lumberyard: {
      frame: { x: 10 * 16, y: 13 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "wooden-conveyor": {
      frame: { x: 0 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    log: {
      frame: { x: 30 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    portal: {
      frame: { x: 1 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "gathering-hut": {
      frame: { x: 12 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    blacksmith: {
      frame: { x: 15 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    furnace: {
      frame: { x: 14 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    fletcher: {
      frame: { x: 13 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    crate: {
      frame: { x: 11 * 16, y: 13 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "stone-miner": {
      frame: { x: 16 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "wooden-inserter": {
      frame: { x: 1 * 16, y: 9 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "wheat-farm": {
      frame: { x: 17 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "wood-shop": {
      frame: { x: 18 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    town: {
      frame: { x: 1 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    goblin: {
      frame: { x: 0 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    Minotaur: {
      frame: { x: 1 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    slime: {
      frame: { x: 2 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    lizard: {
      frame: { x: 3 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "doglike-thingy": {
      frame: { x: 4 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "phat-walkey-guy": {
      frame: { x: 5 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "armoured-walkey-guy": {
      frame: { x: 6 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    giant: {
      frame: { x: 7 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "basically-a-bloon": {
      frame: { x: 8 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    wisp: {
      frame: { x: 9 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    bat: {
      frame: { x: 10 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    jellyfish: {
      frame: { x: 11 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "flayed-demon": {
      frame: { x: 12 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Board]: {
      frame: { x: 0 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Beam]: {
      frame: { x: 1 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.StoneBlock]: {
      frame: { x: 2 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Crucible]: {
      frame: { x: 3 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Wheat]: {
      frame: { x: 4 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Berries]: {
      frame: { x: 5 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronBar]: {
      frame: { x: 6 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronOre]: {
      frame: { x: 7 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperOre]: {
      frame: { x: 24 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperBar]: {
      frame: { x: 9 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Anvil]: {
      frame: { x: 10 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Hoe]: {
      frame: { x: 11 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Knife]: {
      frame: { x: 12 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Saw]: {
      frame: { x: 13 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Axe]: {
      frame: { x: 10 * 16, y: 13 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Pickaxe]: {
      frame: { x: 15 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.ToolShaft]: {
      frame: { x: 16 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.StoneArrow]: {
      frame: { x: 17 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Human]: {
      frame: { x: 30 * 16, y: 30 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronArrow]: {
      frame: { x: 18 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperArrow]: {
      frame: { x: 19 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Arrowhead]: {
      frame: { x: 20 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.IronArrowhead]: {
      frame: { x: 21 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.CopperArrowhead]: {
      frame: { x: 22 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.ArrowShaft]: {
      frame: { x: 23 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Slinger]: {
      frame: { x: 24 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Keep]: {
      frame: { x: 25 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Ballista]: {
      frame: { x: 26 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.OilTower]: {
      frame: { x: 27 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Castle]: {
      frame: { x: 28 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemType.Mine]: {
      frame: { x: 29 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.Cliff]: {
      frame: { x: 0 * 16, y: 14 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileType.BerryBush]: {
      frame: { x: 1 * 16, y: 14 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
  },
  meta: {
    image: "sheet.png",
    format: "RGBA8888",
    size: { w: 1488, h: 320 },
    scale: "1",
  },
};
