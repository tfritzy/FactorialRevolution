import { Entity } from "../model/entity";

export type StatusType =
  | "frozen"
  | "burning"
  | "poisoned"
  | "bleeding"
  | "slowed";

export class Status {
  public name: string;
  public type: StatusType;
  public stacks: number;

  static TICK_RATE = 1;

  public constructor({
    name,
    type,
    stacks,
  }: {
    name: string;
    type: StatusType;
    stacks: number;
  }) {
    this.name = name;
    this.type = type;
    this.stacks = stacks;
  }

  tick(owner: Entity) {}
  stackWith(status: Status) {}
  onInitialAdd(owner: Entity) {}
}
