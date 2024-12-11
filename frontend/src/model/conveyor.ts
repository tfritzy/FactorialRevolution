import { ComponentType } from "../component/component-type";
import { ConveyorComponent } from "../component/conveyor-component";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { EntityType } from "./EntityType";

export class Conveyor extends Building {
  constructor(pos: V2) {
    super(EntityType.Conveyor, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Conveyor, new ConveyorComponent());
  }
}
