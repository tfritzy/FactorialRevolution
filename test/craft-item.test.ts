import { test, describe, expect } from "bun:test";
import { Game } from "../src/model/game";
import { Item } from "../src/item/item";
import { ItemType, ItemTypes } from "../src/item/item-type";
import { recipes } from "../src/model/crafting-recipes";
import { craftItem } from "../src/op/craft-item";

describe("Crafting", () => {
  test("does nothing if lacking full recipe", () => {
    const game = new Game(5, 9);
    const needed = recipes[ItemTypes.Blacksmith]!.ingredients[0].get(
      ItemTypes.Stone
    )!;
    game.inventory.add(new Item(ItemTypes.Stone, needed - 1));
    game.inventory.add(new Item(ItemTypes.Log, 99));
    game.inventory.add(new Item(ItemTypes.Anvil, 1));
    game.inventory.add(new Item(ItemTypes.Human, 1));

    craftItem(game, ItemTypes.Blacksmith);
    expect(game.inventory.count(ItemTypes.Blacksmith)).toBe(0);
    expect(game.inventory.count(ItemTypes.Stone)).toBe(needed - 1);

    game.inventory.add(new Item(ItemTypes.Stone, 2));
    craftItem(game, ItemTypes.Blacksmith);
    expect(game.inventory.count(ItemTypes.Blacksmith)).toBe(1);
    expect(game.inventory.count(ItemTypes.Stone)).toBe(1);
    expect(game.inventory.count(ItemTypes.Anvil)).toBe(0);
  });
});
