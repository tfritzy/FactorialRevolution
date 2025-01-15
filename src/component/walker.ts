import { inBounds } from "../helpers/grid-helpers";
import { Town } from "../model/buildings";
import { V2 } from "../numerics/v2";
import { getBuilding } from "../op/get-building";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Walker extends Component {
  public speed: number;
  public baseSpeed: number;
  public targetPos: V2 | null = null;
  public velocity: V2 = V2.zero();
  public frozen: boolean;

  private onComplete: () => void;

  constructor(baseSpeed: number, onComplete: () => void) {
    super(ComponentType.Walker);
    this.speed = baseSpeed;
    this.baseSpeed = baseSpeed;
    this.onComplete = onComplete;
    this.frozen = false;
  }

  override tick(deltaTime_s: number): void {
    const owner = this.owner;
    const pos = this.owner?.pos;
    const game = owner?.game;
    if (!owner || !pos || !game) {
      return;
    }

    if (this.frozen) {
      return;
    }

    if (!this.targetPos) {
      if (!inBounds(game.pathing, Math.floor(pos.y), Math.floor(pos.x))) {
        return;
      }

      const gridPos = new V2(Math.floor(pos.x), Math.floor(pos.y));

      const building = getBuilding(game, gridPos.y, gridPos.x);
      if (building instanceof Town) {
        this.onComplete();
      }

      const dir = game.pathing[gridPos.y][gridPos.x];

      if (dir) {
        this.targetPos = gridPos.add(dir).add(new V2(0.5, 0.5));
      }
    }

    if (this.targetPos) {
      const delta = this.targetPos.sub(owner.pos);
      const norm = delta.normalized();
      this.velocity.x = norm.x * this.speed;
      this.velocity.y = norm.y * this.speed;
      owner.pos.x += this.velocity.x * deltaTime_s;
      owner.pos.y += this.velocity.y * deltaTime_s;

      if (delta.x < 0.1 && delta.y < 0.1) {
        this.targetPos = null;
      }
    }
  }
}
