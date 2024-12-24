import { V2 } from "../numerics/v2";

export enum Side {
  North,
  East,
  South,
  West,
}

export function rotateSide(side: Side, steps: number): Side {
  return ((side + steps + 4) % 4) as Side;
}

export function walk(pos: V2, dir: Side) {
  switch (dir) {
    case Side.North:
      return new V2(pos.x, pos.y - 1);
    case Side.East:
      return new V2(pos.x + 1, pos.y);
    case Side.South:
      return new V2(pos.x, pos.y + 1);
    case Side.West:
      return new V2(pos.x - 1, pos.y);
  }
}

export function flipSide(side: Side): Side {
  switch (side) {
    case Side.North:
      return Side.South;
    case Side.East:
      return Side.West;
    case Side.South:
      return Side.North;
    case Side.West:
      return Side.East;
  }
}
