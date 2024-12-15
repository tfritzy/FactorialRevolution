import { Entity } from "../model/entity";
import { ComponentType } from "./component-type";

export abstract class Component {
  public type: ComponentType;
  public owner: Entity | undefined;

  constructor(type: ComponentType) {
    this.type = type;
  }

  onAddToGrid() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tick(deltaTime_s: number) {}
}
