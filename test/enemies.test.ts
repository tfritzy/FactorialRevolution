import { expect, test, describe } from "bun:test";
import { rotateSide, Side } from "../src/model/side";
import { EnemyTypes } from "../src/model/entity-type";
import { getEnemyForType } from "../src/model/enemies";
import { V2 } from "../src/numerics/v2";
import { Game } from "../src/model/game";
import { initPortals } from "../src/op/build-portal";
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

  test("walk towards the portal", () => {
    const game = new Game(7, 3);
    makeAllGrass(game);
    buildBuilding(game, new Portal(new V2(0, 1)), Side.East);
    buildBuilding(game, new Town(new V2(6, 1)), Side.West);
    game.map[0][1] = TileType.Tree;
    game.map[0][2] = TileType.Tree;

    game.tick(Portal.WAVE_TIME);
    game.enemyPortal!.currentWave().remainingPower = 0;
    const enemy = game.entities.values().find((e) => e instanceof Enemy);

    const health = game.town?.health()!;
    expect(health.health).toBe(health.maxHealth);
    for (let i = 0; i < 100; i++) {
      game.tick(0.2);
    }
    expect(health.health).toBe(health.maxHealth - 1);
  });
});
