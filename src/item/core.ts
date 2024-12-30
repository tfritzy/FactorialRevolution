import { coreNameGenerator } from "./core-name-generator";
import { Item } from "./item";
import { ItemType, ItemTypes } from "./item-type";
import { Rarity } from "./rarity";

export class Core extends Item {
  public name: string;

  constructor(rarity: Rarity) {
    super(ItemTypes.Core, 1, rarity);
    this.rarity = rarity;
    this.name = coreNameGenerator(rarity);
  }
}
