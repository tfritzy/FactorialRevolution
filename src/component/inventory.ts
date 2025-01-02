import { init2dArray } from "../helpers/init-2d-array";
import { Item, ItemCategory } from "../item/item";
import { ItemType } from "../item/item-type";
import { Recipe } from "../model/crafting-recipes";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Inventory extends Component {
  public width: number;
  public height: number;
  items: (Item | undefined)[][];
  itemRestrictions: (ItemType | undefined)[][];
  public version: number;
  public generalFilter: ((item: Item) => boolean) | undefined;

  constructor(
    width: number,
    height: number,
    type: ComponentType = ComponentType.Inventory
  ) {
    super(type);
    this.width = width;
    this.height = height;
    this.items = init2dArray<Item>(width, height);
    this.itemRestrictions = init2dArray<ItemType>(width, height);
    this.version = 0;
  }

  removeAt(
    y: number,
    x: number,
    count: number | undefined = undefined
  ): Item | undefined {
    this.version++;

    let item = this.items[y][x];

    if (item && count !== undefined && item.quantity > count) {
      item.quantity -= count;
      item = new Item(item.type, count, item.rarity);
    } else {
      this.items[y][x] = undefined;
    }

    this.maybeRecalculateStatsFor(item);
    return item;
  }

  addAt(item: Item, y: number, x: number): boolean {
    if (this.generalFilter && !this.generalFilter(item)) {
      return false;
    }

    if (
      this.itemRestrictions[y][x] &&
      this.itemRestrictions[y][x] !== item.type
    ) {
      return false;
    }

    this.version++;

    if (this.items[y][x] === undefined) {
      this.items[y][x] = item;
      this.maybeRecalculateStatsFor(item);
      return true;
    }

    const existingItem = this.items[y][x];
    if (existingItem.type === item.type) {
      const addable = existingItem.maxStack - existingItem.quantity;
      const toBeAdded = Math.min(addable, item.quantity);
      item.quantity -= toBeAdded;
      existingItem.quantity += toBeAdded;
    }

    this.maybeRecalculateStatsFor(item);
    return item.quantity === 0;
  }

  add(item: Item): boolean {
    this.version++;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const slot = this.items[y][x];
        if (
          slot !== undefined &&
          slot.type === item.type &&
          slot.quantity < slot.maxStack
        ) {
          if (this.addAt(item, y, x)) {
            return true;
          }
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.addAt(item, y, x)) {
          return true;
        }
      }
    }

    return false;
  }

  get(y: number, x: number): Item | undefined {
    return this.items[y][x];
  }

  firstItem(): Item | undefined {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] !== undefined) {
          return this.items[y][x];
        }
      }
    }

    return undefined;
  }

  withdrawFirstItem(
    maxQuantity: number | undefined = undefined
  ): Item | undefined {
    this.version++;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] !== undefined) {
          return this.removeAt(y, x, maxQuantity);
        }
      }
    }

    return undefined;
  }

  getAt(y: number, x: number): Item | undefined {
    return this.items[y][x];
  }

  count(type: ItemType): number {
    let count = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x]?.type === type) {
          count += this.items[y][x]?.quantity || 0;
        }
      }
    }

    return count;
  }

  removeOneByCategory(category: ItemCategory): Item | undefined {
    this.version++;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x]?.category === category) {
          return this.removeAt(y, x, 1)!;
        }
      }
    }

    return undefined;
  }

  removeCount(type: ItemType, count: number): boolean {
    this.version++;

    let remaining = count;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x]?.type === type) {
          const removed = this.removeAt(y, x, count)!;
          remaining -= removed.quantity;

          if (remaining === 0) {
            return true;
          }
        }
      }
    }

    return false;
  }

  transfer(to: Inventory, y: number, x: number): boolean {
    this.version++;

    const item = this.items[y][x];
    if (item) {
      if (to.add(item)) {
        this.removeAt(y, x);
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  isEmpty(): boolean {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] !== undefined) {
          return false;
        }
      }
    }

    return true;
  }

  canAddItem(item: Item): boolean {
    if (this.generalFilter && !this.generalFilter(item)) {
      return false;
    }

    let depositable = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          this.items[y][x] === undefined &&
          (!this.itemRestrictions[y][x] ||
            this.itemRestrictions[y][x] === item.type)
        ) {
          return true;
        }

        const iterItem = this.items[y][x];
        if (iterItem?.type === item.type) {
          depositable += iterItem.maxStack - iterItem.quantity;
          if (depositable >= item.quantity) {
            return true;
          }
        }
      }
    }

    return false;
  }

  setRestrictionsForRecipe(recipe: Recipe) {
    this.itemRestrictions = init2dArray<ItemType>(this.width, this.height);

    // This is a pretty weird case to handle with multiple ways to craft something.
    // Eg human can be crafted from any type of food. Would be silly to reserve spot for berries.
    // Better just to not have any restrictions.
    if (recipe.ingredients.length !== 1) {
      return;
    }

    let y: number = 0;
    let x: number = 0;
    for (const ingredient of recipe.ingredients[0].keys()) {
      this.itemRestrictions[y][x] = ingredient;

      x += 1;
      if (x >= this.width) {
        x = 0;
        y += 1;
        if (y >= this.height) {
          return;
        }
      }
    }
  }

  maybeRecalculateStatsFor(item: Item | undefined) {
    if (item?.effects?.length && this.owner) {
      this.owner.recalculateStats();
    }
  }
}
