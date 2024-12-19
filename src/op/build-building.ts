import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";
import { EntityType } from "../model/EntityType";
import { Crate } from "../model/crate";
import {
  Lumberyard,
  StoneMiner,
  WoodenConveyor,
  WoodenInserter,
} from "../model/buildings";
import { Side } from "../model/side";
import { TileType } from "../map/tile-type";
import { getBuilding } from "./get-building";

function buildingFromType(type: EntityType, pos: V2) {
  switch (type) {
    case EntityType.Crate:
      return new Crate(pos);
    case EntityType.Lumberyard:
      return new Lumberyard(pos);
    case EntityType.StoneMiner:
      return new StoneMiner(pos);
    case EntityType.WoodenConveyor:
      return new WoodenConveyor(pos);
    case EntityType.WoodenInserter:
      return new WoodenInserter(pos);
  }
}

export function isBuildable(game: Game, y: number, x: number) {
  if (game.map[y][x] != TileType.Grass) {
    return false;
  }

  if (game.buildings[y][x]) {
    if (!getBuilding(game, y, x)!.ghost) {
      return false;
    }
  }

  return true;
}

export function buildHeldBuilding(
  game: Game,
  y: number,
  x: number,
  facing: Side = Side.North,
  ghost: boolean
): boolean {
  if (!game.heldItem?.builds) {
    return false;
  }

  if (!isBuildable(game, y, x)) {
    return false;
  }

  if (
    ghost &&
    game.previewBuliding &&
    game.previewBuliding.pos.x == x &&
    game.previewBuliding.pos.y == y
  ) {
    return false;
  }

  const building = buildingFromType(game.heldItem.builds, new V2(x, y));
  buildBuilding(game, building, facing);
  building.ghost = ghost;

  if (!ghost) {
    game.heldItem.quantity -= 1;
    if (game.heldItem.quantity <= 0) {
      game.heldItem = undefined;
    }
  } else {
    if (game.previewBuliding) {
      removeBuilding(game, game.previewBuliding);
      game.previewBuliding = undefined;
    }
    game.previewBuliding = building;
  }

  return true;
}

function removeBuilding(game: Game, building: Building) {
  game.buildings[building.pos.y][building.pos.x] = undefined;
  game.entities.delete(building.id);
  game.changedBuildings.push(building.pos);
}

export function buildBuilding(
  game: Game,
  building: Building,
  facing: Side = Side.North
) {
  game.buildings[building.pos.y][building.pos.x] = building.id;
  game.entities.set(building.id, building);
  building.game = game;
  building.facing = facing;
  building.onAddToGrid();
  game.changedBuildings.push(building.pos);
}
