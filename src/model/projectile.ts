import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { Entity } from "./entity";
import { Game } from "./game";

export class Projectile {
  public pos: V2;
  public onHit: (entity: Entity) => boolean;
  public id: string;
  public hits: string[];
  public radiusSq: number;
  public velocity: V2;

  COLLISION_TIMER = 0.1;
  private collisionCountdown = this.COLLISION_TIMER;
  private game: Game;

  public constructor(
    game: Game,
    pos: V2,
    velocity: V2,
    radiusSq: number,
    onHit: (entity: Entity) => boolean
  ) {
    this.game = game;
    this.pos = pos;
    this.onHit = onHit;
    this.hits = [];
    this.velocity = velocity;
    this.radiusSq = radiusSq;
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
            console.log("hit");
            this.hits.push(enemy.id);
          }
        }
      }
    });
  }
}
