import { expect, test, describe } from "bun:test";
import { Inventory } from "../src/component/inventory";
import { ComponentType } from "../src/component/component-type";
import { ItemTypes } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { itemProps } from "../src/item/item-props";
import { recipes } from "../src/model/crafting-recipes";

describe("Inventory", () => {
  test("has right values", () => {
    const inventory = new Inventory(3, 2);

    expect(inventory.width).toEqual(3);
    expect(inventory.height).toEqual(2);
    expect(inventory.type).toEqual(ComponentType.Inventory);
  });

  describe("canAddItem", () => {
    test("works", () => {
      const inventory = new Inventory(3, 1);
      const maxStack = itemProps[ItemTypes.IronBar].maxStack;

      inventory.add(new Item(ItemTypes.Log, 99));
      inventory.add(new Item(ItemTypes.Stone, 99));

      expect(inventory.canAddItem(new Item(ItemTypes.Log))).toBe(true);

      inventory.add(new Item(ItemTypes.IronBar, maxStack - 3));

      expect(inventory.canAddItem(new Item(ItemTypes.Log))).toBe(false);
      expect(inventory.canAddItem(new Item(ItemTypes.IronBar))).toBe(true);
      expect(inventory.canAddItem(new Item(ItemTypes.IronBar, maxStack))).toBe(
        false
      );

      inventory.add(new Item(ItemTypes.IronBar, 3));

      expect(inventory.canAddItem(new Item(ItemTypes.IronBar))).toBe(false);
    });
  });

  describe("add", () => {
    test("adds the item...", () => {
      const inventory = new Inventory(3, 2);

      inventory.add(new Item(ItemTypes.Log));
      inventory.add(new Item(ItemTypes.Stone));

      expect(inventory.get(0, 0)?.type).toBe(ItemTypes.Log);
      expect(inventory.get(0, 1)?.type).toBe(ItemTypes.Stone);
    });

    test("stacks items", () => {
      const inventory = new Inventory(3, 2);

      inventory.add(new Item(ItemTypes.IronBar, 99));

      expect(inventory.get(0, 0)?.type).toBe(ItemTypes.IronBar);
      expect(inventory.get(0, 1)?.type).toBeUndefined();

      inventory.add(new Item(ItemTypes.IronBar, 1));

      expect(inventory.get(0, 1)?.type).toBe(ItemTypes.IronBar);

      inventory.add(new Item(ItemTypes.IronBar, 99));

      expect(inventory.get(0, 1)?.quantity).toBe(
        itemProps[ItemTypes.IronBar].maxStack
      );
      expect(inventory.get(0, 2)?.quantity).toBe(1);
    });

    test("handles full inventory", () => {
      const inventory = new Inventory(1, 2);
      const maxStack = itemProps[ItemTypes.IronBar].maxStack;
      inventory.add(new Item(ItemTypes.IronBar, maxStack));
      inventory.add(new Item(ItemTypes.IronBar, maxStack - 1));

      const toAdd = new Item(ItemTypes.IronBar, 3);
      const added = inventory.add(toAdd);

      expect(added).toBe(false);
      expect(toAdd.quantity).toBe(2);

      const log = new Item(ItemTypes.Log, 1);
      expect(inventory.add(log)).toBe(false);
      expect(log.quantity).toBe(1);
    });

    test("item restrictions", () => {
      const inventory = new Inventory(4, 1);
      inventory.setRestrictionsForRecipe(recipes[ItemTypes.CopperArrow]);

      expect(inventory.addAt(new Item(ItemTypes.Anvil), 0, 0)).toBeFalse();
      expect(inventory.addAt(new Item(ItemTypes.Anvil), 0, 1)).toBeFalse();
      expect(inventory.addAt(new Item(ItemTypes.Anvil), 0, 2)).toBeTrue();
      expect(inventory.addAt(new Item(ItemTypes.Anvil), 0, 3)).toBeTrue();

      expect(inventory.removeAt(0, 0));
      expect(inventory.removeAt(0, 1));

      expect(inventory.canAddItem(new Item(ItemTypes.Anvil))).toBeTrue();
      expect(inventory.add(new Item(ItemTypes.Anvil))).toBeTrue();

      expect(inventory.canAddItem(new Item(ItemTypes.Lumberyard))).toBeFalse();
      expect(inventory.add(new Item(ItemTypes.Lumberyard))).toBeFalse();

      expect(inventory.canAddItem(new Item(ItemTypes.Log))).toBeTrue();
      expect(inventory.add(new Item(ItemTypes.Log))).toBeTrue();
      expect(
        inventory.canAddItem(new Item(ItemTypes.CopperArrowhead))
      ).toBeTrue();
      expect(inventory.add(new Item(ItemTypes.CopperArrowhead))).toBeTrue();
    });

    test("general restriction", () => {
      const inventory = new Inventory(4, 1);

      inventory.generalFilter = (item: Item) => {
        return item.category === "category-relic";
      };

      expect(inventory.canAddItem(new Item(ItemTypes.Anvil))).toBeFalse();
      expect(inventory.canAddItem(new Item(ItemTypes.Core))).toBeFalse();
      expect(inventory.canAddItem(new Item(ItemTypes.IronArrow))).toBeFalse();
      expect(inventory.canAddItem(new Item(ItemTypes.RifleScope))).toBeTrue();
      expect(inventory.canAddItem(new Item(ItemTypes.LlamaHoof))).toBeTrue();

      expect(inventory.add(new Item(ItemTypes.Anvil))).toBeFalse();
      expect(inventory.add(new Item(ItemTypes.Core))).toBeFalse();
      expect(inventory.add(new Item(ItemTypes.IronArrow))).toBeFalse();
      expect(inventory.add(new Item(ItemTypes.RifleScope))).toBeTrue();
      expect(inventory.add(new Item(ItemTypes.LlamaHoof))).toBeTrue();

      expect(inventory.removeOneByCategory("category-relic")?.type).toBe(
        ItemTypes.RifleScope
      );
      expect(inventory.removeOneByCategory("category-relic")?.type).toBe(
        ItemTypes.LlamaHoof
      );
    });
  });
});
