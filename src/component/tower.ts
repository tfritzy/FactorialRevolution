import { ItemCategory } from "../item/item";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Tower extends Component {
  public ammoType: ItemCategory;

  #range: number;
  #rangeSq: number;
  #damage: number;
  #percentDamageBonus: number;
  #cooldown: number;

  public baseCooldown: number;
  public baseDamage: number;
  public baseRange: number;

  public target: string | null = null;
  public remainingCooldown: number;

  public onStatChangeForInspector: (() => void) | undefined;
  public onStatChangeForBuildingSprite: (() => void) | undefined;

  constructor({
    baseRange,
    baseCooldown,
    baseDamage,
    ammoType,
  }: {
    baseRange: number;
    baseCooldown: number;
    baseDamage: number;
    ammoType: ItemCategory;
  }) {
    super(ComponentType.Tower);
    this.baseRange = baseRange;
    this.baseCooldown = baseCooldown;
    this.remainingCooldown = baseCooldown;
    this.baseDamage = baseDamage;
    this.ammoType = ammoType;
    this.#rangeSq = baseRange * baseRange;
    this.#range = baseRange;
    this.#cooldown = baseCooldown;
    this.#damage = baseDamage;
    this.#percentDamageBonus = 0;
  }

  getRange() {
    return this.#range;
  }
  getRangeSq() {
    return this.#rangeSq;
  }
  getDamage() {
    return this.#damage;
  }
  getPercentDamageBonus() {
    return this.#percentDamageBonus;
  }
  getCooldown() {
    return this.#cooldown;
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
        if (this.#rangeSq >= distanceSq) {
          this.target = enemy.id;
          return;
        }
      }
    }
  }

  fire(deltaTime_s: number) {
    this.remainingCooldown -= deltaTime_s;
    if (this.remainingCooldown <= 0) {
      const game = this.owner?.game;
      const oPos = this.owner?.pos;
      if (!game || !this.target || !oPos) return;

      const target = game.entities.get(this.target);
      if (target) {
        const distanceSq =
          Math.pow(target.pos.y - oPos.y, 2) +
          Math.pow(target.pos.x - oPos.x, 2);
        if (distanceSq <= this.#rangeSq) {
          if (this.owner!.ammo()!.removeOneByCategory(this.ammoType)) {
            target.health()?.takeDamage(this.calculateDamage());
          }

          this.remainingCooldown = this.#cooldown;
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

  calculateDamage(): number {
    return this.#damage * (1 + this.#percentDamageBonus / 100);
  }

  addBonusStats({
    damage,
    percentDamage,
    range,
  }: {
    damage?: number;
    percentDamage?: number;
    range?: number;
  }) {
    if (damage) {
      this.#damage += damage;
    }

    if (percentDamage) {
      this.#percentDamageBonus += percentDamage;
    }

    if (range) {
      this.#range += range;
      this.#rangeSq = this.#range * this.#range;
    }

    this.onStatChangeForBuildingSprite?.();
    this.onStatChangeForInspector?.();
  }

  resetStats() {
    this.#damage = this.baseDamage;
    this.#percentDamageBonus = 0;
    this.#range = this.baseRange;
    this.#rangeSq = this.baseRange * this.baseRange;
    this.#cooldown = this.baseCooldown;
    this.onStatChangeForBuildingSprite?.();
    this.onStatChangeForInspector?.();
  }
}
