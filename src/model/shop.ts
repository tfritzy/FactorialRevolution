import { SpriteType } from "../../frontend/pixi/spritesheet";
import { select3Random } from "../helpers/random";
import { ItemType } from "../item/item-type";
import { Game } from "./game";
import { builderOptions } from "./shops/builders-guild";
import { getDamageCores } from "./shops/cores";
import { rollRelics } from "./shops/relics";
import { researchOptions } from "./shops/research";

export type Shop = {
  name: string;
  description: string;
  icon: ItemType;
  rollOptions: () => ShopOption[];
};

export type ShopOption = {
  name: string;
  description: string;
  price: number;
  icon: SpriteType;
  onPurchase: (game: Game) => void;
};

const shops: Shop[] = [
  {
    // 3 random cores
    name: "Damage Cores",
    description: "Sells cores that improve offensive capabilities.",
    icon: ItemType.Knife,
    rollOptions: getDamageCores,
  },
  {
    // 3 random cores.
    name: "Resource Cores",
    description: "Sells cores that improve resource collection and refinement.",
    icon: ItemType.Berries,
    rollOptions: getDamageCores,
  },
  {
    // repair, max health, auto attack dmg
    name: "Builder's Guild",
    description: "Upgrade or repair your town",
    icon: ItemType.Saw,
    rollOptions: () => builderOptions,
  },
  {
    // 3 random relics
    name: "Relic Collector",
    description: "Sells powerful relics that apply global effects",
    icon: ItemType.CopperBar,
    rollOptions: rollRelics,
  },
  {
    name: "Science Guild",
    description: "Research new technologies",
    icon: ItemType.Anvil,
    rollOptions: () => select3Random(researchOptions),
  },
];

export function openShops(game: Game) {
  game.shopDetails = { shopOptions: select3Random(shops) };
  game.paused = true;
  game.onShopOpen?.();
}

export function selectShop(game: Game, index: number) {
  if (game.shopDetails) {
    game.shopDetails.selectedShop = game.shopDetails?.shopOptions[index];
    console.log("Selected shop", game.shopDetails.selectedShop);
    game.shopDetails.options = game.shopDetails.selectedShop.rollOptions();
    game.onShopChosen?.();
  }
}

export function purchaseShopOption(game: Game, option: ShopOption) {
  if (game.gold >= option.price) {
    game.gold -= option.price;
    option.onPurchase(game);
  }
}
