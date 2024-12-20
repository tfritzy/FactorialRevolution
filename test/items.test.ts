import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding, buildHeldBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Lumberyard } from "../src/model/buildings";
import { pickupItem } from "../src/op/item-management";
import { ItemType } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { getBuilding } from "../src/op/get-building";
import { makeAllGrass } from "./test-helpers";
import { EntityType } from "../src/model/EntityType";
import { TileType } from "../src/map/tile-type";
import { Side } from "../src/model/side";
import { recipes } from "../src/model/crafting-recipes";
import { itemProps } from "../src/item/item-props";

describe("Items", () => {
  test("all recipe output matches key", () => {
    Object.entries(recipes).forEach(([itemType, recipe]) => {
      expect(recipe.output).toBe(itemType as ItemType);
    });
  });

  test("item props not invalid", () => {
    Object.entries(itemProps).forEach(([itemType, props]) => {
      console.log("checking", itemType);
      expect(props.maxStack).toBeGreaterThan(0);
      expect(props.width).toBeGreaterThan(0);
    });
  });
});
