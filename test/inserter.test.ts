import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Crate } from "../src/model/buildings";
import { Item } from "../src/item/item";
import { ItemTypes } from "../src/item/item-type";
import { WoodenConveyor, WoodenInserter } from "../src/model/buildings";
import { Side } from "../src/model/side";

describe("Inserter", () => {
  test("inserts items from one inventory to another", () => {
    const game = new Game(3, 1);
    const sourceCrate = new Crate(new V2(0, 0));
    const inserter = new WoodenInserter(new V2(1, 0));
    const targetCrate = new Crate(new V2(2, 0));
    buildBuilding(game, sourceCrate);
    buildBuilding(game, inserter, Side.East);
    buildBuilding(game, targetCrate);
    const log = new Item(ItemTypes.Log);

    expect(inserter.inserter()?.armPosition).toBe(0);
    expect(inserter.inserter()?.heldItem).toBeUndefined();
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBeUndefined();
    sourceCrate.inventory()!.add(log);
    expect(sourceCrate.inventory()!.count(ItemTypes.Log)).toBe(1);
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBe(log);
    expect(sourceCrate.inventory()!.count(ItemTypes.Log)).toBe(0);
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBe(log);
    expect(inserter.inserter()?.armPosition).toBe(0);
    inserter.tick(0.5);
    expect(inserter.inserter()?.armPosition).toBe(0.5);
    inserter.tick(0.5);
    expect(inserter.inserter()?.heldItem).toBeUndefined();
    expect(sourceCrate.inventory()!.count(ItemTypes.Log)).toBe(0);
    expect(targetCrate.inventory()!.count(ItemTypes.Log)).toBe(1);
  });

  test("doesn't grab item if target is full", () => {
    const game = new Game(3, 1);
    const sourceCrate = new Crate(new V2(0, 0));
    const inserter = new WoodenInserter(new V2(1, 0));
    const targetCrate = new Crate(new V2(2, 0));
    buildBuilding(game, sourceCrate);
    buildBuilding(game, inserter, Side.East);
    buildBuilding(game, targetCrate);
    const log = new Item(ItemTypes.Log);
    sourceCrate.inventory()!.add(log);
    for (let i = 0; i < 9; i++)
      targetCrate.inventory()?.add(new Item(ItemTypes.Log, 99));

    expect(inserter.inserter()?.heldItem).toBeUndefined();
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBeUndefined();
    targetCrate.inventory()!.withdrawFirstItem();
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBe(log);
  });

  test("grabs from conveyors", () => {
    const game = new Game(3, 1);
    const conveyor = new WoodenConveyor(new V2(0, 0));
    const inserter = new WoodenInserter(new V2(1, 0));
    const targetCrate = new Crate(new V2(2, 0));
    buildBuilding(game, conveyor, Side.North);
    buildBuilding(game, inserter, Side.East);
    buildBuilding(game, targetCrate);
    const bar = new Item(ItemTypes.IronBar);
    conveyor.conveyor()!.add(bar);

    expect(inserter.inserter()?.heldItem).toBeUndefined();
    inserter.tick(0);
    expect(inserter.inserter()?.heldItem).toBe(bar);
    expect(conveyor.conveyor()?.items.length).toBe(0);
  });
});
