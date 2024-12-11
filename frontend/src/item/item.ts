import { generateId } from "../op/id-generator";
import { itemProps } from "./item-props";
import { ItemType } from "./item-type";

export class Item {
  public id: string;
  public type: ItemType;
  public maxStack: number;
  public quantity: number;
  public width: number;

  constructor(type: ItemType, quantity: number = 1) {
    this.type = type;
    this.id = generateId(type.toString());
    this.maxStack = itemProps[this.type].maxStack;
    this.width = itemProps[this.type].width;
    this.quantity = quantity;
  }
}
