import { EntityType } from "../model/entity-type";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { itemProps } from "./item-props";
import { ItemType } from "./item-type";

export class WorldItem {
  public item: Item;
  public pos: V2;

  constructor(item: Item, pos: V2) {
    this.item = item;
    this.pos = pos;
  }
}

export class Item {
  public id: string;
  public type: ItemType;
  public maxStack: number;
  public quantity: number;
  public width: number;
  public builds: EntityType | undefined;

  constructor(type: ItemType, quantity: number = 1) {
    this.type = type;
    this.id = generateId(type.toString());
    this.maxStack = itemProps[this.type].maxStack;
    this.width = itemProps[this.type].width;
    this.builds = itemProps[this.type].builds;
    this.quantity = Math.min(quantity, this.maxStack);
  }
}
