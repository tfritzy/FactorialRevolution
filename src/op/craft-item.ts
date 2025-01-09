import { Item } from "../item/item";
import { ItemType } from "../item/item-type";
import { recipes } from "../model/crafting-recipes";
import { Game } from "../model/game";

export function craftItem(game: Game, item: ItemType) {
  const recipe = recipes[item];
  if (!recipe) return;
  if (!recipe.duration) return;

  let craftableRecipe: Map<ItemType, number> | undefined;
  for (const ingredients of recipe.ingredients) {
    if (
      ingredients
        .entries()
        .every(([item, quantity]) => game.inventory.count(item) >= quantity)
    ) {
      craftableRecipe = ingredients;
    }
  }

  if (craftableRecipe) {
    craftableRecipe.forEach((amount, ingredient) => {
      game.inventory.removeCount(ingredient, amount);
    });

    game.inventory.add(new Item(item, recipe.outputQuantity ?? 1));
  }
}
