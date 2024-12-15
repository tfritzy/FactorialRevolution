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

describe("Buildings", () => {
  test("building", () => {
    const game = new Game(5, 9);
    const lumberyard = new Lumberyard(new V2(1, 2));

    buildBuilding(game, lumberyard);

    expect(game.buildings.length).toBe(9);
    expect(game.buildings[0].length).toBe(5);
    expect(game.buildings[2][1]).toBe(lumberyard.id);
    expect(game.entities.get(lumberyard.id)).toBe(lumberyard);
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
    buildHeldBuilding(game, 0, 0, V2.down());

    expect(game.buildings[0][0]).toBeDefined();
    const building = getBuilding(game, 0, 0);
    expect(building?.facing).toEqual(V2.down());
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
    game.map[0][1] = TileType.Tree;
    game.inventory.add(new Item(ItemType.WoodenConveyor, 2));

    pickupItem(game, game.inventory, 0, 0);
    expect(game.heldItem?.quantity).toBe(2);
    buildHeldBuilding(game, 0, 0, V2.right());
    expect(game.heldItem?.quantity).toBe(1);
    buildHeldBuilding(game, 0, 1, V2.right());
    expect(game.heldItem).toBeUndefined();

    const c1 = getBuilding(game, 0, 0);
    const c2 = getBuilding(game, 0, 1);

    expect(c1?.type).toBe(EntityType.WoodenConveyor);
    expect(c2?.type).toBe(EntityType.WoodenConveyor);
  });
});
