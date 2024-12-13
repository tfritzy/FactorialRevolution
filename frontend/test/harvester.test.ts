import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { Lumberyard } from "../src/model/lumberyard";
import { buildBuilding } from "../src/op/build-building";
import { TileType } from "../src/map/tile-type";
import { ItemType } from "../src/item/item-type";
import { V2 } from "../src/numerics/v2";
import { Miner } from "../src/model/miner";
import { makeAllGrass } from "./test-helpers";

describe("Harvester", () => {
  test("lumberyard harvests from trees", () => {
    const game = new Game(5, 9);
    makeAllGrass(game);
    game.map[0][0] = TileType.Tree;
    game.map[0][1] = TileType.Tree;
    game.map[1][0] = TileType.Tree;
    const lumberyard = new Lumberyard(new V2(1, 1));
    buildBuilding(game, lumberyard);

    expect(lumberyard.inventory()?.count(ItemType.Log)).toBe(0);
    lumberyard.tick(0); // Deposits one initially
    expect(lumberyard.inventory()?.count(ItemType.Log)).toBe(1);

    const secondsToProduce =
      1 / (3 * lumberyard.harvester()!.harvestRatePerTile_ips);
    lumberyard.tick(secondsToProduce - 0.1);
    expect(lumberyard.inventory()?.count(ItemType.Log)).toBe(1);
    lumberyard.tick(0.2);
    expect(lumberyard.inventory()?.count(ItemType.Log)).toBe(2);
  });

  test("miner harvests iron ore from iron tile", () => {
    const game = new Game(5, 5);
    makeAllGrass(game);
    game.map[0][1] = TileType.Iron;
    const miner = new Miner(new V2(0, 1));
    buildBuilding(game, miner);

    expect(miner.inventory()?.count(ItemType.IronOre)).toBe(0);
    miner.tick(0); // Deposits one initially
    expect(miner.inventory()?.count(ItemType.IronOre)).toBe(1);
  });

  test("miner harvests copper ore from copper tile", () => {
    const game = new Game(5, 5);
    makeAllGrass(game);
    game.map[0][1] = TileType.Copper;
    const miner = new Miner(new V2(0, 1));
    buildBuilding(game, miner);

    expect(miner.inventory()?.count(ItemType.CopperOre)).toBe(0);
    miner.tick(0); // Deposits one initially
    expect(miner.inventory()?.count(ItemType.CopperOre)).toBe(1);
  });
});
