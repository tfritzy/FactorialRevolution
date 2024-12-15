import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Lumberyard } from "../src/model/buildings";

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
});
