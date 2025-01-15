import { Rarity } from "../../src/item/rarity";

export function getRarityColor(rarity: Rarity) {
  switch (rarity) {
    case "legendary":
      return "#ff5277";
    case "rare":
      return "#ffee83";
    case "magic":
      return "#92e8c0";
    case "common":
      return "#000000";
    default:
      return "";
  }
}
