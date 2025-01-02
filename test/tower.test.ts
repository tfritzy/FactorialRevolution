import { describe, expect, test } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { Slinger } from "../src/model/buildings";
import { V2 } from "../src/numerics/v2";
import { getBuilding } from "../src/op/get-building";
import { Goblin } from "../src/model/enemies";
import { ItemTypes } from "../src/item/item-type";
import { Item } from "../src/item/item";

describe("Tower", () => {
  test("acquires targets", () => {
    const game = new Game(100, 1);
    buildBuilding(game, new Slinger(new V2(0, 0)));
    const slinger = getBuilding(game, 0, 0)!;
    const tower = slinger.tower()!;
    expect(tower.target).toBeNull();

    const goblin = new Goblin(new V2(tower.baseRange - 1, 0), 100);
    game.addEntity(goblin);
    expect(tower.target).toBeNull();
    tower.tick(0);
    expect(tower.target).toBe(goblin.id);
  });

  test("removes target when they move out of range", () => {
    const game = new Game(100, 1);
    buildBuilding(game, new Slinger(new V2(0, 0)));
    const tower = getBuilding(game, 0, 0)!.tower()!;

    const goblin = new Goblin(new V2(tower.baseRange - 1, 0), 100);
    game.addEntity(goblin);
    tower.tick(0);
    expect(tower.target).toBe(goblin.id);

    goblin.pos.x += 2;
    tower.tick(tower.getCooldown() + 0.01);
    expect(tower.target).toBeNull();
  });

  test("actually fires", () => {
    const game = new Game(100, 1);
    buildBuilding(game, new Slinger(new V2(0, 0)));
    const tower = getBuilding(game, 0, 0)!.tower()!;

    const goblin = new Goblin(new V2(tower.baseRange - 1, 0), 100);
    game.addEntity(goblin);
    tower.tick(0);
    expect(tower.target).toBe(goblin.id);
    expect(goblin.health()!.health).toBe(goblin.health()!.maxHealth);

    tower.tick(tower.getCooldown() + 0.01);
    expect(goblin.health()!.health).toBe(goblin.health()!.maxHealth);

    tower.owner?.ammo()?.add(new Item(ItemTypes.Stone));
    expect(tower.owner!.ammo()?.count(ItemTypes.Stone)).toBe(1);
    tower.tick(tower.getCooldown() + 0.01);
    expect(goblin.health()!.health).toBe(
      goblin.health()!.maxHealth - tower.getDamage()
    );
    expect(tower.owner!.inventory()?.count(ItemTypes.Stone)).toBe(0);
  });

  test("removes target when enemy dies", () => {
    const game = new Game(100, 1);
    buildBuilding(game, new Slinger(new V2(0, 0)));
    const tower = getBuilding(game, 0, 0)!.tower()!;

    const goblin = new Goblin(new V2(tower.baseRange - 1, 0), 1);
    game.addEntity(goblin);
    tower.tick(0);

    goblin.health()!.takeDamage(1000);
    tower.tick(tower.getCooldown() + 0.01);

    expect(tower.target).toBeNull();
  });
});
