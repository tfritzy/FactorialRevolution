import { ItemType } from "../../item/item-type";
import { Game } from "../game";
import { ShopOption } from "../shop";

export const builderOptions: ShopOption[] = [
  {
    name: "Repair town",
    description: "Restore 10 HP to your town",
    onPurchase: (game: Game) => {
      if (game.town) {
        game.town.health()!.health = Math.min(
          game.town.health()!.health + 10,
          game.town.health()!.maxHealth
        );
      }
    },
    price: 10,
    icon: ItemType.Board,
  },
  {
    name: "Reinforcement",
    description: "Increase town max health by 5",
    onPurchase: (game: Game) => {
      if (game.town) {
        game.town.health()!.maxHealth += 5;
      }
    },
    price: 20,
    icon: ItemType.Board,
  },
];
