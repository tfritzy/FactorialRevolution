import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding, buildHeldBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Lumberyard } from "../src/model/buildings";
import { pickupItem } from "../src/op/item-management";
import { ItemType } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { getBuilding } from "../src/op/get-building";
import { makeAllGrass } from "./test-helpers";
import { EntityType } from "../src/model/EntityType";
import { TileType } from "../src/map/tile-type";
import { Side } from "../src/model/side";

describe("Building", () => {
  test("building", () => {
    const game = new Game(5, 9);
    const lumberyard = new Lumberyard(new V2(1, 2));

    buildBuilding(game, lumberyard);

    expect(game.buildings.length).toBe(9);
    expect(game.buildings[0].length).toBe(5);
    expect(game.buildings[2][1]).toBe(lumberyard.id);
    expect(game.entities.get(lumberyard.id)).toBe(lumberyard);
  });

  test("preview building", () => {
    const game = new Game(5, 9);
    game.heldItem = new Item(ItemType.WoodenConveyor, 2);

    expect(buildHeldBuilding(game, 0, 0, Side.North, true)).toBe(true);
    const ghost1 = game.buildings[0][0]!;
    expect(buildHeldBuilding(game, 0, 1, Side.North, true)).toBe(true);
    const ghost2 = game.buildings[0][1]!;

    expect(game.buildings[0][0]).toBeUndefined();
    expect(game.removedBuildings).toContain(ghost1);
    expect(game.removedBuildings).not.toContain(ghost2);
    expect(game.addedBuildings).toContain(ghost1);
    expect(game.addedBuildings).toContain(ghost2);

    expect(buildHeldBuilding(game, 0, 1, Side.North, false)).toBe(true);
    const real = game.buildings[0][1]!;

    expect(game.removedBuildings).toContain(ghost2);
    expect(game.addedBuildings).toContain(real);
  });

  test("doesn't build on un-buildable tiles", () => {
    const game = new Game(5, 9);
    game.heldItem = new Item(ItemType.WoodenConveyor, 2);
    makeAllGrass(game);
    game.map[0][0] = TileType.Tree;
    game.map[0][1] = TileType.Water;
    game.map[0][2] = TileType.Cliff;
    game.map[0][3] = TileType.Stone;
    expect(buildHeldBuilding(game, 0, 0)).toBe(false);
    expect(buildHeldBuilding(game, 0, 1)).toBe(false);
    expect(buildHeldBuilding(game, 0, 2)).toBe(false);
    expect(buildHeldBuilding(game, 0, 3)).toBe(false);
    expect(buildHeldBuilding(game, 0, 4)).toBe(true);
    expect(buildHeldBuilding(game, 0, 4)).toBe(false);
  });

  test("build from held, no held", () => {
    const game = new Game(5, 9);
    buildHeldBuilding(game, 0, 0);
    expect(game.buildings[0][0]).toBeUndefined();
  });

  test("build from non-building held", () => {
    const game = new Game(5, 9);
    game.inventory.add(new Item(ItemType.Log));
    pickupItem(game, game.inventory, 0, 0);
    buildHeldBuilding(game, 0, 0);
    expect(game.buildings[0][0]).toBeUndefined();
    expect(game.heldItem?.type).toBe(ItemType.Log);
  });

  test("build from held", () => {
    const game = new Game(5, 9);
    makeAllGrass(game);
    game.map[0][1] = TileType.Tree;
    game.inventory.add(new Item(ItemType.Lumberyard));

    pickupItem(game, game.inventory, 0, 0);
    buildHeldBuilding(game, 0, 0, Side.South);

    expect(game.buildings[0][0]).toBeDefined();
    const building = getBuilding(game, 0, 0);
    expect(building?.facing).toEqual(Side.South);
    expect(building?.type).toBe(EntityType.Lumberyard);
    expect(game.inventory.getAt(0, 0)).toBeUndefined();
    expect(game.heldItem).toBeUndefined();

    expect(building?.inventory()?.count(ItemType.Log)).toBe(0);
    game.tick(10);
    expect(building?.inventory()?.count(ItemType.Log)).toBeGreaterThan(0);
  });

  test("build from held stack", () => {
    const game = new Game(2, 1);
    makeAllGrass(game);
    game.inventory.add(new Item(ItemType.WoodenConveyor, 2));

    pickupItem(game, game.inventory, 0, 0);
    expect(game.heldItem?.quantity).toBe(2);
    buildHeldBuilding(game, 0, 0, Side.East);
    expect(game.heldItem?.quantity).toBe(1);
    buildHeldBuilding(game, 0, 1, Side.East);
    expect(game.heldItem).toBeUndefined();

    const c1 = getBuilding(game, 0, 0);
    const c2 = getBuilding(game, 0, 1);

    expect(c1?.type).toBe(EntityType.WoodenConveyor);
    expect(c2?.type).toBe(EntityType.WoodenConveyor);
  });
});
