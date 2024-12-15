import { expect, test, describe } from "bun:test";
import { Inventory } from "../src/component/inventory";
import { ComponentType } from "../src/component/component-type";
import { ItemType } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { itemProps } from "../src/item/item-props";

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
      const maxStack = itemProps[ItemType.IronBar].maxStack;

      inventory.add(new Item(ItemType.Log, 99));
      inventory.add(new Item(ItemType.Stone, 99));

      expect(inventory.canAddItem(new Item(ItemType.Log))).toBe(true);

      inventory.add(new Item(ItemType.IronBar, maxStack - 3));

      expect(inventory.canAddItem(new Item(ItemType.Log))).toBe(false);
      expect(inventory.canAddItem(new Item(ItemType.IronBar))).toBe(true);
      expect(inventory.canAddItem(new Item(ItemType.IronBar, maxStack))).toBe(
        false
      );

      inventory.add(new Item(ItemType.IronBar, 3));

      expect(inventory.canAddItem(new Item(ItemType.IronBar))).toBe(false);
    });
  });

  describe("add", () => {
    test("adds the item...", () => {
      const inventory = new Inventory(3, 2);

      inventory.add(new Item(ItemType.Log));
      inventory.add(new Item(ItemType.Stone));

      expect(inventory.get(0, 0)?.type).toBe(ItemType.Log);
      expect(inventory.get(0, 1)?.type).toBe(ItemType.Stone);
    });

    test("stacks items", () => {
      const inventory = new Inventory(3, 2);

      inventory.add(new Item(ItemType.IronBar, 99));

      expect(inventory.get(0, 0)?.type).toBe(ItemType.IronBar);
      expect(inventory.get(0, 1)?.type).toBeUndefined();

      inventory.add(new Item(ItemType.IronBar, 1));

      expect(inventory.get(0, 1)?.type).toBe(ItemType.IronBar);

      inventory.add(new Item(ItemType.IronBar, 99));

      expect(inventory.get(0, 1)?.quantity).toBe(
        itemProps[ItemType.IronBar].maxStack
      );
      expect(inventory.get(0, 2)?.quantity).toBe(1);
    });

    test("handles full inventory", () => {
      const inventory = new Inventory(1, 2);
      const maxStack = itemProps[ItemType.IronBar].maxStack;
      inventory.add(new Item(ItemType.IronBar, maxStack));
      inventory.add(new Item(ItemType.IronBar, maxStack - 1));

      const toAdd = new Item(ItemType.IronBar, 3);
      const added = inventory.add(toAdd);

      expect(added).toBe(false);
      expect(toAdd.quantity).toBe(2);

      const log = new Item(ItemType.Log, 1);
      expect(inventory.add(log)).toBe(false);
      expect(log.quantity).toBe(1);
    });
  });
});
