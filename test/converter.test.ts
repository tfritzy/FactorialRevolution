import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Conveyor, Fletcher } from "../src/model/buildings";
import { ItemTypes } from "../src/item/item-type";
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
    buildBuilding(game, new Conveyor(new V2(2, 1)), Side.East);
    const bs = getBuilding(game, 1, 1)!;

    bs.converter()!.selectRecipe(ItemTypes.CopperArrow);
    bs.inputs()!.add(new Item(ItemTypes.Log));
    bs.inputs()!.add(new Item(ItemTypes.CopperArrowhead));

    const expectedCraftingTime = recipes[ItemTypes.CopperArrow]!.duration;

    expect(bs.inputs()?.count(ItemTypes.Log)).toBe(1);
    expect(bs.inputs()?.count(ItemTypes.CopperArrowhead)).toBe(1);
    bs.tick(expectedCraftingTime - 0.1);
    expect(bs.inventory()!.count(ItemTypes.CopperArrow)).toBe(0);
    bs.tick(0.2);
    expect(bs.inventory()!.count(ItemTypes.CopperArrow)).toBe(1);
    expect(bs.inputs()?.count(ItemTypes.Log)).toBe(0);
    expect(bs.inputs()?.count(ItemTypes.CopperArrowhead)).toBe(0);
  });

  test("sets restrictions on inputs inventory", () => {
    const game = new Game(5, 5);
    buildBuilding(game, new Fletcher(new V2(1, 1)));
    const fletcher = getBuilding(game, 1, 1)!;
    fletcher.components.set(ComponentType.InputsInventory, new Inventory(1, 2));

    fletcher.converter()!.selectRecipe(ItemTypes.CopperArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemTypes.Log);
    expect(fletcher.inputs()!.itemRestrictions[1][0]).toBe(
      ItemTypes.CopperArrowhead
    );

    fletcher.converter()!.selectRecipe(ItemTypes.StoneArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemTypes.Log);
    expect(fletcher.inputs()!.itemRestrictions[1][0]).toBe(ItemTypes.Arrowhead);

    fletcher.components.set(ComponentType.InputsInventory, new Inventory(1, 1));
    fletcher.converter()!.selectRecipe(ItemTypes.StoneArrow);
    expect(fletcher.inputs()!.itemRestrictions[0][0]).toBe(ItemTypes.Log);
  });
});
