import { Item } from "../item/item";
import { ItemType } from "../item/item-type";
import { recipes } from "../model/crafting-recipes";
import { Game } from "../model/game";

export function craftItem(game: Game, item: ItemType) {
  const recipe = recipes[item];
  if (!recipe) return;

  let canCraft = true;
  recipe.ingredients.forEach((amount, ingredient) => {
    if (game.inventory.count(ingredient) < amount) {
      canCraft = false;
    }
  });

  if (canCraft) {
    recipe.ingredients.forEach((amount, ingredient) => {
      game.inventory.removeCount(ingredient, amount);
    });

    game.inventory.add(new Item(item));
  }
}
