import { expect, test, describe } from "bun:test";
import { buildBuilding, buildHeldBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Item } from "../src/item/item";
import { ItemTypes } from "../src/item/item-type";
import { getBuilding } from "../src/op/get-building";
import { Crate, WoodenConveyor } from "../src/model/buildings";
import { Side } from "../src/model/side";
import { makeGame } from "./test-helpers";

describe("Conveyor", () => {
  test("items in front block", () => {
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.East);

    const bar = new Item(ItemTypes.IronBar);
    conveyor.conveyor()?.add(bar);
    expect(conveyor.conveyor()?.items[0].item).toBe(bar);
    expect(conveyor.conveyor()?.items[0].progress).toBe(0);
    expect(conveyor.conveyor()?.canAccept(new Item(ItemTypes.Log))).toBe(false);
    conveyor.tick(1);
    expect(conveyor.conveyor()?.items[0].progress).toBe(1 - bar.width);
    const log = new Item(ItemTypes.Log);
    expect(conveyor.conveyor()?.canAccept(log)).toBe(true);
    conveyor.conveyor()?.add(log);
    expect(conveyor.conveyor()?.items[0].progress).toBe(0);
    conveyor.tick(1);
    expect(conveyor.conveyor()?.items[0].progress).toBe(
      1 - bar.width - log.width
    );
  });

  test("transfers items to next conveyor", () => {
    const game = makeGame(3, 1);
    const conveyor1 = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor1, Side.East);
    const conveyor2 = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, conveyor2, Side.East);

    const c1Bar = new Item(ItemTypes.IronBar);
    conveyor1.conveyor()?.add(c1Bar);
    const c2Bar = new Item(ItemTypes.IronBar);
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
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.East);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemTypes.IronBar);
    conveyor.conveyor()?.add(bar);

    conveyor.tick(0);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(0);
    conveyor.tick(0.99);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(0);
    conveyor.tick(0.011);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(1);
  });

  test("takes items from inventories if facing right direction", () => {
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.West);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemTypes.IronBar, 3);
    crate.inventory()?.add(bar);

    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(2);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(2);
    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
    conveyor.tick(1);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(1);
    expect(conveyor.conveyor()?.items.length).toBe(2);
    expect(conveyor.conveyor()?.items[0].item.quantity).toBe(1);
  });

  test("doesn't take from inventories if not facing right direction", () => {
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.North);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemTypes.IronBar, 3);
    crate.inventory()?.add(bar);

    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
  });

  test("doesn't take from inventories if ghost", () => {
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    conveyor.ghost = true;
    buildBuilding(game, conveyor, Side.West);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemTypes.IronBar, 3);
    crate.inventory()?.add(bar);

    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
    conveyor.tick(0);
    expect(crate.inventory()?.count(ItemTypes.IronBar)).toBe(3);
    expect(conveyor.conveyor()?.items.length).toBe(0);
  });

  test("links with prev conveyors", () => {
    const game = makeGame(2, 2);
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
    const game = makeGame(2, 2);
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
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.West);
    const crate = new Crate(new V2(1, 0));
    buildBuilding(game, crate);

    const bar = new Item(ItemTypes.IronBar);
    crate.inventory()?.add(bar);

    conveyor.tick(0);
    expect(game.items.has(bar.id)).toBeTrue();
    expect(game.items.get(bar.id)?.pos).toEqual(conveyor.pos);
  });

  test("positions items correctly on straight conveyor", () => {
    const game = makeGame(3, 1);
    const conveyor = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, conveyor, Side.East);

    const bar = new Item(ItemTypes.IronBar);
    conveyor.conveyor()?.add(bar);
    conveyor.tick(0.5);

    const worldItem = game.items.get(bar.id);
    expect(worldItem?.pos.x).toBeCloseTo(1.25);
    expect(worldItem?.pos.y).toBeCloseTo(0);
  });

  test("positions items correctly on curved conveyor", () => {
    const game = makeGame(2, 2);
    buildBuilding(game, new WoodenConveyor(new V2(0, 0)), Side.East);
    const corner = new WoodenConveyor(new V2(1, 0));
    buildBuilding(game, corner, Side.South);

    const bar = new Item(ItemTypes.IronBar);
    corner.conveyor()?.add(bar);
    corner.tick(0.5);

    const worldItem = game.items.get(bar.id);

    expect(worldItem?.pos.x).toBeCloseTo(1, 2);
    expect(worldItem?.pos.y).toBeCloseTo(0.39269908169872414, 2);
  });

  test("doesn't transfer items onto ghost conveyors", () => {
    const game = makeGame(3, 1);
    game.heldItem = new Item(ItemTypes.WoodenConveyor);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    buildBuilding(game, conveyor, Side.East);
    buildHeldBuilding(game, 0, 1, Side.East, true);
    const ghostConveyor = getBuilding(game, 0, 1)!;

    const bar = new Item(ItemTypes.IronBar);
    conveyor.conveyor()?.add(bar);

    conveyor.tick(2);

    expect(conveyor.conveyor()?.items.length).toBe(1);
    expect(ghostConveyor.conveyor()?.items.length).toBe(0);
    expect(conveyor.conveyor()?.items[0].progress).toBe(1 - bar.width);
  });
});
