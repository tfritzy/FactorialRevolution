export enum Side {
  North,
  East,
  South,
  West,
}

export function rotateSide(side: Side, steps: number): Side {
  return ((side + steps + 4) % 4) as Side;
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
