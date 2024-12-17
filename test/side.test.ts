import { expect, test, describe } from "bun:test";
import { rotateSide, Side } from "../src/model/side";

describe("Side", () => {
  test("rotates correctly", () => {
    expect(rotateSide(Side.North, 1)).toBe(Side.East);
    expect(rotateSide(Side.North, 2)).toBe(Side.South);
    expect(rotateSide(Side.North, 3)).toBe(Side.West);
    expect(rotateSide(Side.North, 4)).toBe(Side.North);

    expect(rotateSide(Side.North, -1)).toBe(Side.West);
    expect(rotateSide(Side.North, -2)).toBe(Side.South);
    expect(rotateSide(Side.North, -3)).toBe(Side.East);
    expect(rotateSide(Side.North, -4)).toBe(Side.North);
  });
});
