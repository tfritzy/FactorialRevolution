import { SpriteType } from "../../frontend/pixi/spritesheet";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { Entity } from "./entity";
import { Game } from "./game";

export class Projectile {
  public icon: SpriteType;
  public pos: V2;
  public onHit: (entity: Entity) => boolean;
  public id: string;
  public hits: string[];
  public radiusSq: number;
  public velocity: V2;
  public maxHits: number;
  public explosionRadiusSq: number;
  public onExplosionHit: ((entity: Entity) => void) | undefined;

  private game: Game;

  public constructor({
    icon,
    game,
    pos,
    velocity,
    radiusSq,
    maxHits,
    explosionRadiusSq,
    onHit,
    onExplosionHit,
  }: {
    icon: SpriteType;
    game: Game;
    pos: V2;
    velocity: V2;
    radiusSq: number;
    maxHits: number;
    explosionRadiusSq: number;
    onHit: (entity: Entity) => boolean;
    onExplosionHit?: (entity: Entity) => void;
  }) {
    this.icon = icon;
    this.game = game;
    this.pos = pos;
    this.onHit = onHit;
    this.hits = [];
    this.velocity = velocity;
    this.radiusSq = radiusSq;
    this.maxHits = maxHits;
    this.explosionRadiusSq = explosionRadiusSq;
    this.onExplosionHit = onExplosionHit;
    this.id = generateId("pjct");
  }

  tick(deltaTime_s: number) {
    this.pos.x += this.velocity.x * deltaTime_s;
    this.pos.y += this.velocity.y * deltaTime_s;

    this.game.enemies.forEach((e) => {
      const enemy = this.game.entities.get(e);

      if (this.hits.includes(e)) {
        return;
      }

      if (enemy) {
        const deltaVector = enemy.pos.sub(this.pos);
        const distanceSq =
          Math.pow(deltaVector.x, 2) + Math.pow(deltaVector.y, 2);

        if (distanceSq <= this.radiusSq) {
          if (this.onHit(enemy)) {
            this.hits.push(enemy.id);
            this.explode();

            if (this.hits.length >= this.maxHits) {
              this.game.removeProjectile(this);
            }
          }
        }
      }
    });
  }

  explode() {
    if (this.onExplosionHit === undefined) {
      return;
    }

    this.game.enemies.forEach((e) => {
      const enemy = this.game.entities.get(e);

      if (enemy) {
        const deltaVector = enemy.pos.sub(this.pos);
        const distanceSq =
          Math.pow(deltaVector.x, 2) + Math.pow(deltaVector.y, 2);

        if (distanceSq <= this.explosionRadiusSq) {
          this.onExplosionHit?.(enemy);
        }
      }
    });
  }
}
