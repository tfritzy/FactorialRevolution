import { randomBetween, selectNRandom } from "../helpers/random";
import { coreNameGenerator } from "./core-name-generator";
import {
  Effect,
  flatDamageEffect,
  percentDamageEffect,
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
];
