import { ItemType, ItemTypes } from "../../src/item/item-type";
import { TileRenderType } from "../../src/map/tile-type";
import {
  BuildingTypes,
  EnemyTypes,
  EntityType,
} from "../../src/model/entity-type";

type SpriteFrame = {
  frame: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
  spriteSourceSize: { x: number; y: number; w: number; h: number };
  anchor?: { x: number; y: number };
};

export enum UiSprites {
  GoldCoin = "gold-coin",
}

export type SpriteType = EntityType | ItemType | TileRenderType | UiSprites;

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
    [TileRenderType.Tree1]: {
      frame: { x: 0, y: 20 * 16, w: 8 * 16, h: 10 * 16 },
      sourceSize: { w: 8 * 16, h: 10 * 16 },
      spriteSourceSize: { x: 0, y: 0, w: 8 * 16, h: 10 * 16 },
      anchor: { x: 0.375, y: 0.8 },
    },
    [TileRenderType.Tree2]: {
      frame: { x: 8 * 16, y: 21 * 16, w: 6 * 16, h: 9 * 16 },
      sourceSize: { w: 6 * 16, h: 9 * 16 },
      spriteSourceSize: { x: 0, y: 0, w: 6 * 16, h: 9 * 16 },
      anchor: { x: 0.3333333333333, y: 0.7777777777 },
    },
    [TileRenderType.Grass1]: {
      frame: { x: 0 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass2]: {
      frame: { x: 1 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass3]: {
      frame: { x: 2 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass4]: {
      frame: { x: 3 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass5]: {
      frame: { x: 4 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass6]: {
      frame: { x: 5 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass7]: {
      frame: { x: 6 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass8]: {
      frame: { x: 7 * 32, y: 30 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass9]: {
      frame: { x: 0 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass10]: {
      frame: { x: 1 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass11]: {
      frame: { x: 2 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass12]: {
      frame: { x: 3 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass13]: {
      frame: { x: 4 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass14]: {
      frame: { x: 5 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass15]: {
      frame: { x: 6 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass16]: {
      frame: { x: 7 * 32, y: 31 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass17]: {
      frame: { x: 0 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass18]: {
      frame: { x: 1 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass19]: {
      frame: { x: 2 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass20]: {
      frame: { x: 3 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass21]: {
      frame: { x: 4 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass22]: {
      frame: { x: 5 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass23]: {
      frame: { x: 6 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass24]: {
      frame: { x: 7 * 32, y: 32 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass25]: {
      frame: { x: 0 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass26]: {
      frame: { x: 1 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass27]: {
      frame: { x: 2 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass28]: {
      frame: { x: 3 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass29]: {
      frame: { x: 4 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass30]: {
      frame: { x: 5 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass31]: {
      frame: { x: 6 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.Grass32]: {
      frame: { x: 7 * 32, y: 33 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.BerryBush]: {
      frame: { x: 2 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Copper]: {
      frame: { x: 4 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Lead]: {
      frame: { x: 0 * 16, y: 1 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Iron]: {
      frame: { x: 5 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Stone]: {
      frame: { x: 6 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Water]: {
      frame: { x: 7 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Coal]: {
      frame: { x: 8 * 16, y: 0 * 16, w: 16, h: 16 },
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
    [ItemTypes.Log]: {
      frame: { x: 3 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.PineLog]: {
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
    [ItemTypes.Galena]: {
      frame: { x: 7 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.LeadBar]: {
      frame: { x: 6 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Human]: {
      frame: { x: 8 * 16, y: 2 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.SteelPlate]: {
      frame: { x: 7 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CopperSheetRoll]: {
      frame: { x: 9 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemTypes.Food]: {
      frame: { x: 2 * 16, y: 3 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Stick]: {
      frame: { x: 3 * 16, y: 3 * 16, w: 16, h: 16 },
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
    [ItemTypes.LightMachineGunAmmo]: {
      frame: { x: 2 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MediumMachineGunAmmo]: {
      frame: { x: 2 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.HeavyMachineGunAmmo]: {
      frame: { x: 2 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [BuildingTypes.Slinger]: {
      frame: { x: 0 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Slinger]: {
      frame: { x: 0 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Keep]: {
      frame: { x: 1 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Keep]: {
      frame: { x: 1 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Ballista]: {
      frame: { x: 2 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Ballista]: {
      frame: { x: 2 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.OilTower]: {
      frame: { x: 3 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.OilTower]: {
      frame: { x: 3 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Castle]: {
      frame: { x: 4 * 16, y: 5 * 16, w: 16, h: 16 },
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
    [ItemTypes.Lumberyard]: {
      frame: { x: 0 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Conveyor]: {
      frame: { x: 1 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Conveyor]: {
      frame: { x: 1 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.WoodenInserter]: {
      frame: { x: 2 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Inserter]: {
      frame: { x: 2 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Crate]: {
      frame: { x: 3 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Crate]: {
      frame: { x: 3 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Mine]: {
      frame: { x: 4 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Mine]: {
      frame: { x: 4 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.StoneCarver]: {
      frame: { x: 5 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.StoneCarver]: {
      frame: { x: 5 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.GatheringHut]: {
      frame: { x: 6 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.GatheringHut]: {
      frame: { x: 6 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Blacksmith]: {
      frame: { x: 7 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Blacksmith]: {
      frame: { x: 7 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.StoneFurnace]: {
      frame: { x: 8 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.StoneFurnace]: {
      frame: { x: 8 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.SteelFurnace]: {
      frame: { x: 4 * 16, y: 17 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [ItemTypes.SteelFurnace]: {
      frame: { x: 4 * 16, y: 17 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Fletcher]: {
      frame: { x: 9 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Fletcher]: {
      frame: { x: 9 * 16, y: 6 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [BuildingTypes.WheatFarm]: {
      frame: { x: 0 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.WheatFarm]: {
      frame: { x: 0 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.WoodShop]: {
      frame: { x: 1 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.WoodShop]: {
      frame: { x: 1 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Portal]: {
      frame: { x: 2 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Portal]: {
      frame: { x: 2 * 16, y: 7 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.SteamMiningDrill]: {
      frame: { x: 4 * 16, y: 7 * 16, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 },
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
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

    [UiSprites.GoldCoin]: {
      frame: { x: 0 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    // cores
    [ItemTypes.Core]: {
      frame: { x: 0 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.ClottedCore]: {
      frame: { x: 1 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.HasteCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CriticalCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.HammerCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.DamageCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.EagleCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.ToxicCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.FrozenCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.EmberCore]: {
      frame: { x: 2 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.SpikedClub]: {
      frame: { x: 4 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.RifleScope]: {
      frame: { x: 4 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CrowsNest]: {
      frame: { x: 4 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.LlamaHoof]: {
      frame: { x: 4 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CannonBarrel]: {
      frame: { x: 6 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.BombardTower]: {
      frame: { x: 6 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.BombardTower]: {
      frame: { x: 8 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.CannonTower]: {
      frame: { x: 7 * 16, y: 15 * 16, w: 16, h: 32 },
      sourceSize: { w: 16, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 32 },
    },
    [ItemTypes.CannonTower]: {
      frame: { x: 8 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.ArcherTower]: {
      frame: { x: 9 * 16, y: 15 * 16, w: 16, h: 32 },
      sourceSize: { w: 16, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 32 },
    },
    [ItemTypes.ArcherTower]: {
      frame: { x: 9 * 16, y: 15 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Cannonball]: {
      frame: { x: 0 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.GrapeCannonShot]: {
      frame: { x: 1 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.CarcassCannonShot]: {
      frame: { x: 2 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.ExplosiveCannonShot]: {
      frame: { x: 3 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    "ballista-bolt": {
      frame: { x: 2 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.PalisadeWall]: {
      frame: { x: 5 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.PalisadeWall]: {
      frame: { x: 5 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Coal]: {
      frame: { x: 8 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.IronGear]: {
      frame: { x: 9 * 16, y: 4 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.SteelGear]: {
      frame: { x: 7 * 16, y: 5 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MetalRoller]: {
      frame: { x: 4 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MunitionsFactory]: {
      frame: { x: 4 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.MunitionsFactory]: {
      frame: { x: 8 * 16, y: 17 * 16, w: 48, h: 48 },
      sourceSize: { w: 48, h: 48 },
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
    },
    [ItemTypes.Gunsmith]: {
      frame: { x: 3 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Gunsmith]: {
      frame: { x: 7 * 16, y: 13 * 16, w: 48, h: 48 },
      sourceSize: { w: 48, h: 48 },
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
    },
    [ItemTypes.CopperWire]: {
      frame: { x: 5 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.ElectricMotor]: {
      frame: { x: 6 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.LargeElectricMotor]: {
      frame: { x: 6 * 16, y: 10 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.MetalRollingMill]: {
      frame: { x: 6 * 16, y: 17 * 16, w: 32, h: 48 },
      sourceSize: { w: 32, h: 48 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 48 },
    },

    [ItemTypes.LightMachineGun]: {
      frame: { x: 7 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MediumMachineGun]: {
      frame: { x: 8 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.HeavyMachineGun]: {
      frame: { x: 9 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.LightMachineGunner]: {
      frame: { x: 5 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MediumMachineGunner]: {
      frame: { x: 6 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.HeavyMachineGunner]: {
      frame: { x: 5 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.LightMachineGunner]: {
      frame: { x: 5 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.MediumMachineGunner]: {
      frame: { x: 6 * 16, y: 11 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.HeavyMachineGunner]: {
      frame: { x: 5 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Musket]: {
      frame: { x: 6 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.RifledMusket]: {
      frame: { x: 7 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.MusketBall]: {
      frame: { x: 0 * 16, y: 13 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Musketeer]: {
      frame: { x: 8 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.RifledMusketeer]: {
      frame: { x: 9 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Musketeer]: {
      frame: { x: 8 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.RifledMusketeer]: {
      frame: { x: 9 * 16, y: 12 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },

    [ItemTypes.Town]: {
      frame: { x: 0 * 16, y: 14 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [BuildingTypes.Town]: {
      frame: { x: 0 * 16, y: 14 * 16, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 },
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
    },
    [BuildingTypes.SteamMiningDrill]: {
      frame: { x: 4 * 16, y: 15 * 16, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    [TileRenderType.SulfurPool]: {
      frame: { x: 3 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [TileRenderType.Cave]: {
      frame: { x: 9 * 16, y: 0 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Niter]: {
      frame: { x: 3 * 16, y: 8 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Charcoal]: {
      frame: { x: 2 * 16, y: 8 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Gunpowder]: {
      frame: { x: 0 * 16, y: 8 * 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    [ItemTypes.Sulfur]: {
      frame: { x: 1 * 16, y: 8 * 16, w: 16, h: 16 },
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
