import { test, describe, expect } from "bun:test";
import { Game } from "../src/model/game";
import { Item } from "../src/item/item";
import { ItemType } from "../src/item/item-type";
import { recipes } from "../src/model/crafting-recipes";
import { craftItem } from "../src/op/craft-item";

describe("Crafting", () => {
  test("does nothing if lacking full recipe", () => {
    const game = new Game(5, 9);
    const needed = recipes[ItemType.Blacksmith]!.ingredients.get(
      ItemType.Stone
    )!;
    game.inventory.add(new Item(ItemType.Stone, needed - 1));
    game.inventory.add(new Item(ItemType.Log, 99));
    game.inventory.add(new Item(ItemType.Anvil, 1));

    craftItem(game, ItemType.Blacksmith);
    expect(game.inventory.count(ItemType.Blacksmith)).toBe(0);
    expect(game.inventory.count(ItemType.Stone)).toBe(needed - 1);

    game.inventory.add(new Item(ItemType.Stone, 2));
    craftItem(game, ItemType.Blacksmith);
    expect(game.inventory.count(ItemType.Stone)).toBe(1);
    expect(game.inventory.count(ItemType.Blacksmith)).toBe(1);
    expect(game.inventory.count(ItemType.Anvil)).toBe(0);
  });
});
