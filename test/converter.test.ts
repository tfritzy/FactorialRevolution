import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Fletcher, WoodenConveyor } from "../src/model/buildings";
import { ItemType } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { getBuilding } from "../src/op/get-building";
import { Side } from "../src/model/side";
import { recipes } from "../src/model/crafting-recipes";
import { ComponentType } from "../src/component/component-type";
import { Inventory } from "../src/component/inventory";

describe("Converter", () => {
  test("works", () => {
    const game = new Game(5, 9);
    buildBuilding(game, new Fletcher(new V2(1, 1)));
    buildBuilding(game, new WoodenConveyor(new V2(2, 1)), Side.East);
    const bs = getBuilding(game, 1, 1)!;

    bs.converter()!.selectRecipe(ItemType.CopperArrow);
    bs.inputs()!.add(new Item(ItemType.ArrowShaft));
    bs.inputs()!.add(new Item(ItemType.CopperArrowhead));

    const expectedCraftingTime = recipes[ItemType.CopperArrow]!.duration;

    expect(bs.inputs()?.count(ItemType.ArrowShaft)).toBe(1);
    expect(bs.inputs()?.count(ItemType.CopperArrowhead)).toBe(1);
    bs.tick(expectedCraftingTime - 0.1);
    expect(bs.inventory()!.count(ItemType.CopperArrow)).toBe(0);
    bs.tick(0.2);
    expect(bs.inventory()!.count(ItemType.CopperArrow)).toBe(1);
    expect(bs.inputs()?.count(ItemType.ArrowShaft)).toBe(0);
    expect(bs.inputs()?.count(ItemType.CopperArrowhead)).toBe(0);
  });

  test("sets restrictions on inputs inventory", () => {
    const game = new Game(5, 5);
    buildBuilding(game, new Fletcher(new V2(1, 1)));
    const fletcher = getBuilding(game, 1, 1)!;
    fletcher.components.set(ComponentType.InputsInventory, new Inventory(1, 2));

    fletcher.converter()!.selectRecipe(ItemType.CopperArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemType.ArrowShaft);
    expect(fletcher.inputs()!.itemRestrictions[1][0]).toBe(
      ItemType.CopperArrowhead
    );

    fletcher.converter()!.selectRecipe(ItemType.StoneArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemType.ArrowShaft);
    expect(fletcher.inputs()!.itemRestrictions[1][0]).toBe(ItemType.Arrowhead);

    fletcher.components.set(ComponentType.InputsInventory, new Inventory(1, 1));
    fletcher.converter()!.selectRecipe(ItemType.StoneArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemType.ArrowShaft);
  });
});
