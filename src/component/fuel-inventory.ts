import { Item } from "../item/item";
import { ComponentType } from "./component-type";
import { Inventory } from "./inventory";

export class FuelInventory extends Inventory {
  constructor(width: number, height: number) {
    super(width, height, ComponentType.FuelInventory);
  }

  override onAddToGrid(): void {
    this.generalFilter = (item: Item) => item.energy_kwh === undefined;
  }
}
