import { ItemType } from "../item/item-type";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Tower extends Component {
  public target: string | null = null;
  public rangeSq: number;
  public baseRange: number;
  public baseCooldown: number;
  public cooldown: number;
  public damage: number;
  public baseDamage: number;
  public ammoType: ItemType;

  constructor(
    baseRange: number,
    baseCooldown: number,
    baseDamage: number,
    ammoType: ItemType
  ) {
    super(ComponentType.Tower);
    this.rangeSq = baseRange * baseRange;
    this.baseRange = baseRange;
    this.baseCooldown = baseCooldown;
    this.cooldown = baseCooldown;
    this.baseDamage = baseDamage;
    this.damage = baseDamage;
    this.ammoType = ammoType;
  }

  findTarget() {
    const game = this.owner?.game;
    const oPos = this.owner?.pos;
    if (!game || !oPos) return;

    for (const id of game.enemies) {
      const enemy = game.entities.get(id);
      if (enemy) {
        const distanceSq =
          Math.pow(enemy.pos.y - oPos.y, 2) + Math.pow(enemy.pos.x - oPos.x, 2);
        if (this.rangeSq >= distanceSq) {
          this.target = enemy.id;
          return;
        }
      }
    }
  }

  fire(deltaTime_s: number) {
    this.cooldown -= deltaTime_s;
    if (this.cooldown <= 0) {
      const game = this.owner?.game;
      const oPos = this.owner?.pos;
      if (!game || !this.target || !oPos) return;

      const target = game.entities.get(this.target);
      if (target) {
        const distanceSq =
          Math.pow(target.pos.y - oPos.y, 2) +
          Math.pow(target.pos.x - oPos.x, 2);
        if (distanceSq <= this.rangeSq) {
          if (this.owner!.inventory()!.removeCount(this.ammoType, 1)) {
            target.health()?.takeDamage(this.damage);
          }

          this.cooldown = this.baseCooldown;
        } else {
          this.target = null;
        }
      } else {
        this.target = null;
      }
    }
  }

  override tick(deltaTime_s: number): void {
    if (!this.target) {
      this.findTarget();
    }

    if (this.target) {
      this.fire(deltaTime_s);
    }
  }
}
