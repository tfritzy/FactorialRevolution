import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";
import { BuildingType, BuildingTypes } from "../model/entity-type";
import {
  Blacksmith,
  Fletcher,
  StoneFurnace,
  Lumberyard,
  WoodShop,
  Crate,
  Mine,
  WheatFarm,
  WoodenInserter,
  GatheringHut,
  Town,
  Keep,
  StoneCarver,
  Slinger,
  Ballista,
  OilTower,
  Castle,
  PalisadeWall,
  BombardTower,
  SteamMiningDrill,
  CannonTower,
  Conveyor,
  ArcherTower,
  SteelFurnace,
  MetalRollingMill,
  MunitionsFactory,
  LightMachineGunner,
  HeavyMachineGunner,
  MediumMachineGunner,
  Gunsmith,
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
    case BuildingTypes.Mine:
      return new Mine(pos);
    case BuildingTypes.StoneCarver:
      return new StoneCarver(pos);
    case BuildingTypes.Conveyor:
      return new Conveyor(pos);
    case BuildingTypes.WoodenInserter:
      return new WoodenInserter(pos);
    case BuildingTypes.GatheringHut:
      return new GatheringHut(pos);
    case BuildingTypes.Blacksmith:
      return new Blacksmith(pos);
    case BuildingTypes.Fletcher:
      return new Fletcher(pos);
    case BuildingTypes.StoneFurnace:
      return new StoneFurnace(pos);
    case BuildingTypes.SteelFurnace:
      return new SteelFurnace(pos);
    case BuildingTypes.MetalRollingMill:
      return new MetalRollingMill(pos);
    case BuildingTypes.WheatFarm:
      return new WheatFarm(pos);
    case BuildingTypes.WoodShop:
      return new WoodShop(pos);
    case BuildingTypes.Portal:
      return new Portal(pos);
    case BuildingTypes.Town:
      return new Town(pos);
    case BuildingTypes.ArcherTower:
      return new ArcherTower(pos);
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
    case BuildingTypes.PalisadeWall:
      return new PalisadeWall(pos);
    case BuildingTypes.CannonTower:
      return new CannonTower(pos);
    case BuildingTypes.BombardTower:
      return new BombardTower(pos);
    case BuildingTypes.SteamMiningDrill:
      return new SteamMiningDrill(pos);
    case BuildingTypes.MunitionsFactory:
      return new MunitionsFactory(pos);
    case BuildingTypes.LightMachineGunner:
      return new LightMachineGunner(pos);
    case BuildingTypes.MediumMachineGunner:
      return new MediumMachineGunner(pos);
    case BuildingTypes.HeavyMachineGunner:
      return new HeavyMachineGunner(pos);
    case BuildingTypes.Gunsmith:
      return new Gunsmith(pos);
    default:
      throw new Error("Missing building " + type);
  }
}

export function isBuildable(game: Game, y: number, x: number) {
  if (game.map[y][x] == TileType.Water) {
    return false;
  }

  if (game.map[y][x] == TileType.Tree) {
    return false;
  }

  if (game.map[y][x] == TileType.BerryBush) {
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

  const building = buildingFromType(game.heldItem.builds, new V2(x, y));
  for (let j = y; j < y + building.height; j++) {
    for (let i = x; i < x + building.width; i++) {
      if (!isBuildable(game, j, i)) {
        return false;
      }
    }
  }

  if (
    ghost &&
    game.previewBuliding &&
    game.previewBuliding.pos.x == x &&
    game.previewBuliding.pos.y == y
  ) {
    return false;
  }

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
  for (const pos of building.occupied) {
    game.buildings[pos.y][pos.x] = undefined;
  }

  game.entities.delete(building.id);
  game.removedBuildings.push(building.id);
}

export function buildBuilding(
  game: Game,
  building: Building,
  facing: Side = Side.North
): Building {
  building.facing = facing;
  game.addEntity(building);
  return building;
}
