import { ComponentType } from "../component/component-type";
import { Inventory } from "../component/inventory";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { EntityTypes } from "./entity-type";

export class Crate extends Building {
  constructor(pos: V2) {
    super(EntityTypes.Crate, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 3));
  }
}
