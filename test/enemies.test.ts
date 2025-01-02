import { expect, test, describe } from "bun:test";
import { Side } from "../src/model/side";
import { EnemyTypes } from "../src/model/entity-type";
import { getEnemyForType, Goblin } from "../src/model/enemies";
import { V2 } from "../src/numerics/v2";
import { Game } from "../src/model/game";
import { Portal } from "../src/model/portal";
import { buildBuilding } from "../src/op/build-building";
import { Town } from "../src/model/buildings";
import { TileType } from "../src/map/tile-type";
import { Enemy } from "../src/model/enemy";
import { makeAllGrass } from "./test-helpers";

describe("Enemies", () => {
  test("can build each type of enemy", () => {
    Object.values(EnemyTypes).forEach((type) => {
      expect(getEnemyForType(type, V2.zero(), 10).type).toBe(type);
    });
  });

  test("added to enemies array", () => {
    const game = new Game(1, 1);
    const gobbo = new Goblin(new V2(0, 0), 100);
    game.addEntity(gobbo);
    expect(game.enemies).toContain(gobbo.id);
    game.removeEntity(gobbo);
    expect(game.enemies.length).toBe(0);
  });

  test("walk towards the portal", () => {
    const game = new Game(15, 15);
    makeAllGrass(game);
    buildBuilding(game, new Portal(new V2(0, 1)), Side.East);
    buildBuilding(game, new Town(new V2(6, 1)), Side.West);
    game.map[0][1] = TileType.Tree;
    game.map[0][2] = TileType.Tree;

    game.tick(Portal.TREATY_DURATION);
    game.enemyPortal!.currentWave().remainingPower = 0;
    const enemy = game.entities.values().find((e) => e instanceof Enemy);
    expect(enemy).toBeDefined();

    const health = game.town!.health()!;
    expect(health.health).toBe(health.maxHealth);
    for (let i = 0; i < 100; i++) {
      game.tick(0.5);
    }
    expect(health.health).toBeLessThan(health.maxHealth);
  });
});
