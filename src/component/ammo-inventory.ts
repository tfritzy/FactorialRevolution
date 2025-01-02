import { Item } from "../item/item";
import { ComponentType } from "./component-type";
import { Inventory } from "./inventory";

export class AmmoInventory extends Inventory {
  constructor(width: number, height: number) {
    super(width, height, ComponentType.AmmoInventory);
  }

  override onAddToGrid(): void {
    const tower = this.owner?.tower();

    if (tower) {
      this.generalFilter = (item: Item) => item.category === tower.ammoType;
    }
  }
}
