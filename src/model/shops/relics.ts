import { select3Random } from "../../helpers/random";
import { Item } from "../../item/item";
import { ItemType, ItemTypes } from "../../item/item-type";
import { rollRarity } from "../../item/rarity";
import { Game } from "../game";
import { ShopOption } from "../shop";

const relics: ItemType[] = [
  ItemTypes.SpikedClub,
  ItemTypes.RifleScope,
  ItemTypes.CrowsNest,
  ItemTypes.LlamaHoof,
];

export function rollRelics(): ShopOption[] {
  const relicTypes = select3Random(relics);
  return relicTypes.map((relicType) => {
    const rarity = rollRarity();
    const relic = new Item(relicType, 1, rarity);
    return {
      item: {
        item: relic,
        type: "item",
      },
      onPurchase: (game: Game) => game.inventory.add(relic),
      price: 25,
    };
  });
}
