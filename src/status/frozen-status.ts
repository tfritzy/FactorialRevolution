import { Entity } from "../model/entity";
import { Status } from "./status";

export class FrozenStatus extends Status {
  public constructor(stacks: number) {
    super({ name: "Frozen", type: "frozen", stacks: stacks });
  }

  tick(owner: Entity) {
    this.stacks -= 1;

    const movement = owner.walker();
    if (movement) {
      movement.frozen = true;
      if (this.stacks < 0) {
        movement.frozen = false;
      }
    }
    if (this.stacks < 0) {
      owner.statuses.delete("frozen");
    }
  }

  onInitialAdd(owner: Entity): void {
    const movement = owner.walker();
    if (movement) {
      movement.frozen = true;
    }
  }

  stackWith(status: FrozenStatus) {
    this.stacks += status.stacks;
  }
}
