import { Game } from "../model/game";
import { Building } from "../model/building";
import { getItem } from "../helpers/grid-helpers";

export function getBuilding(
  game: Game,
  y: number,
  x: number
): Building | undefined {
  const id = getItem(game.buildings, y, x);

  if (id) {
    const nextBuilding = game.entities.get(id);
    return nextBuilding as Building;
  }

  return undefined;
}
