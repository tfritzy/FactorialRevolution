import { getItem, setItem } from "../helpers/grid-helpers";
import { randomInt } from "../helpers/random";
import { Item } from "../item/item";
import { ItemTypes } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { Town } from "../model/buildings";
import { Game } from "../model/game";
import { Portal } from "../model/portal";
import { Side } from "../model/side";
import { V2 } from "../numerics/v2";
import { buildBuilding } from "./build-building";

export function initPortals(game: Game): void {
  placeEnemyPortal(game);
  placeTown(game);
}

function placeEnemyPortal(game: Game) {
  let pos: V2 | undefined = undefined;
  const centerY = Math.floor(game.map.length / 2);
  const centerX = Math.floor(game.map[0].length / 2);
  const lowX = Math.max(0, centerX - 20);
  const highX = Math.min(game.map[0].length, centerX + 20);
  const lowY = Math.max(0, centerY - 20);
  const highY = Math.min(game.map.length, centerY + 20);

  for (let attempt = 0; attempt < 200; attempt++) {
    const xy: boolean = Math.random() < 0.5;
    const high: boolean = Math.random() < 0.5;
    if (xy) {
      if (high) {
        pos = new V2(randomInt(highX), highY - 1);
      } else {
        pos = new V2(randomInt(highX), lowY);
      }
    } else {
      if (high) {
        pos = new V2(highX - 1, randomInt(highY));
      } else {
        pos = new V2(lowX, randomInt(highY));
      }
    }

    if (checkPortalPos(game, pos, xy)) {
      buildBuilding(game, new Portal(pos), getFacing(xy, high));
      return;
    }
  }
}

function placeTown(game: Game) {
  const centerY = Math.floor(game.map.length / 2);
  const centerX = Math.floor(game.map[0].length / 2);

  for (let y = centerY - 2; y <= centerY + 2; y++) {
    for (let x = centerX - 2; x <= centerX + 2; x++) {
      setItem(game.map, y, x, TileType.Grass);
    }
  }

  const portal = new Town(new V2(centerX, centerY));
  buildBuilding(game, portal, Side.North);
  for (let i = 0; i < 5; i++) {
    portal.inventory()?.add(new Item(ItemTypes.Human));
  }
}

export function checkPortalPos(game: Game, pos: V2, xy: boolean): boolean {
  if (pos.x < 0 || pos.x >= game.map[0].length) {
    return false;
  }

  if (pos.y < 0 || pos.y >= game.map.length) {
    return false;
  }

  if (xy) {
    if (
      getItem(game.map, pos.y, pos.x - 1) === TileType.Grass &&
      getItem(game.map, pos.y, pos.x) === TileType.Grass &&
      getItem(game.map, pos.y, pos.x + 1) === TileType.Grass
    ) {
      return true;
    }
  } else {
    if (
      getItem(game.map, pos.y - 1, pos.x) === TileType.Grass &&
      getItem(game.map, pos.y, pos.x) === TileType.Grass &&
      getItem(game.map, pos.y + 1, pos.x) === TileType.Grass
    ) {
      return true;
    }
  }

  return false;
}

function getFacing(xy: boolean, high: boolean) {
  if (xy) {
    if (high) return Side.North;
    else return Side.South;
  } else {
    if (high) return Side.West;
    else return Side.East;
  }
}
