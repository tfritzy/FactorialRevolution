import { Entity } from "../model/entity";
import { Status } from "./status";

export class BleedingStatus extends Status {
  public removalCountdown: number;

  static REMOVE_AFTER_TICKS = 10;

  public constructor(stacks: number) {
    super({ name: "Bleeding", type: "bleeding", stacks: stacks });
    this.removalCountdown = BleedingStatus.REMOVE_AFTER_TICKS;
  }

  tick(owner: Entity) {
    const health = owner.health();
    if (health) {
      health.takeDamage(this.stacks);
    }

    this.removalCountdown -= 1;
    if (this.removalCountdown <= 0) {
      owner.statuses.delete("bleeding");
    }
  }

  stackWith(status: BleedingStatus) {
    this.stacks += status.stacks;
    this.removalCountdown = BleedingStatus.REMOVE_AFTER_TICKS;
  }
}
