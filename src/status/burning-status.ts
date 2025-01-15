import { Entity } from "../model/entity";
import { Status } from "./status";

export class BurningStatus extends Status {
  public constructor(stacks: number) {
    super({ name: "Burning", type: "burning", stacks: stacks });
  }

  tick(owner: Entity) {
    const health = owner.health();
    if (health) {
      health.takeDamage(this.stacks);
    }

    this.stacks -= 1;
    if (this.stacks <= 0) {
      owner.statuses.delete("burning");
    }
  }

  stackWith(status: BurningStatus) {
    this.stacks += status.stacks;
  }
}
