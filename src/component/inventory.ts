import { init2dArray } from "../helpers/init-2d-array";
import { Item } from "../item/item";
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

  constructor(width: number, height: number) {
    super(ComponentType.Inventory);
    this.width = width;
    this.height = height;
    this.items = init2dArray<Item>(width, height);
    this.itemRestrictions = init2dArray<ItemType>(width, height);
    this.version = 0;
  }

  removeAt(y: number, x: number): Item | undefined {
    this.version++;
    const item = this.items[y][x];
    this.items[y][x] = undefined;
    return item;
  }

  addAt(item: Item, y: number, x: number): boolean {
    this.version++;

    if (this.items[y][x] === undefined) {
      this.items[y][x] = item;
      return true;
    }

    const existingItem = this.items[y][x];
    if (existingItem.type === item.type) {
      const addable = existingItem.maxStack - existingItem.quantity;
      const toBeAdded = Math.min(addable, item.quantity);
      item.quantity -= toBeAdded;
      existingItem.quantity += toBeAdded;
    }

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
          const allAdded = this.addAt(item, y, x);
          if (allAdded) {
            return true;
          }
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const slot = this.items[y][x];
        if (slot === undefined) {
          this.items[y][x] = item;
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

  withdrawFirstItem(maxQuantity: number = 1000): Item | undefined {
    this.version++;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] !== undefined) {
          const item = this.items[y][x]!;

          if (item.quantity > maxQuantity) {
            const newItem = new Item(item.type, maxQuantity);
            item.quantity -= maxQuantity;
            return newItem;
          } else {
            this.items[y][x] = undefined;
            return item;
          }
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

  removeCount(type: ItemType, count: number) {
    this.version++;

    let remaining = count;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x]?.type === type) {
          const item = this.items[y][x]!;
          const toRemove = Math.min(remaining, item.quantity);
          item.quantity -= toRemove;
          remaining -= toRemove;
          if (item.quantity === 0) {
            this.items[y][x] = undefined;
          }
          if (remaining === 0) {
            return;
          }
        }
      }
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
    let depositable = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] === undefined) {
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

    let y: number = 0;
    let x: number = 0;
    for (const ingredient of recipe.ingredients.keys()) {
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
}
