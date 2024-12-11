import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";
import { GridHelper } from "../helpers/grid-helpers";

export function getBuilding(
  game: Game,
  y: number,
  x: number
): Building | undefined {
  const id = GridHelper.getItem(game.buildings, y, x);

  if (id) {
    const nextBuilding = game.entities.get(id);
    return nextBuilding;
  }

  return undefined;
}
