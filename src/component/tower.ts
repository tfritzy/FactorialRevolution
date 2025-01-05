import { ItemCategory } from "../item/item";
import { Entity } from "../model/entity";
import { Projectile } from "../model/projectile";
import { Component } from "./component";
import { ComponentType } from "./component-type";

type ProjectileConfig = {
  speed: number;
  maxHits: number;
  radius: number;
};

export class Tower extends Component {
  public ammoType: ItemCategory;

  #range: number;
  #rangeSq: number;
  #damage: number;
  #percentDamageBonus: number;
  #cooldown: number;
  #explosionRadius: number;
  #explosionDamage: number;
  #shotCount: number;

  public baseCooldown: number;
  public baseDamage: number;
  public baseRange: number;
  public baseExplosionRadius: number;
  public baseExplosionDamage: number;
  public projectileConfig: ProjectileConfig | undefined;
  public baseShotCount: number;

  public target: string | null = null;
  public remainingCooldown: number;

  public onStatChangeForInspector: (() => void) | undefined;
  public onStatChangeForBuildingSprite: (() => void) | undefined;

  constructor({
    baseRange,
    baseCooldown,
    baseDamage,
    ammoType,
    projectileConfig,
    explosionRadius,
    explosionDamage,
    multishotCount,
  }: {
    baseRange: number;
    baseCooldown: number;
    baseDamage: number;
    ammoType: ItemCategory;
    projectileConfig?: ProjectileConfig;
    explosionRadius?: number;
    explosionDamage?: number;
    multishotCount?: number;
  }) {
    super(ComponentType.Tower);
    this.baseRange = baseRange;
    this.baseCooldown = baseCooldown;
    this.remainingCooldown = baseCooldown;
    this.baseDamage = baseDamage;
    this.ammoType = ammoType;
    this.baseExplosionRadius = explosionRadius ?? 0;
    this.projectileConfig = projectileConfig;
    this.baseShotCount = multishotCount ?? 1;
    this.baseExplosionDamage = explosionDamage ?? 0;

    this.#rangeSq = baseRange * baseRange;
    this.#range = baseRange;
    this.#cooldown = baseCooldown;
    this.#damage = baseDamage;
    this.#percentDamageBonus = 0;
    this.#explosionRadius = explosionRadius ?? 0;
    this.#explosionDamage = explosionDamage ?? 0;
    this.#shotCount = multishotCount ?? 1;
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

  reduceCooldown(deltaTime_s: number) {
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
          this.fire(target);

          this.remainingCooldown = this.#cooldown;
        } else {
          this.target = null;
        }
      } else {
        this.target = null;
      }
    }
  }

  fire(target: Entity) {
    const owner = this.owner;
    const game = owner?.game;
    if (!game) return;

    if (!this.projectileConfig) {
      if (this.owner!.ammo()!.removeOneByCategory(this.ammoType)) {
        target.health()?.takeDamage(this.calculateDamage());
      }
    } else {
      const dir = target.pos.sub(owner.pos).normalized();
      const velocity = dir.mul(this.projectileConfig.speed);
      const projectile = new Projectile({
        game: game,
        pos: owner.pos.clone(),
        velocity: velocity,
        radiusSq: this.projectileConfig.radius * this.projectileConfig.radius,
        maxHits: this.projectileConfig.maxHits,
        explosionRadiusSq: this.#explosionRadius * this.#explosionRadius,
        onHit: (entity: Entity) => {
          entity.health()?.takeDamage(this.calculateDamage());
          return true;
        },
        onExplosionHit: (entity: Entity) => {
          entity.health()?.takeDamage(this.calculateExplosionDamage());
        },
      });
      game.addProjectile(projectile);
    }
  }

  override tick(deltaTime_s: number): void {
    if (!this.target) {
      this.findTarget();
    }

    if (this.target) {
      this.reduceCooldown(deltaTime_s);
    }
  }

  calculateDamage(): number {
    return this.#damage * (1 + this.#percentDamageBonus / 100);
  }

  calculateExplosionDamage(): number {
    return this.#explosionDamage * (1 + this.#percentDamageBonus / 100);
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
