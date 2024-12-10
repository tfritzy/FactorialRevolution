import { expect, test, describe } from "bun:test";
import { Game } from "../src/model/game";
import { Vector2 } from "three";
import { Lumberyard } from "../src/model/lumberyard";
import { buildBuilding } from "../src/op/build-building";


describe("Buildings", () => {
  test("building", () => {
    const game = new Game(5, 9);
    const lumberyard = new Lumberyard();
    
    buildBuilding(game, new Vector2(1, 2), lumberyard);

    expect(game.buildings.length).toBe(9);
    expect(game.buildings[0].length).toBe(5);
    expect(game.buildings[2][1]).toBe(lumberyard.id);
    expect(game.entities.get(lumberyard.id)).toBe(lumberyard);
  });
});