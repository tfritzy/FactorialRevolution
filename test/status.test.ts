import { test, describe, expect } from "bun:test";
import { Goblin } from "../src/model/enemies";
import { V2 } from "../src/numerics/v2";
import { PoisonStatus } from "../src/status/poison-status";
import { Status } from "../src/status/status";
import { Game } from "../src/model/game";
import { BurningStatus } from "../src/status/burning-status";
import { FrozenStatus } from "../src/status/frozen-status";
import { BleedingStatus } from "../src/status/bleeding-status";

describe("Status", () => {
  test("poison status deals damage", () => {
    const game = new Game(0, 0);
    const goblin = new Goblin(new V2(1, 0), 100);
    game.addEntity(goblin);
    goblin.addStatus(new PoisonStatus(10));
    const health = goblin.health()!;

    goblin.tick(0);
    expect(health.health).toBe(health.maxHealth);
    goblin.tick(Status.TICK_RATE - 0.1);
    expect(health.health).toBe(health.maxHealth);
    goblin.tick(Status.TICK_RATE + 0.2);
    expect(health.health).toBe(health.maxHealth - 10);
    goblin.addStatus(new PoisonStatus(5));
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 25);
  });

  test("burning status ends", () => {
    const game = new Game(0, 0);
    const goblin = new Goblin(new V2(1, 0), 100);
    game.addEntity(goblin);
    const health = goblin.health()!;

    goblin.addStatus(new BurningStatus(4));
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3 - 2);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3 - 2 - 1);
    expect(goblin.statuses.get("burning")).toBeUndefined();
  });

  test("burning status ends", () => {
    const game = new Game(0, 0);
    const goblin = new Goblin(new V2(1, 0), 100);
    game.addEntity(goblin);
    const health = goblin.health()!;

    goblin.addStatus(new BurningStatus(4));
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3 - 2);
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 4 - 3 - 2 - 1);
    expect(goblin.statuses.get("burning")).toBeUndefined();
  });

  test("frozen status freezes movement", () => {
    const game = new Game(0, 0);
    const goblin = new Goblin(new V2(1, 0), 100);
    game.addEntity(goblin);
    const walker = goblin.walker()!;

    // Initially not frozen
    expect(walker.frozen).toBe(false);

    // Add frozen status for 2 ticks
    goblin.addStatus(new FrozenStatus(2));

    // Should be frozen immediately
    expect(walker.frozen).toBe(true);

    // Still frozen after first tick
    goblin.tick(Status.TICK_RATE);
    expect(walker.frozen).toBe(true);

    // Still frozen after second tick
    goblin.tick(Status.TICK_RATE);
    expect(walker.frozen).toBe(true);

    // Unfrozen after duration expires
    goblin.tick(Status.TICK_RATE);
    expect(walker.frozen).toBe(false);
    expect(goblin.statuses.get("frozen")).toBeUndefined();

    // Test stacking durations
    goblin.addStatus(new FrozenStatus(2));
    goblin.tick(Status.TICK_RATE);
    goblin.addStatus(new FrozenStatus(2)); // Should add 2 more ticks
    expect(walker.frozen).toBe(true);

    // Still frozen after original duration would have expired
    goblin.tick(Status.TICK_RATE);
    goblin.tick(Status.TICK_RATE);
    goblin.tick(Status.TICK_RATE);
    expect(walker.frozen).toBe(true);

    // Finally unfrozen after stacked duration expires
    goblin.tick(Status.TICK_RATE);
    expect(walker.frozen).toBe(false);
    expect(goblin.statuses.get("frozen")).toBeUndefined();
  });
  test("bleeding status deals damage and expires", () => {
    const game = new Game(0, 0);
    const goblin = new Goblin(new V2(1, 0), 100);
    game.addEntity(goblin);
    const health = goblin.health()!;

    // Initial bleeding with 5 damage per tick
    goblin.addStatus(new BleedingStatus(5));
    expect(health.health).toBe(health.maxHealth);

    // After first tick, should take 5 damage
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 5);

    // Add 3 more stacks - should now do 8 damage per tick
    goblin.addStatus(new BleedingStatus(3));
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(health.maxHealth - 5 - 8);

    // Status should persist for REMOVE_AFTER_TICKS total ticks
    for (let i = 0; i < BleedingStatus.REMOVE_AFTER_TICKS - 2; i++) {
      goblin.tick(Status.TICK_RATE);
      expect(goblin.statuses.get("bleeding")).toBeDefined();
    }
    expect(health.health).toBe(
      health.maxHealth - 5 - 8 * (BleedingStatus.REMOVE_AFTER_TICKS - 1)
    );

    // On final tick, status should be removed
    goblin.tick(Status.TICK_RATE);
    expect(goblin.statuses.get("bleeding")).toBeUndefined();

    // Adding new stacks should reset removal countdown
    const previousHealth = health.health;
    goblin.addStatus(new BleedingStatus(4));
    goblin.tick(Status.TICK_RATE);
    expect(health.health).toBe(previousHealth - 4);

    // Add more stacks mid-countdown
    for (
      let i = 0;
      i < Math.floor(BleedingStatus.REMOVE_AFTER_TICKS / 2);
      i++
    ) {
      goblin.tick(Status.TICK_RATE);
    }
    goblin.addStatus(new BleedingStatus(3)); // Should reset countdown and add stacks
    expect(goblin.statuses.get("bleeding")?.stacks).toBe(7);

    // Should continue for full REMOVE_AFTER_TICKS from reset
    for (let i = 0; i < BleedingStatus.REMOVE_AFTER_TICKS - 1; i++) {
      goblin.tick(Status.TICK_RATE);
      expect(goblin.statuses.get("bleeding")).toBeDefined();
    }
    goblin.tick(Status.TICK_RATE);
    expect(goblin.statuses.get("bleeding")).toBeUndefined();
  });
});
