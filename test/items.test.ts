import { expect, test, describe } from "bun:test";
import { ItemType } from "../src/item/item-type";
import { recipes } from "../src/model/crafting-recipes";
import { itemProps } from "../src/item/item-props";
import { BuildingTypes } from "../src/model/entity-type";

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

  test("all buildings have an item that makes them", () => {
    const buildingTypes = Object.values(BuildingTypes);

    buildingTypes.forEach((bType) => {
      console.log("Checking", bType);
      expect(Object.values(itemProps).find((p) => p.builds === bType));
    });
  });
});
