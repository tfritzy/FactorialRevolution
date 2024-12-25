import { Game } from "../model/game";
import { V2 } from "../numerics/v2";
import { init2dArray } from "../helpers/init-2d-array";
import { inBounds, isTraversable } from "../helpers/grid-helpers";
import { flipSide, Side, walk } from "../model/side";

export function dijkstra(game: Game, starts: V2[]) {
  const q: [V2, number][] = starts.map((s) => [s, 0]);
  const prev: (V2 | null)[][] = init2dArray(
    game.map[0].length,
    game.map.length,
    null
  );
  const distances: number[][] = init2dArray(
    game.map[0].length,
    game.map.length,
    Infinity
  );
  const dirs = [V2.up(), V2.right(), V2.down(), V2.left()];

  starts.forEach((s) => (distances[s.y][s.x] = 0));

  while (q.length > 0) {
    const [cur, dist] = q.shift()!;

    for (const dir of dirs) {
      if (!inBounds(game.map, cur.y + dir.y, cur.x + dir.x)) continue;

      const newDist = dist + 1;
      if (newDist < distances[cur.y + dir.y][cur.x + dir.x]) {
        const next = new V2(cur.x + dir.x, cur.y + dir.y);
        distances[next.y][next.x] = newDist;
        prev[next.y][next.x] = dir.negate();

        if (isTraversable(game, next.y, next.x)) {
          q.push([next, newDist]);
        }
      }
    }
  }
  return prev;
}
