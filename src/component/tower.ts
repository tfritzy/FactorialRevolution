import { ItemCategory } from "../item/item";
import { Entity } from "../model/entity";
import { Projectile } from "../model/projectile";
import { V2 } from "../numerics/v2";
import { Component } from "./component";
import { ComponentType } from "./component-type";

type ProjectileConfig = {
  speed: number;
  maxHits: number;
  radius: number;
  scale: number;
  posVariance: number;
};

export class Tower extends Component {
  public ammoType: ItemCategory;

  #range: number;
  #rangeSq: number;
  #damage: number;
  #percentDamageBonus: number;
  #cooldown: number;
  #attackSpeedPct: number;
  #explosionRadius: number;
  #explosionDamage: number;
  #shotCount: number;
  #critHitChance: number;
  #critHitDamage: number;

  public baseCooldown: number;
  public baseDamage: number;
  public baseRange: number;
  public baseCritHitChance: number;
  public baseCritHitDamage: number;
  public baseExplosionRadius: number;
  public baseExplosionDamage: number;
  public projectileConfig: ProjectileConfig | undefined;
  public baseShotCount: number;
  public firePeriodPercent: number;

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
    firePeriodPercent,
    baseCritHitChance,
    baseCritHitDamage,
  }: {
    baseRange: number;
    baseCooldown: number;
    baseDamage: number;
    ammoType: ItemCategory;
    projectileConfig?: ProjectileConfig;
    explosionRadius?: number;
    explosionDamage?: number;
    multishotCount?: number;
    firePeriodPercent?: number;
    baseCritHitChance?: number;
    baseCritHitDamage?: number;
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
    this.firePeriodPercent = firePeriodPercent ?? 0;
    this.baseCritHitChance = baseCritHitChance ?? 0;
    this.baseCritHitDamage = baseCritHitDamage ?? 2;

    this.#rangeSq = baseRange * baseRange;
    this.#range = baseRange;
    this.#cooldown = baseCooldown;
    this.#damage = baseDamage;
    this.#percentDamageBonus = 0;
    this.#explosionRadius = explosionRadius ?? 0;
    this.#explosionDamage = explosionDamage ?? 0;
    this.#shotCount = multishotCount ?? 1;
    this.#critHitChance = this.baseCritHitChance;
    this.#critHitDamage = this.baseCritHitDamage;
    this.#attackSpeedPct = 0;
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
  getCritHitChance() {
    return this.#critHitChance;
  }
  getAttackSpeedPct() {
    return this.#attackSpeedPct;
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
      const ammoUsed = this.owner?.ammo()?.removeOneByCategory(this.ammoType);
      if (!ammoUsed) {
        return;
      }
      target.health()?.takeDamage(this.calculateDamage());
    } else {
      const shotPeriod = this.#cooldown * this.firePeriodPercent;

      for (let i = 0; i < this.#shotCount; i++) {
        const ammoUsed = this.owner?.ammo()?.removeOneByCategory(this.ammoType);
        if (!ammoUsed) {
          return;
        }

        const shotDelay = i > 0 ? Math.random() * shotPeriod : 0;
        const offset = new V2(
          Math.random() * this.projectileConfig.posVariance,
          Math.random() * this.projectileConfig.posVariance
        );
        const startPos = owner.pos.add(offset);

        let targetPos: V2;
        if (target.walker()) {
          let prevFlightDuration = 0;
          let flightDuration =
            target.pos.sub(startPos).magnitude() / this.projectileConfig.speed;
          const maxIterations = 5;
          let iterations = 0;

          while (
            Math.abs(flightDuration - prevFlightDuration) > 0.001 &&
            iterations < maxIterations
          ) {
            const totalDelay = shotDelay + flightDuration;
            const predictedPos = target.pos.add(
              target
                .walker()!
                .velocity.mul(target.walker()!.baseSpeed * totalDelay) ??
                V2.zero()
            );

            prevFlightDuration = flightDuration;
            flightDuration =
              predictedPos.sub(startPos).magnitude() /
              this.projectileConfig.speed;
            iterations++;
          }

          const totalDelay = shotDelay + flightDuration;
          targetPos = target.pos.add(
            target
              .walker()!
              .velocity.mul(target.walker()!.baseSpeed * totalDelay) ??
              V2.zero()
          );
        } else {
          targetPos = target.pos;
        }

        const dir = targetPos.sub(startPos).normalized();
        const velocity = dir.mul(this.projectileConfig.speed);

        const projectile = new Projectile({
          icon: ammoUsed.type,
          game: game,
          pos: startPos,
          velocity: velocity,
          radiusSq: this.projectileConfig.radius * this.projectileConfig.radius,
          maxHits: this.projectileConfig.maxHits,
          explosionRadiusSq: this.#explosionRadius * this.#explosionRadius,
          scale: this.projectileConfig.scale,
          startDelay: shotDelay,
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
    let dmg = this.#damage * (1 + this.#percentDamageBonus / 100);

    if (this.#critHitChance > 0 && Math.random() <= this.#critHitChance) {
      dmg *= this.#critHitDamage;
    }

    return dmg;
  }

  calculateExplosionDamage(): number {
    let dmg = this.#explosionDamage * (1 + this.#percentDamageBonus / 100);

    if (this.#critHitChance > 0 && Math.random() <= this.#critHitChance) {
      dmg *= this.#critHitDamage;
    }

    return dmg;
  }

  addBonusStats({
    damage,
    percentDamage,
    range,
    critHitChance,
    critHitDamage,
    attackSpeedPct,
  }: {
    damage?: number;
    percentDamage?: number;
    range?: number;
    critHitChance?: number;
    critHitDamage?: number;
    attackSpeedPct?: number;
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

    if (critHitChance) {
      this.#critHitChance += critHitChance;
    }

    if (critHitDamage) {
      this.#critHitDamage += critHitDamage;
    }

    if (attackSpeedPct) {
      this.#attackSpeedPct += attackSpeedPct;
      this.#cooldown = this.baseCooldown / (1 + this.#attackSpeedPct);
    }

    this.onStatChangeForBuildingSprite?.();
    this.onStatChangeForInspector?.();
  }

  resetStats() {
    this.#damage = this.baseDamage;
    this.#percentDamageBonus = 0;
    this.#range = this.baseRange;
    this.#rangeSq = Math.pow(this.#range, 2);
    this.#cooldown = this.baseCooldown;
    this.#critHitChance = this.baseCritHitChance;
    this.#critHitDamage = this.baseCritHitDamage;
    this.#attackSpeedPct = 0;
    this.onStatChangeForBuildingSprite?.();
    this.onStatChangeForInspector?.();
  }
}
