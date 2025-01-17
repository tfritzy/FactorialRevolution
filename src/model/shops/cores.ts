import { randomElement } from "../../helpers/random";
import { Item } from "../../item/item";
import { CoreTypes } from "../../item/item-type";
import { rollRarity } from "../../item/rarity";

const coreTypes = Object.values(CoreTypes);

export function rollCore() {
  const rarity = rollRarity();
  const type = randomElement(coreTypes);
  return new Item(type, 1, rarity);
}
