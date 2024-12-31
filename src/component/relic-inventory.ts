import { ComponentType } from "./component-type";
import { Inventory } from "./inventory";

export class RelicInventory extends Inventory {
  constructor(width: number, height: number) {
    super(width, height, ComponentType.RelicInventory);
  }
}
