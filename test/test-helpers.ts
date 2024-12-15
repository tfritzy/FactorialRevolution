import { TileType } from "../src/map/tile-type";
import { Game } from "../src/model/game";

export function makeAllGrass(game: Game) {
  for (let y = 0; y < game.map.length; y++) {
    for (let x = 0; x < game.map[0].length; x++) {
      game.map[y][x] = TileType.Grass;
    }
  }
}
