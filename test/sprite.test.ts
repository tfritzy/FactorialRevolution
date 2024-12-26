import { expect, test, describe } from "bun:test";
import { BuildingTypes, EntityTypes } from "../src/model/entity-type";
import { spritesheetData } from "../frontend/pixi/spritesheet";
import { ItemType } from "../src/item/item-type";

describe("Sprite", () => {
  test("all entities have a sprite", () => {
    const keys = new Set(Object.keys(spritesheetData.frames));
    for (const entity of Object.values(EntityTypes)) {
      try {
        expect(keys.has(entity)).toBeTrue();
      } catch (error) {
        console.log("Missing sprite for", entity);
        throw error;
      }
    }
  });

  test("all buildings have a sprite", () => {
    const keys = new Set(Object.keys(spritesheetData.frames));
    for (const building of Object.values(BuildingTypes)) {
      try {
        expect(keys.has(building)).toBeTrue();
      } catch (error) {
        console.log("Missing sprite for", building);
        throw error;
      }
    }
  });

  test("all items have a sprite", () => {
    const keys = new Set(Object.keys(spritesheetData.frames));
    for (const item of Object.values(ItemType)) {
      try {
        expect(keys.has(item)).toBeTrue();
      } catch (error) {
        console.log("Missing sprite for", item);
        throw error;
      }
    }
  });
});
