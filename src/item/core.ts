import { randomBetween, selectNRandom } from "../helpers/random";
import { coreNameGenerator } from "./core-name-generator";
import {
  bleedEffect,
  burnEffect,
  critHitChanceEffect,
  Effect,
  flatDamageEffect,
  freezeEffect,
  percentAttackSpeed,
  percentDamageEffect,
  poisonEffect,
  rangeEffect,
} from "./effect";
import { Item } from "./item";
import { ItemTypes } from "./item-type";
import { Rarity } from "./rarity";

export class Core extends Item {
  public name: string;

  constructor(rarity: Rarity) {
    super(ItemTypes.Core, 1, rarity);
    this.rarity = rarity;
    this.name = coreNameGenerator(rarity);
    this.effects = selectNRandom(
      towerCoreAttributes,
      attributeCount(rarity)
    ).map((f) => f(rarity));
  }
}

function attributeCount(rarity: Rarity) {
  switch (rarity) {
    case "common":
      return 1;
    case "magic":
      return 1;
    case "rare":
      return 1;
    case "legendary":
      return 2;
  }
}

const towerCoreAttributes: ((rarity: Rarity) => Effect)[] = [
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return flatDamageEffect(randomBetween(1, 3));
      case "magic":
        return flatDamageEffect(randomBetween(2, 4));
      case "rare":
        return flatDamageEffect(randomBetween(3, 5));
      case "legendary":
        return flatDamageEffect(randomBetween(4, 6));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return rangeEffect(randomBetween(0.5, 1.5));
      case "magic":
        return rangeEffect(randomBetween(0.75, 1.75));
      case "rare":
        return rangeEffect(randomBetween(1, 2));
      case "legendary":
        return rangeEffect(randomBetween(1.5, 2.5));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return percentDamageEffect(randomBetween(10, 20));
      case "magic":
        return percentDamageEffect(randomBetween(15, 25));
      case "rare":
        return percentDamageEffect(randomBetween(20, 30));
      case "legendary":
        return percentDamageEffect(randomBetween(25, 35));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return critHitChanceEffect(randomBetween(5, 10));
      case "magic":
        return critHitChanceEffect(randomBetween(8, 15));
      case "rare":
        return critHitChanceEffect(randomBetween(12, 20));
      case "legendary":
        return critHitChanceEffect(randomBetween(15, 25));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return percentAttackSpeed(randomBetween(0.05, 0.1));
      case "magic":
        return percentAttackSpeed(randomBetween(0.07, 0.15));
      case "rare":
        return percentAttackSpeed(randomBetween(0.1, 0.2));
      case "legendary":
        return percentAttackSpeed(randomBetween(0.15, 0.25));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return poisonEffect(randomBetween(1, 2));
      case "magic":
        return poisonEffect(randomBetween(1, 3));
      case "rare":
        return poisonEffect(randomBetween(2, 4));
      case "legendary":
        return poisonEffect(randomBetween(2, 5));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return freezeEffect(randomBetween(1, 2));
      case "magic":
        return freezeEffect(randomBetween(1, 3));
      case "rare":
        return freezeEffect(randomBetween(2, 4));
      case "legendary":
        return freezeEffect(randomBetween(2, 5));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return bleedEffect(randomBetween(2, 5));
      case "magic":
        return bleedEffect(randomBetween(3, 6));
      case "rare":
        return bleedEffect(randomBetween(4, 7));
      case "legendary":
        return bleedEffect(randomBetween(5, 10));
    }
  },
  (rarity: Rarity) => {
    switch (rarity) {
      case "common":
        return burnEffect(randomBetween(1, 4));
      case "magic":
        return burnEffect(randomBetween(2, 6));
      case "rare":
        return burnEffect(randomBetween(3, 8));
      case "legendary":
        return burnEffect(randomBetween(5, 10));
    }
  },
];
