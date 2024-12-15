import { test, describe, expect } from "bun:test";
import { Game } from "../src/model/game";
import { makeAllGrass } from "./test-helpers";
import { TileType } from "../src/map/tile-type";
import { playerHarvest } from "../src/op/player-harvest";
import { ItemType } from "../src/item/item-type";

describe("PlayerHarvest", () => {
  test("harvests right resource from each tile type", () => {
    const game = new Game(5, 5);
    makeAllGrass(game);
    game.map[0][0] = TileType.Tree;
    game.map[0][1] = TileType.Copper;
    game.map[0][2] = TileType.Iron;
    game.map[0][3] = TileType.Stone;

    playerHarvest(game, 0, 0);
    expect(game.inventory.count(ItemType.Log)).toBe(0);
    expect(game.inventory.count(ItemType.PlantMatter)).toBe(0);
    expect(game.inventory.count(ItemType.Stick)).toBe(0);

    game.tick(1);
    expect(game.inventory.count(ItemType.Log)).toBe(1);
    expect(game.inventory.count(ItemType.PlantMatter)).toBe(4);
    expect(game.inventory.count(ItemType.Stick)).toBe(2);

    playerHarvest(game, 0, 0);
    game.tick(0.5);
    playerHarvest(game, 0, 1);
    game.tick(1);
    expect(game.inventory.count(ItemType.Log)).toBe(1);
    expect(game.inventory.count(ItemType.CopperOre)).toBe(1);

    playerHarvest(game, 0, 2);
    game.tick(1);
    expect(game.inventory.count(ItemType.IronOre)).toBe(1);

    playerHarvest(game, 0, 3);
    game.tick(1);
    expect(game.inventory.count(ItemType.Stone)).toBe(1);

    expect(game.harvesting).toBeUndefined();
  });
});
