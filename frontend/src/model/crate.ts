import { ComponentType } from "../component/component-type";
import { Harvester } from "../component/harvester";
import { Inventory } from "../component/inventory";
import { ItemType } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { EntityType } from "./EntityType";

export class Crate extends Building {
  constructor(pos: V2) {
    super(EntityType.Crate, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inventory, new Inventory(3, 3));
  }
}
