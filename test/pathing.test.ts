import { expect, test, describe } from "bun:test";
import { rotateSide, Side } from "../src/model/side";
import { Game } from "../src/model/game";
import { initPortals } from "../src/op/build-portal";
import { BuildingTypes, EnemyTypes } from "../src/model/entity-type";
import { V2 } from "../src/numerics/v2";
import { makeAllGrass } from "./test-helpers";
import { TileType } from "../src/map/tile-type";
import { Portal } from "../src/model/portal";
import { dijkstra } from "../src/op/pathing";

describe("Pathing", () => {
  test("finds shortest paths", () => {
    const game = new Game(4, 2);
    makeAllGrass(game);
    game.map[1][1] = TileType.Tree;

    // V < V <
    // s T s <
    const path = dijkstra(game, [new V2(0, 1), new V2(2, 1)]);
    const expected = [
      [V2.down(), V2.left(), V2.down(), V2.left()],
      [undefined, V2.left(), undefined, V2.left()],
    ];

    expect(path[0][0]).toEqual(V2.down());
    expect(path[0][1]).toEqual(V2.left());
    expect(path[0][2]).toEqual(V2.down());
    expect(path[0][3]).toEqual(V2.left());

    expect(path[1][0]).toBeNull();
    expect(path[1][1]).toEqual(V2.left());
    expect(path[1][2]).toBeNull();
    expect(path[1][3]).toEqual(V2.left());
  });
});
