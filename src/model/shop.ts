import { select3Random } from "../helpers/random";
import { ItemType } from "../item/item-type";
import { Game } from "./game";

export type Shop = {
  name: string;
  description: string;
  icon: ItemType;
};

const shops: Shop[] = [
  {
    // 3 random cores
    name: "Damage Cores",
    description: "Sells cores that improve offensive capabilities.",
    icon: ItemType.Knife,
  },
  {
    // 3 random cores.
    name: "Resource Cores",
    description: "Sells cores that improve resource collection and refinement.",
    icon: ItemType.Berries,
  },
  {
    // repair, max health, auto attack dmg
    name: "Builder's Guild",
    description: "Upgrade or repair your town",
    icon: ItemType.Saw,
  },
  {
    // 3 random relics
    name: "Relic Collector",
    description: "Sells powerful relics that apply global effects",
    icon: ItemType.CopperBar,
  },
  {
    // ballistic missiles, 10% boost in harvest rates, +1 damage from arrows, ect..
    // most research has levels. eg can keep researching arrow damage and it's exponential
    // takes n rounds before applied.
    name: "Science Guild",
    description: "Research new technologies",
    icon: ItemType.Anvil,
  },
];

export function openShops(game: Game) {
  game.shopOptions = select3Random(shops);
  game.paused = true;
  game.onShopOpen?.();
}
