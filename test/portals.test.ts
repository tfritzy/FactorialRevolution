import { expect, test, describe } from "bun:test";
import { rotateSide, Side } from "../src/model/side";
import { Game } from "../src/model/game";
import { initPortals } from "../src/op/build-portal";
import { BuildingTypes, EnemyTypes } from "../src/model/entity-type";
import { V2 } from "../src/numerics/v2";
import { makeAllGrass } from "./test-helpers";
import { TileType } from "../src/map/tile-type";
import { Portal } from "../src/model/portal";

describe("Portals", () => {
  test("places a portal", () => {
    // . x x .
    // x . . x
    // x . . .
    // . x . T

    const spotCounts = new Map<string, number>([
      [new V2(1, 0).toString(), 0],
      [new V2(2, 0).toString(), 0],
      [new V2(0, 1).toString(), 0],
      [new V2(3, 1).toString(), 0],
      [new V2(0, 2).toString(), 0],
      [new V2(1, 3).toString(), 0],
    ]);

    for (let i = 0; i < 50; i++) {
      const game = new Game(4, 4);
      makeAllGrass(game);
      game.map[3][3] = TileType.Tree;

      initPortals(game);
      const portal = game.entities
        .values()
        .find((e) => e.type === BuildingTypes.Portal);
      expect(portal).toBeDefined();
      const spot = portal!.pos;
      try {
        expect(spotCounts.has(spot.toString())).toBeTrue();
      } catch (error) {
        console.log("Expected", spotCounts, "to have key", spot);
        throw error;
      }

      spotCounts.set(spot.toString(), spotCounts.get(spot.toString())! + 1);
    }

    for (const [spot, count] of spotCounts.entries()) {
      try {
        expect(count).toBeGreaterThan(0);
      } catch (error) {
        console.log("expected", spot, "to have been placed in", spotCounts);
        throw error;
      }
    }
  });

  test("vague spawning", () => {
    const game = new Game(10, 10);
    makeAllGrass(game);
    initPortals(game);

    game.tick(10);

    expect(
      game.entities
        .values()
        .find((e) => Object.values(EnemyTypes).includes(e.type as any))
    ).not.toBeDefined();

    game.tick(Portal.WAVE_TIME - 10 + 1);

    const spawned = game.entities
      .values()
      .find((e) => Object.values(EnemyTypes).includes(e.type as any))!;
    expect(spawned).toBeDefined();
    expect(game.town?.occupied.some((p) => p.equals(spawned.pos.toGrid())));
  });

  test("places home portal", () => {
    const game = new Game(5, 5);
    initPortals(game);
    const portal = game.entities
      .values()
      .find((e) => e.type === BuildingTypes.Town);
    expect(portal?.pos.x).toBe(2);
    expect(portal?.pos.y).toBe(2);
  });

  test("establishes pathing", () => {
    const game = new Game(4, 4);
    makeAllGrass(game);
    expect(game.pathing[0][0]).toBeNull();
    initPortals(game);
    try {
      expect(
        game.pathing[0][0]?.equals(V2.down()) ||
          game.pathing[0][0]?.equals(V2.right())
      ).toBeTrue();
    } catch (error) {
      console.log(
        "expected pathing[0][0] to be down or right, but was",
        game.pathing[0][0]?.toString()
      );
      throw error;
    }
  });
});
