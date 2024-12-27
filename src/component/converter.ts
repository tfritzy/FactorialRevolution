import { Item } from "../item/item";
import { ItemType } from "../item/item-type";
import { Recipe } from "../model/crafting-recipes";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Converter extends Component {
  public craftable: Recipe[];
  public recipe: Recipe;
  public craftingProgress: number;
  public speed: number;
  public craftEverything: boolean;

  constructor(
    craftable: Recipe[],
    speed: number,
    craftEverything: boolean = false
  ) {
    super(ComponentType.Converter);
    this.craftable = craftable;
    this.recipe = craftable[0];
    this.craftingProgress = 0;
    this.speed = speed;
    this.craftEverything = craftEverything;
  }

  override tick(deltaTime_s: number): void {
    if (this.craftingProgress === 0) {
      if (!this.craftEverything) {
        if (this.completeIngredients(this.recipe)) {
          this.craftingProgress += deltaTime_s;
        }
      } else {
        for (const recipe of this.craftable) {
          if (this.completeIngredients(recipe)) {
            this.craftingProgress += deltaTime_s;
            this.recipe = recipe;
          }
        }
      }
    } else {
      this.craftingProgress += deltaTime_s;
      if (this.craftingProgress > this.craftingTime()) {
        this.craft();
      }
    }
  }

  completeIngredients(recipe: Recipe): Map<ItemType, number> | null {
    if (!this.owner?.inputs()) return null;

    const inputs = this.owner.inputs()!;
    for (const ingredients of recipe.ingredients) {
      if (
        ingredients
          .entries()
          .every(([i, quantity]) => inputs.count(i) >= quantity)
      ) {
        return ingredients;
      }
    }

    return null;
  }

  craftingTime(): number {
    return this.recipe.duration * this.speed;
  }

  craft(): void {
    this.craftingProgress = 0;
    const ingredients = this.completeIngredients(this.recipe);
    if (!this.owner?.inputs() || !ingredients) {
      return;
    }

    for (const i of ingredients.keys()) {
      this.owner.inputs()!.removeCount(i, ingredients.get(i)!);
    }

    this.owner.inventory()!.add(new Item(this.recipe.output));
  }

  selectRecipe(output: ItemType): void {
    const recipe = this.craftable.find((r) => r.output === output);
    if (recipe) {
      this.recipe = recipe;
      this.configureInputs();
      return;
    }

    throw this.owner?.type + " can't craft " + output;
  }

  configureInputs() {
    this.owner?.inputs()?.setRestrictionsForRecipe(this.recipe);
  }
}
