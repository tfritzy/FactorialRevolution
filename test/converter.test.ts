import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Blacksmith, WoodenConveyor } from "../src/model/buildings";
import { ItemType } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { getBuilding } from "../src/op/get-building";
import { Side } from "../src/model/side";
import { recipes } from "../src/model/crafting-recipes";

describe("Converter", () => {
  test("works", () => {
    const game = new Game(5, 9);
    buildBuilding(game, new Blacksmith(new V2(1, 1)));
    buildBuilding(game, new WoodenConveyor(new V2(2, 1)), Side.East);
    const bs = getBuilding(game, 1, 1)!;

    bs.converter()!.selectRecipe(ItemType.CopperArrow);
    bs.inputs()!.add(new Item(ItemType.Stick));
    bs.inputs()!.add(new Item(ItemType.CopperBar));

    const expectedCraftingTime = recipes[ItemType.CopperArrow]!.duration;

    expect(bs.inputs()?.count(ItemType.Stick)).toBe(1);
    expect(bs.inputs()?.count(ItemType.CopperBar)).toBe(1);
    bs.tick(expectedCraftingTime - 0.1);
    expect(bs.inventory()!.count(ItemType.CopperArrow)).toBe(0);
    bs.tick(0.2);
    expect(bs.inventory()!.count(ItemType.CopperArrow)).toBe(1);
    expect(bs.inputs()?.count(ItemType.Stick)).toBe(0);
    expect(bs.inputs()?.count(ItemType.CopperBar)).toBe(0);
  });
});
