import { Vector2 } from "three";
import { Game } from "../model/game";
import { Building } from "../model/building";

export function buildBuilding(game: Game, pos: Vector2, building: Building)
{
    game.buildings[pos.y][pos.x] = building.id;
    game.entities.set(building.id, building);
}