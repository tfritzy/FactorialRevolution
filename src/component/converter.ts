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

  constructor(craftable: Recipe[], speed: number) {
    super(ComponentType.Converter);
    this.craftable = craftable;
    this.recipe = craftable[0];
    this.craftingProgress = 0;
    this.speed = speed;
  }

  override tick(deltaTime_s: number): void {
    console.log("Tick for", deltaTime_s);
    if (this.craftingProgress === 0) {
      if (this.hasAllIngredients()) {
        console.log("Has all. Start craft");
        this.craftingProgress += deltaTime_s;
      }
    } else {
      this.craftingProgress += deltaTime_s;
      console.log(this.craftingProgress, this.craftingTime());
      if (this.craftingProgress > this.craftingTime()) {
        console.log("Crafting.");
        this.craft();
      }
    }
  }

  hasAllIngredients(): boolean {
    if (!this.owner?.inputs()) return false;

    for (const i of this.recipe.ingredients.keys()) {
      if (this.owner.inputs()!.count(i) < this.recipe.ingredients.get(i)!) {
        console.log("not enough", i);
        return false;
      }
    }

    return true;
  }

  craftingTime(): number {
    return this.recipe.duration * this.speed;
  }

  craft(): void {
    this.craftingProgress = 0;
    if (!this.owner?.inputs() || !this.hasAllIngredients()) {
      return;
    }

    for (const i of this.recipe.ingredients.keys()) {
      this.owner.inputs()!.removeCount(i, this.recipe.ingredients.get(i)!);
    }

    console.log("Adding new item to inventory");
    this.owner.inventory()!.add(new Item(this.recipe.output));
    console.log(this.owner.inventory()!.items);
  }

  selectRecipe(output: ItemType): void {
    const recipe = this.craftable.find((r) => r.output === output);
    if (recipe) {
      this.recipe = recipe;
    }
  }
}
