import { Game } from "../model/game";
import { Building } from "../model/building";

export function buildBuilding(game: Game, building: Building)
{
    game.buildings[building.pos.y][building.pos.x] = building.id;
    game.entities.set(building.id, building);
    building.game = game;
}