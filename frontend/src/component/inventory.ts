import { Item } from "../item/item";
import { ItemType } from "../item/item-type";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Inventory extends Component {
  public width: number;
  public height: number;
  items: (Item | undefined)[][];

  constructor(width: number, height: number) {
    super(ComponentType.Inventory);
    this.width = width;
    this.height = height;
    this.items = this.initItems(width, height);
  }

  initItems(width: number, height: number): (Item | undefined)[][] {
    const items: (Item | undefined)[][] = [];
    for (let y = 0; y < height; y++) {
      items[y] = [];
      items[y][width - 1] = undefined;
    }

    return items;
  }

  addAt(item: Item, y: number, x: number): boolean {
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
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const slot = this.items[y][x];
        if (
          slot === undefined ||
          (slot.type === item.type && slot.quantity < slot.maxStack)
        ) {
          const allAdded = this.addAt(item, y, x);
          if (allAdded) {
            return true;
          }
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

  withdrawFirstItem(): Item | undefined {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.items[y][x] !== undefined) {
          const item = this.items[y][x];
          this.items[y][x] = undefined;
          return item;
        }
      }
    }

    return undefined;
  }

  count(type: ItemType) {
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

  isEmpty() {
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
}
