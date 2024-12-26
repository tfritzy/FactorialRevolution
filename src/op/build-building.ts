import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";
import { BuildingType, BuildingTypes } from "../model/entity-type";
import {
  Blacksmith,
  Fletcher,
  Furnace,
  Lumberyard,
  WoodShop,
  Crate,
  StoneMiner,
  WheatFarm,
  WoodenConveyor,
  WoodenInserter,
  GatheringHut,
  Town,
  Keep,
  StoneCarver,
  Slinger,
  Ballista,
  OilTower,
  Castle,
} from "../model/buildings";
import { Side } from "../model/side";
import { TileType } from "../map/tile-type";
import { getBuilding } from "./get-building";
import { Portal } from "../model/portal";

export function buildingFromType(type: BuildingType, pos: V2): Building {
  switch (type) {
    case BuildingTypes.Crate:
      return new Crate(pos);
    case BuildingTypes.Lumberyard:
      return new Lumberyard(pos);
    case BuildingTypes.StoneMiner:
      return new StoneMiner(pos);
    case BuildingTypes.StoneCarver:
      return new StoneCarver(pos);
    case BuildingTypes.WoodenConveyor:
      return new WoodenConveyor(pos);
    case BuildingTypes.WoodenInserter:
      return new WoodenInserter(pos);
    case BuildingTypes.GatheringHut:
      return new GatheringHut(pos);
    case BuildingTypes.Blacksmith:
      return new Blacksmith(pos);
    case BuildingTypes.Fletcher:
      return new Fletcher(pos);
    case BuildingTypes.Furnace:
      return new Furnace(pos);
    case BuildingTypes.WheatFarm:
      return new WheatFarm(pos);
    case BuildingTypes.WoodShop:
      return new WoodShop(pos);
    case BuildingTypes.Portal:
      return new Portal(pos);
    case BuildingTypes.Town:
      return new Town(pos);
    case BuildingTypes.Keep:
      return new Keep(pos);
    case BuildingTypes.Slinger:
      return new Slinger(pos);
    case BuildingTypes.Ballista:
      return new Ballista(pos);
    case BuildingTypes.OilTower:
      return new OilTower(pos);
    case BuildingTypes.Castle:
      return new Castle(pos);
    default:
      throw new Error("Missing building " + type);
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
  ghost: boolean = false
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
  if (!ghost) {
    game.heldItem.quantity -= 1;
    if (game.heldItem.quantity <= 0) {
      game.heldItem = undefined;
    }

    if (game.previewBuliding && game.previewBuliding.pos.equals(building.pos)) {
      removePreviewBuilding(game);
    }
  } else {
    removePreviewBuilding(game);
    game.previewBuliding = building;
  }

  buildBuilding(game, building, facing);
  building.ghost = ghost;

  return true;
}

export function removePreviewBuilding(game: Game) {
  if (!game.previewBuliding) {
    return;
  }

  removeBuilding(game, game.previewBuliding);
  game.previewBuliding = undefined;
}

export function removeBuilding(game: Game, building: Building) {
  game.buildings[building.pos.y][building.pos.x] = undefined;
  game.entities.delete(building.id);
  game.removedBuildings.push(building.id);
}

export function buildBuilding(
  game: Game,
  building: Building,
  facing: Side = Side.North
) {
  building.facing = facing;
  game.addEntity(building);
}
