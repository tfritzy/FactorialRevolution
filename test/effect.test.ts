import { test, describe, expect } from "bun:test";
import { Game } from "../src/model/game";
import { ItemTypes } from "../src/item/item-type";
import { Item } from "../src/item/item";
import { Core } from "../src/item/core";
import {
  flatDamageEffect,
  percentDamageEffect,
  rangeEffect,
} from "../src/item/effect";
import { buildBuilding } from "../src/op/build-building";
import { V2 } from "../src/numerics/v2";
import { Slinger } from "../src/model/buildings";
import { initPortals } from "../src/op/build-portal";

describe("Effect", () => {
  test("applies effects", () => {
    const game = new Game(10, 10);
    initPortals(game);
    const s1 = buildBuilding(game, new Slinger(new V2(0, 0))).tower()!;
    const s2 = buildBuilding(game, new Slinger(new V2(0, 1))).tower()!;

    const relic = new Item(ItemTypes.SpikedClub);
    const core = new Core("common");
    core.effects = [flatDamageEffect(10), rangeEffect(2)];
    relic.effects = [flatDamageEffect(3), percentDamageEffect(10)];

    expect(s1.getDamage()).toBe(s1.baseDamage);
    expect(s1.getRangeSq()).toBe(s1.baseRange * s1.baseRange);
    expect(s1.getPercentDamageBonus()).toBe(0);
    s1.owner?.inventory()?.add(core);
    expect(s1.getDamage()).toBe(s1.baseDamage + 10);
    expect(s1.getRangeSq()).toBe((s1.baseRange + 2) * (s1.baseRange + 2));
    expect(s1.getPercentDamageBonus()).toBe(0);

    game.town?.relics()?.add(relic);
    expect(s1.getDamage()).toBe(s1.baseDamage + 10 + 3);
    expect(s1.getRangeSq()).toBe((s1.baseRange + 2) * (s1.baseRange + 2));
    expect(s1.getPercentDamageBonus()).toBe(10);

    expect(s2.getDamage()).toBe(s2.baseDamage + 3);
    expect(s2.getRangeSq()).toBe(s2.baseRange * s2.baseRange);
    expect(s2.getPercentDamageBonus()).toBe(10);

    s1.owner?.inventory()?.removeAt(0, 0);
    expect(s1.getDamage()).toBe(s1.baseDamage + 3);
    expect(s1.getRangeSq()).toBe(s1.baseRange * s1.baseRange);
    expect(s1.getPercentDamageBonus()).toBe(10);

    game.town?.relics()?.removeAt(0, 0);
    expect(s1.getDamage()).toBe(s1.baseDamage);
    expect(s1.getRangeSq()).toBe(s1.baseRange * s1.baseRange);
    expect(s1.getPercentDamageBonus()).toBe(0);

    expect(s2.getDamage()).toBe(s2.baseDamage);
    expect(s2.getRangeSq()).toBe(s2.baseRange * s2.baseRange);
    expect(s2.getPercentDamageBonus()).toBe(0);
  });
});
