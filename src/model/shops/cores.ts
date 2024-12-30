import { Core } from "../../item/core";
import { ItemType } from "../../item/item-type";
import { rollRarity } from "../../item/rarity";
import { Game } from "../game";
import { ShopOption } from "../shop";

export function getDamageCores(): ShopOption[] {
  const cores = [
    new Core(rollRarity()),
    new Core(rollRarity()),
    new Core(rollRarity()),
  ];

  return cores.map((core) => ({
    name: core.name,
    description: core.name,
    price: 10,
    onPurchase: (game: Game) => game.inventory.add(core),
    icon: ItemType.Core,
  }));
}
