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
      return "white";
    default:
      return "";
  }
}

export function getRarityBgColor(rarity: Rarity) {
  switch (rarity) {
    case "legendary":
      return "#7f1d1d";
    case "rare":
      return "#facc15";
    case "magic":
      return "#064e3b";
    case "common":
      return "#0f172a";
    default:
      return "";
  }
}
