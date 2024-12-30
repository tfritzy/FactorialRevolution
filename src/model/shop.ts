import { SpriteType } from "../../frontend/pixi/spritesheet";
import { select3Random } from "../helpers/random";
import { Item } from "../item/item";
import { ItemType, ItemTypes } from "../item/item-type";
import { Game } from "./game";
import { builderOptions } from "./shops/builders-guild";
import { getDamageCores } from "./shops/cores";
import { rollRelics } from "./shops/relics";
import { researchOptions } from "./shops/research";

export type Shop = {
  name: string;
  description: string;
  icon: SpriteType;
  rollItems: () => ShopOption[];
  items?: ShopOption[];
};

export type ShopResearch = {
  type: "research";
  name: string;
  description: string;
  icon: SpriteType;
};

export type ShopItem = {
  type: "item";
  item: Item;
};

export type ShopOption = {
  item: ShopItem | ShopResearch;
  price: number;
  onPurchase: (game: Game) => void;
};

const shops: Shop[] = [
  {
    // 3 random cores
    name: "Damage Cores",
    description: "Sells cores that improve offensive capabilities.",
    icon: ItemTypes.Knife,
    rollItems: getDamageCores,
  },
  {
    // 3 random cores.
    name: "Resource Cores",
    description: "Sells cores that improve resource collection and refinement.",
    icon: ItemTypes.Berries,
    rollItems: getDamageCores,
  },
  {
    // repair, max health, auto attack dmg
    name: "Builder's Guild",
    description: "Upgrade or repair your town",
    icon: ItemTypes.Saw,
    rollItems: () => builderOptions,
  },
  {
    // 3 random relics
    name: "Relic Collector",
    description: "Sells powerful relics that apply global effects",
    icon: ItemTypes.CopperBar,
    rollItems: rollRelics,
  },
  {
    name: "Science Guild",
    description: "Research new technologies",
    icon: ItemTypes.Anvil,
    rollItems: () => select3Random(researchOptions),
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
    game.shopDetails.selectedShop.items =
      game.shopDetails.selectedShop.rollItems();
    game.onShopChosen?.();
  }
}

export function purchaseShopOption(game: Game, option: ShopOption) {
  if (game.gold >= option.price) {
    game.gold -= option.price;
    option.onPurchase(game);
  }
}
