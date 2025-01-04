import { describe, expect, test } from "bun:test";
import { Game } from "../src/model/game";
import { buildBuilding } from "../src/op/build-building";
import { Slinger } from "../src/model/buildings";
import { V2 } from "../src/numerics/v2";
import { getBuilding } from "../src/op/get-building";
import { Goblin } from "../src/model/enemies";
import { ItemTypes } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { ComponentType } from "../src/component/component-type";
import { Tower } from "../src/component/tower";
import { Building } from "../src/model/building";
import { BuildingTypes } from "../src/model/entity-type";
import { AmmoInventory } from "../src/component/ammo-inventory";
import { Inventory } from "../src/component/inventory";

export class TestTower extends Building {
  constructor(pos: V2) {
    super(BuildingTypes.Slinger, pos, 1, 1);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(1, 1));
    this.components.set(ComponentType.AmmoInventory, new AmmoInventory(1, 1));
    this.components.set(
      ComponentType.Tower,
      new Tower({
        ammoType: ItemTypes.Stone,
        baseCooldown: 2,
        baseDamage: 15,
        baseRange: 5,
        explosionRadius: 3,
        multishotCount: 2,
        projectileConfig: {
          speed: 1,
          pierceCount: 2,
          radius: 0.1,
        },
      })
    );
  }
}

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

  test("Shoots simple projectile", () => {
    const game = new Game(5, 3);
    const slinger = new TestTower(new V2(0, 1));
    buildBuilding(game, slinger);

    // . . . G .
    // T . G G .
    // . . . G .

    const tower = slinger!.tower()!;
    slinger.inventory()!.add(new Item(ItemTypes.Stone));
    const g1 = game.addEntity(new Goblin(new V2(2, 1), 1000));
    tower.tick(0);
    const g2 = game.addEntity(new Goblin(new V2(3, 0), 1000));
    const g3 = game.addEntity(new Goblin(new V2(3, 1), 1000));
    const g4 = game.addEntity(new Goblin(new V2(3, 2), 1000));

    expect(game.projectiles.size).toBe(0);
    tower.tick(2);
    expect(game.projectiles.size).toBe(1);
    const projectile = Array.from(game.projectiles.values())[0];

    game.tick(1.89999);
    expect(projectile.hits.length).toBe(0);
    game.tick(0.00002);
    expect(projectile.hits).toEqual([g1.id]);
    expect(game.projectiles.has(projectile.id)).toBe(true);

    game.tick(0.00002);
    expect(projectile.hits).toEqual([g1.id]);
    expect(game.projectiles.has(projectile.id)).toBe(true);

    game.tick(1);
    expect(projectile.hits.length).toBe(2);
    expect(projectile.hits).toEqual([g1.id, g2.id]);
    expect(game.projectiles.has(projectile.id)).toBe(false);

    expect(tower.target).toBeNull();
  });
});
