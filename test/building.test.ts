import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import {
  buildBuilding,
  buildHeldBuilding,
  buildingFromType,
} from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Lumberyard } from "../src/model/buildings";
import { pickupItem } from "../src/op/item-management";
import { ItemTypes } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { getBuilding } from "../src/op/get-building";
import { makeAllGrass } from "./test-helpers";
import { TileType } from "../src/map/tile-type";
import { Side } from "../src/model/side";
import { BuildingTypes } from "../src/model/entity-type";

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
    game.heldItem = new Item(ItemTypes.Conveyor, 2);

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
    game.heldItem = new Item(ItemTypes.Conveyor, 2);
    makeAllGrass(game);
    game.map[0][0] = TileType.Tree;
    game.map[0][1] = TileType.Water;
    game.map[0][2] = TileType.Tree;
    game.map[0][3] = TileType.Stone;
    expect(buildHeldBuilding(game, 0, 0)).toBe(false);
    expect(buildHeldBuilding(game, 0, 1)).toBe(false);
    expect(buildHeldBuilding(game, 0, 2)).toBe(false);
    expect(buildHeldBuilding(game, 0, 3)).toBe(true);
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
    game.inventory.add(new Item(ItemTypes.Log));
    pickupItem(game, game.inventory, 0, 0);
    buildHeldBuilding(game, 0, 0);
    expect(game.buildings[0][0]).toBeUndefined();
    expect(game.heldItem?.type).toBe(ItemTypes.Log);
  });

  test("build from held", () => {
    const game = new Game(5, 9);
    makeAllGrass(game);
    game.map[0][1] = TileType.Tree;
    game.inventory.add(new Item(ItemTypes.Lumberyard));

    pickupItem(game, game.inventory, 0, 0);
    buildHeldBuilding(game, 1, 1, Side.South);

    expect(game.buildings[1][1]).toBeDefined();
    const building = getBuilding(game, 1, 1);
    expect(building?.facing).toEqual(Side.South);
    expect(building?.type).toBe(BuildingTypes.Lumberyard);
    expect(game.inventory.getAt(0, 0)).toBeUndefined();
    expect(game.heldItem).toBeUndefined();

    expect(building?.inventory()?.count(ItemTypes.Log)).toBe(0);
    game.tick(20);
    expect(building?.inventory()?.count(ItemTypes.Log)).toBeGreaterThan(0);
  });

  test("build larger building", () => {
    const game = new Game(5, 9);
    makeAllGrass(game);
    game.inventory.add(new Item(ItemTypes.SteamMiningDrill));

    pickupItem(game, game.inventory, 0, 0);
    buildHeldBuilding(game, 1, 1, Side.South);

    const building = getBuilding(game, 1, 1)!;
    expect(game.buildings[0][0]).toBeUndefined();
    expect(game.buildings[1][1]).toBe(building.id);
    expect(game.buildings[2][1]).toBe(building.id);
    expect(game.buildings[1][2]).toBe(building.id);
    expect(game.buildings[2][2]).toBe(building.id);
    expect(game.buildings[3][3]).toBeUndefined();
    expect(building?.facing).toEqual(Side.South);
    expect(building?.type).toBe(BuildingTypes.SteamMiningDrill);
    expect(game.inventory.getAt(0, 0)).toBeUndefined();
    expect(game.heldItem).toBeUndefined();

    expect(building?.inventory()?.count(ItemTypes.Stone)).toBe(0);
    game.tick(20);
    expect(building?.inventory()?.count(ItemTypes.Stone)).toBeGreaterThan(0);
  });

  test("build from held stack", () => {
    const game = new Game(2, 1);
    makeAllGrass(game);
    game.inventory.add(new Item(ItemTypes.Conveyor, 2));

    pickupItem(game, game.inventory, 0, 0);
    expect(game.heldItem?.quantity).toBe(2);
    buildHeldBuilding(game, 0, 0, Side.East);
    expect(game.heldItem?.quantity).toBe(1);
    buildHeldBuilding(game, 0, 1, Side.East);
    expect(game.heldItem).toBeUndefined();

    const c1 = getBuilding(game, 0, 0);
    const c2 = getBuilding(game, 0, 1);

    expect(c1?.type).toBe(BuildingTypes.Conveyor);
    expect(c2?.type).toBe(BuildingTypes.Conveyor);
  });

  test("can build all types of buildings", () => {
    const buildingTypes = Object.values(BuildingTypes);
    buildingTypes.forEach((bType) => {
      expect(buildingFromType(bType, V2.zero()).type).toBe(bType);
    });
  });

  // test("occupies right spots horizontal", () => {
  //   const game = new Game(5, 1);
  //   buildBuilding(game, new Portal(new V2(2, 0)), Side.South);
  //   const portal = game.enemyPortal!;

  //   expect(portal.occupied.length).toBe(3);
  //   expect(portal.occupied[0].equals(new V2(1, 0))).toBeTrue();
  //   expect(portal.occupied[1].equals(new V2(2, 0))).toBeTrue();
  //   expect(portal.occupied[2].equals(new V2(3, 0))).toBeTrue();
  // });

  // test("occupies right spots vertical", () => {
  //   const game = new Game(1, 5);
  //   buildBuilding(game, new Portal(new V2(0, 2)), Side.East);
  //   const portal = game.enemyPortal!;

  //   expect(portal.occupied.length).toBe(3);
  //   expect(portal.occupied[0].equals(new V2(0, 1))).toBeTrue();
  //   expect(portal.occupied[1].equals(new V2(0, 2))).toBeTrue();
  //   expect(portal.occupied[2].equals(new V2(0, 3))).toBeTrue();
  // });
});
