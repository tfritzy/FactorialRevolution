import { ComponentType } from "../component/component-type";
import { InserterComponent } from "../component/inserter-component";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { EntityType } from "./EntityType";

export class Inserter extends Building {
  constructor(pos: V2) {
    super(EntityType.Inserter, pos);
  }

  override initComponents(): void {
    this.components.set(ComponentType.Inserter, new InserterComponent());
  }
}
