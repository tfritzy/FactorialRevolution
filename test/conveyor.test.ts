import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Item } from "../src/item/item";
import { ItemType } from "../src/item/item-type";
import { Crate } from "../src/model/crate";
import { getBuilding } from "../src/op/get-building";
import { WoodenConveyor } from "../src/model/buildings";
import { Side } from "../src/model/side";

describe("Conveyor", () => {
  test("items in front block", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.East);

    const bar = new Item(ItemType.IronBar);
    conveyor.conveyor()?.add(bar);
    expect(conveyor.conveyor()?.items[0].item).toBe(bar);
    expect(conveyor.conveyor()?.items[0].progress).toBe(0);
    expect(conveyor.conveyor()?.canAccept(new Item(ItemType.Log))).toBe(false);
    conveyor.tick(1);
    expect(conveyor.conveyor()?.items[0].progress).toBe(1 - bar.width);
    const log = new Item(ItemType.Log);
    expect(conveyor.conveyor()?.canAccept(log)).toBe(true);
    conveyor.conveyor()?.add(log);
    expect(conveyor.conveyor()?.items[0].progress).toBe(0);
    conveyor.tick(1);
    expect(conveyor.conveyor()?.items[0].progress).toBe(
      1 - bar.width - log.width
    );
  });

  test("transfers items to next conveyor", () => {
    const game = new Game(3, 1);
    const conveyor1 = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor1, Side.East);
    const conveyor2 = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, conveyor2, Side.East);

    const c1Bar = new Item(ItemType.IronBar);
    conveyor1.conveyor()?.add(c1Bar);
    const c2Bar = new Item(ItemType.IronBar);
    conveyor2.conveyor()?.add(c2Bar);

    conveyor1.tick(1);
    expect(conveyor1.conveyor()!.items[0].progress).toBe(1 - c1Bar.width);
    conveyor2.tick(0.05);
    conveyor1.tick(1);
    expect(conveyor1.conveyor()!.items[0].progress).toBe(
      1 - c1Bar.width + 0.05
    );
    conveyor2.tick(1);
    conveyor1.tick(1);
    expect(conveyor1.conveyor()?.items.length).toBe(0);
    expect(conveyor2.conveyor()?.items.length).toBe(2);
  });

  test("transfers items into inventories", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.East);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemType.IronBar);
    conveyor.conveyor()?.add(bar);

    conveyor.tick(0);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(0);
    conveyor.tick(0.99);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(0);
    conveyor.tick(0.011);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(1);
  });

  test("takes items from inventories if facing right direction", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.West);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemType.IronBar, 3);
    crate.inventory()?.add(bar);

    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(2);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(2);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
    conveyor.tick(1);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(1);
    expect(conveyor.conveyor()?.items.length).toBe(2);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
  });

  test("doesn't take from inventories if not facing right direction", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.North);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemType.IronBar, 3);
    crate.inventory()?.add(bar);

    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemType.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
  });

  test("links with prev conveyors", () => {
    const game = new Game(2, 2);
    buildBuilding(game, new WoodenConveyor(new V2(0, 0)), Side.East);
    buildBuilding(game, new WoodenConveyor(new V2(1, 0)), Side.South);
    buildBuilding(game, new WoodenConveyor(new V2(1, 1)), Side.West);
    buildBuilding(game, new WoodenConveyor(new V2(0, 1)), Side.North);

    expect(getBuilding(game, 0, 0)?.conveyor()!.prevDir).toEqual(Side.East);
    expect(getBuilding(game, 0, 1)?.conveyor()!.prevDir).toEqual(Side.East);
    expect(getBuilding(game, 1, 1)?.conveyor()!.prevDir).toEqual(Side.South);
    expect(getBuilding(game, 1, 0)?.conveyor()!.prevDir).toEqual(Side.West);

    expect(getBuilding(game, 0, 0)?.conveyor()!.isCurved).toBeFalse();
    expect(getBuilding(game, 0, 1)?.conveyor()!.isCurved).toBeTrue();
    expect(getBuilding(game, 1, 1)?.conveyor()!.isCurved).toBeTrue();
    expect(getBuilding(game, 1, 0)?.conveyor()!.isCurved).toBeTrue();

    expect(getBuilding(game, 0, 0)?.conveyor()!.length).toBe(1);
    expect(getBuilding(game, 0, 1)?.conveyor()!.length).toBe(
      (2 * Math.PI * 0.5) / 4
    );
    expect(getBuilding(game, 1, 1)?.conveyor()!.length).toBe(
      (2 * Math.PI * 0.5) / 4
    );
    expect(getBuilding(game, 1, 0)?.conveyor()!.length).toBe(
      (2 * Math.PI * 0.5) / 4
    );
  });

  test("has correct render case", () => {
    const game = new Game(2, 2);
    buildBuilding(game, new WoodenConveyor(new V2(0, 0)), Side.East);
    buildBuilding(game, new WoodenConveyor(new V2(1, 0)), Side.South);
    buildBuilding(game, new WoodenConveyor(new V2(1, 1)), Side.West);
    buildBuilding(game, new WoodenConveyor(new V2(0, 1)), Side.North);

    expect(getBuilding(game, 0, 0)?.conveyor()!.renderCase).toEqual("straight");
    expect(getBuilding(game, 0, 1)?.conveyor()!.renderCase).toEqual("curved");
    expect(getBuilding(game, 1, 1)?.conveyor()!.renderCase).toEqual("curved");
    expect(getBuilding(game, 1, 0)?.conveyor()!.renderCase).toEqual("curved");

    buildBuilding(game, new WoodenConveyor(new V2(0, 0)), Side.South);
    buildBuilding(game, new WoodenConveyor(new V2(0, 1)), Side.East);
    buildBuilding(game, new WoodenConveyor(new V2(1, 1)), Side.North);
    buildBuilding(game, new WoodenConveyor(new V2(1, 0)), Side.West);

    expect(getBuilding(game, 0, 0)?.conveyor()!.renderCase).toEqual("straight");
    expect(getBuilding(game, 1, 0)?.conveyor()!.renderCase).toEqual(
      "curved-reverse"
    );
    expect(getBuilding(game, 1, 1)?.conveyor()!.renderCase).toEqual(
      "curved-reverse"
    );
    expect(getBuilding(game, 0, 1)?.conveyor()!.renderCase).toEqual(
      "curved-reverse"
    );
  });

  test("creates world items when extracting from inventory", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.West);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemType.IronBar);
    crate.inventory()?.add(bar);

    conveyor.tick(0);
    expect(game.items.has(bar.id)).toBeTrue();
    expect(game.items.get(bar.id)?.pos).toEqual(conveyor.pos);
  });

  test("positions items correctly on straight conveyor", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, conveyor, Side.East);

    const bar = new Item(ItemType.IronBar);
    conveyor.conveyor()?.add(bar);
    conveyor.tick(0.5);

    const worldItem = game.items.get(bar.id);
    expect(worldItem?.pos.x).toBeCloseTo(1.5);
    expect(worldItem?.pos.y).toBeCloseTo(0);
  });

  test("positions items correctly on curved conveyor", () => {
    const game = new Game(2, 2);
    buildBuilding(game, new WoodenConveyor(new V2(0, 0)), Side.East);
    const corner = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, corner, Side.South);

    const bar = new Item(ItemType.IronBar);
    corner.conveyor()?.add(bar);
    corner.tick(0.5);

    const worldItem = game.items.get(bar.id);
    const expectedX = 1;
    const expectedY = 0.7853981633974483;

    expect(worldItem?.pos.x).toBeCloseTo(expectedX, 2);
    expect(worldItem?.pos.y).toBeCloseTo(expectedY, 2);
  });
});
