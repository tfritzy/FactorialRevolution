import { coreNameGenerator } from "./core-name-generator";
import { Item } from "./item";
import { ItemType } from "./item-type";
import { Rarity } from "./rarity";

export class Relic extends Item {
  public rarity: Rarity;
  public name: string;

  constructor(type: ItemType, rarity: Rarity) {
    super(ItemType.Core, 1);
    this.rarity = rarity;
    this.name = coreNameGenerator(rarity);
  }
}
