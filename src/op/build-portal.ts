import { getItem, setItem } from "../helpers/grid-helpers";
import { randomInt } from "../helpers/random";
import { TileType } from "../map/tile-type";
import { HomePortal } from "../model/buildings";
import { Game } from "../model/game";
import { Portal } from "../model/portal";
import { rotateSide, Side } from "../model/side";
import { V2 } from "../numerics/v2";
import { buildBuilding } from "./build-building";
import { dijkstra } from "./pathing";

export function initPortals(game: Game): void {
  placeEnemyPortal(game);
  placeHomePortal(game);
}

function placeEnemyPortal(game: Game) {
  let pos: V2 | undefined = undefined;
  for (let attempt = 0; attempt < 200; attempt++) {
    const xy: boolean = Math.random() < 0.5;
    const high: boolean = Math.random() < 0.5;
    if (xy) {
      if (high) {
        pos = new V2(randomInt(game.map.length), game.map.length - 1);
      } else {
        pos = new V2(randomInt(game.map.length), 0);
      }
    } else {
      if (high) {
        pos = new V2(game.map[0].length - 1, randomInt(game.map.length));
      } else {
        pos = new V2(0, randomInt(game.map.length));
      }
    }

    if (checkPortalPos(game, pos, xy)) {
      buildBuilding(game, new Portal(pos), getFacing(xy, high));
      return;
    }
  }
}

function placeHomePortal(game: Game) {
  const centerY = Math.floor(game.map.length / 2);
  const centerX = Math.floor(game.map[0].length / 2);

  for (let y = centerY - 2; y <= centerY + 2; y++) {
    for (let x = centerX - 2; x <= centerX + 2; x++) {
      setItem(game.map, y, x, TileType.Grass);
    }
  }

  const portal = new HomePortal(new V2(centerX, centerY));
  buildBuilding(game, portal, rotateSide(Side.North, randomInt(4)));
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
      getItem(game.map, pos.y, pos.x - 1) === "grass" &&
      getItem(game.map, pos.y, pos.x) === "grass" &&
      getItem(game.map, pos.y, pos.x + 1) === "grass"
    ) {
      return true;
    }
  } else {
    if (
      getItem(game.map, pos.y - 1, pos.x) === "grass" &&
      getItem(game.map, pos.y, pos.x) === "grass" &&
      getItem(game.map, pos.y + 1, pos.x) === "grass"
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
