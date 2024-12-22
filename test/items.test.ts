import { expect, test, describe } from "bun:test";
import { ItemType } from "../src/item/item-type";
import { recipes } from "../src/model/crafting-recipes";
import { itemProps } from "../src/item/item-props";
import { BuildingTypes } from "../src/model/entity-type";

describe("Items", () => {
  test("all recipe output matches key", () => {
    Object.entries(recipes).forEach(([itemType, recipe]) => {
      try {
        expect(recipe.output).toBe(itemType as ItemType);
      } catch (error) {
        console.error(`\recipe output doesn't match type: ${itemType}`);
        console.error(`Recipe details: ${JSON.stringify(recipe, null, 2)}`);
        throw error;
      }
    });
  });

  test("all recipes have valid durations", () => {
    Object.entries(recipes).forEach(([itemType, recipe]) => {
      try {
        if (recipe.ingredients.size > 0) {
          expect(recipe.duration).toBeGreaterThan(0);
        }
      } catch (error) {
        console.error(`\nFailed duration check for recipe: ${itemType}`);
        console.error(`Recipe details: ${JSON.stringify(recipe, null, 2)}`);
        throw error;
      }
    });
  });

  test("item props not invalid", () => {
    Object.entries(itemProps).forEach(([itemType, props]) => {
      try {
        expect(props.maxStack).toBeGreaterThan(0);
        expect(props.width).toBeGreaterThan(0);
      } catch (error) {
        console.error(`\nFailed duration check for item: ${itemType}`);
        console.error(`Prop details: ${JSON.stringify(props, null, 2)}`);
        throw error;
      }
    });
  });

  test("all buildings have an item that makes them", () => {
    const buildingTypes = Object.values(BuildingTypes);

    buildingTypes.forEach((bType) => {
      try {
        expect(
          Object.values(itemProps).find((p) => p.builds === bType)
        ).toBeDefined();
      } catch (error) {
        console.error(`\nFailed duration check for building: ${bType}`);
        throw error;
      }
    });
  });
});
