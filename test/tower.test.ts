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
        explosionRadius: 1.1,
        explosionDamage: 7,
        projectileConfig: {
          speed: 1,
          maxHits: 2,
          radius: 0.1,
          posVariance: 0,
          scale: 1,
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

    // . . . 2 .
    // T . 1 3 .
    // . . . 4 .

    const tower = slinger!.tower()!;
    slinger.ammo()!.add(new Item(ItemTypes.Stone));
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
    expect(projectile.hits).toEqual([g1.id, g3.id]);
    expect(game.projectiles.has(projectile.id)).toBe(false);

    // g1: 1 direct hit, 2 explosions
    // g2 1 explosion
    // g3: 1 direct hit, 2 explosions
    // g4: 1 explosion
    expect(g1.health()!.maxHealth - g1.health()!.health).toBe(15 + 7 + 7);
    expect(g2.health()!.maxHealth - g2.health()!.health).toBe(7);
    expect(g3.health()!.maxHealth - g3.health()!.health).toBe(15 + 7 + 7);
    expect(g4.health()!.maxHealth - g4.health()!.health).toBe(7);
  });
});
