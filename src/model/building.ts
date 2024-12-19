import { V2 } from "../numerics/v2";
import { Entity } from "./entity";
import { EntityType } from "./EntityType";

export class Building extends Entity {
  public ghost: boolean = false;

  constructor(type: EntityType, pos: V2) {
    super(type, pos);
  }
}
