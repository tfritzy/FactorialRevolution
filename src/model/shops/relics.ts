import { select3Random } from "../../helpers/random";
import { Item } from "../../item/item";
import { ItemType } from "../../item/item-type";
import { Game } from "../game";
import { ShopOption } from "../shop";

const relics: ItemType[] = [
  ItemType.SpikedClub,
  ItemType.RifleScope,
  ItemType.CrowsNest,
  ItemType.LlamaHoof,
];

export function rollRelics(): ShopOption[] {
  const relicTypes = select3Random(relics);
  return relicTypes.map((relicType) => {
    const relic = new Item(relicType);
    return {
      name: relic.id,
      description: relic.id,
      onPurchase: (game: Game) => game.inventory.add(relic),
      price: 25,
      icon: relicType,
    };
  });
}
