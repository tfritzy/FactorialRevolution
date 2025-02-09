import { TileType } from "../map/tile-type";
import { Game } from "../model/game";

export class GridHelper {
  /**
   * Iterates over all positions within range of a center position,
   * calling the callback for each valid position
   */
  static forEachTileInRange<T>(
    grid: T[][],
    centerX: number,
    centerY: number,
    range: number,
    callback: (x: number, y: number, value: T) => void
  ): void {
    const startX = Math.max(0, Math.floor(centerX - range));
    const endX = Math.min(grid[0].length - 1, Math.floor(centerX + range));
    const startY = Math.max(0, Math.floor(centerY - range));
    const endY = Math.min(grid.length - 1, Math.floor(centerY + range));

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        callback(x, y, grid[y][x]);
      }
    }
  }

  /**
   * Counts tiles that match a predicate within range of a center position
   */
  static countTilesInRange<T>(
    grid: T[][],
    centerX: number,
    centerY: number,
    range: number,
    predicate: (value: T) => boolean
  ): number {
    let count = 0;
    const startX = Math.max(0, Math.floor(centerX - range));
    const endX = Math.min(grid[0].length - 1, Math.floor(centerX + range));
    const startY = Math.max(0, Math.floor(centerY - range));
    const endY = Math.min(grid.length - 1, Math.floor(centerY + range));

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        if (predicate(grid[y][x])) {
          count++;
        }
      }
    }
    return count;
  }
}

export function getItem<T>(grid: T[][], y: number, x: number): T | undefined {
  if (y >= 0 && y < grid.length) {
    const row = grid[y];
    if (x >= 0 && x < row.length) {
      return row[x];
    }
  }
  return undefined;
}

export function setItem<T>(grid: T[][], y: number, x: number, value: T): void {
  if (y >= 0 && y < grid.length) {
    const row = grid[y];
    if (x >= 0 && x < row.length) {
      row[x] = value;
    }
  }
}

export function inBounds<T>(grid: T[][], y: number, x: number): boolean {
  const inBounds = y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
  return inBounds;
}

export function isTraversable(game: Game, y: number, x: number) {
  if (game.map[y][x] === TileType.Tree) {
    return false;
  }

  if (game.map[y][x] === TileType.BerryBush) {
    return false;
  }

  if (game.map[y][x] === TileType.Water) {
    return false;
  }

  if (game.buildings[y][x]) {
    return false;
  }

  return true;
}
