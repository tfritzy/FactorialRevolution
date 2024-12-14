import { test, describe, expect } from "bun:test";
import { Game } from "../src/model/game";
import { Item } from "../src/item/item";
import { ItemType } from "../src/item/item-type";
import { recipes } from "../src/model/crafting-recipes";
import { craftItem } from "../src/op/craft-item";

describe("Crafting", () => {
  test("does nothing if lacking full recipe", () => {
    const game = new Game(5, 9);
    const needed = recipes[ItemType.Cloth]!.ingredients.get(
      ItemType.PlantMatter
    )!;
    game.inventory.add(new Item(ItemType.PlantMatter, needed - 1));

    craftItem(game, ItemType.Cloth);
    expect(game.inventory.count(ItemType.Cloth)).toBe(0);
    expect(game.inventory.count(ItemType.PlantMatter)).toBe(needed - 1);

    game.inventory.add(new Item(ItemType.PlantMatter, 2));
    craftItem(game, ItemType.Cloth);
    expect(game.inventory.count(ItemType.Cloth)).toBe(1);
    expect(game.inventory.count(ItemType.PlantMatter)).toBe(1);
  });

  test("crafts multi-ingredient item", () => {
    const game = new Game(5, 9);
    game.inventory.add(new Item(ItemType.Log, 4));
    game.inventory.add(new Item(ItemType.Rope, 2));
    game.inventory.add(new Item(ItemType.Cloth, 1));

    craftItem(game, ItemType.Slinger);
    expect(game.inventory.count(ItemType.Slinger)).toBe(1);
    expect(game.inventory.count(ItemType.Log)).toBe(0);
    expect(game.inventory.count(ItemType.Rope)).toBe(0);
    expect(game.inventory.count(ItemType.Cloth)).toBe(0);
  });
});
