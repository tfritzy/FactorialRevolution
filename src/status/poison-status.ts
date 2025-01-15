import { Entity } from "../model/entity";
import { Status } from "./status";

export class PoisonStatus extends Status {
  public constructor(stacks: number) {
    super({ name: "Poisoned", type: "poisoned", stacks: stacks });
  }

  tick(owner: Entity) {
    const health = owner.health();
    if (health) {
      health.takeDamage(this.stacks);
    }
  }

  stackWith(status: PoisonStatus) {
    this.stacks += status.stacks;
  }
}
