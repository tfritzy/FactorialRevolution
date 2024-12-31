import { init2dArray } from "../helpers/init-2d-array";
import { ComponentType } from "./component-type";
import { Inventory } from "./inventory";

export class AmmoInventory extends Inventory {
  constructor(width: number, height: number) {
    super(width, height, ComponentType.AmmoInventory);
    this.itemRestrictions = init2dArray(this.width, this.height);
  }

  override onAddToGrid(): void {
    const tower = this.owner?.tower();
    if (tower) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          this.itemRestrictions[y][x] = tower.ammoType;
        }
      }
    }
  }
}
