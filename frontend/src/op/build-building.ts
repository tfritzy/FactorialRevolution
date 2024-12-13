import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";

export function buildBuilding(
  game: Game,
  building: Building,
  facing: V2 = V2.up()
) {
  game.buildings[building.pos.y][building.pos.x] = building.id;
  game.entities.set(building.id, building);
  building.game = game;
  building.facing = facing;
  building.onAddToGrid();
}
