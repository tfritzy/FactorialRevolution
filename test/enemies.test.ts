import { expect, test, describe } from "bun:test";
import { rotateSide, Side } from "../src/model/side";
import { EnemyTypes } from "../src/model/entity-type";
import { getEnemyForType } from "../src/model/enemies";
import { V2 } from "../src/numerics/v2";

describe("Enemies", () => {
  test("can build each type of enemy", () => {
    Object.values(EnemyTypes).forEach((type) => {
      expect(getEnemyForType(type, V2.zero(), 10).type).toBe(type);
    });
  });
});
