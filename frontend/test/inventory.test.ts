import { expect, test, describe } from "bun:test";
import { Inventory } from "../src/component/inventory";
import { ComponentType } from "../src/component/component-type";
import { Log } from "../src/item/log";
import { ItemType } from "../src/item/item-type";
import { Stone } from "../src/item/stone";
import { IronBar } from "../src/item/iron-bar";

describe("Inventory", () => {
  test("has right values", () => {
    const inventory = new Inventory(3, 2);

    expect(inventory.width).toEqual(3);
    expect(inventory.height).toEqual(2);
    expect(inventory.type).toEqual(ComponentType.Inventory);
  });

  describe("add", () => {
    test("adds the item...", () => {
        const inventory = new Inventory(3, 2);

        inventory.add(new Log());
        inventory.add(new Stone());

        expect(inventory.get(0, 0)?.type).toBe(ItemType.Log);
        expect(inventory.get(0, 1)?.type).toBe(ItemType.Stone);
      });

      test("stacks items", () => {
        const inventory = new Inventory(3, 2);

        inventory.add(new IronBar());
        inventory.add(new IronBar());
        inventory.add(new IronBar());
        inventory.add(new IronBar());

        expect(inventory.get(0, 0)?.type).toBe(ItemType.IronBar);
        expect(inventory.get(0, 1)?.type).toBeUndefined();

        inventory.add(new IronBar());

        expect(inventory.get(0, 1)?.type).toBe(ItemType.IronBar);

        inventory.add(new IronBar(4));

        expect(inventory.get(0, 1)?.quantity).toBe(4);
        expect(inventory.get(0, 2)?.quantity).toBe(1);
      });

      test("handles full inventory", () => {
        const inventory = new Inventory(1, 2);
        inventory.add(new IronBar(4));
        inventory.add(new IronBar(3));

        const toAdd = new IronBar(3);
        const added = inventory.add(toAdd);
        expect(added).toBe(false);
        expect(toAdd.quantity).toBe(2);
      });
  });
});