import { ComponentType } from "../component/component-type";
import { Health } from "../component/health";
import { Walker } from "../component/walker";
import { V2 } from "../numerics/v2";
import { Entity } from "./entity";
import { EntityType } from "./entity-type";

const powerToHealth = 10;
const BASE_SPEED = 1;
export type Speed = "fast" | "normal" | "slow" | "lumbering";
type SpeedVal = {
  cost: number;
  speed: number;
};
const speedMap: Record<Speed, SpeedVal> = {
  fast: {
    cost: 0.5,
    speed: 1.5,
  },
  normal: {
    cost: 1,
    speed: 1,
  },
  slow: {
    cost: 1.25,
    speed: 0.75,
  },
  lumbering: {
    cost: 2,
    speed: 0.5,
  },
};

export class Enemy extends Entity {
  public power: number;
  public speed: Speed;
  public flying: boolean;

  constructor(
    type: EntityType,
    pos: V2,
    power: number,
    speed: Speed,
    flying: boolean = false
  ) {
    super(type, pos);
    this.power = power;
    this.speed = speed;
    this.flying = flying;
  }

  override initComponents(): void {
    if (this.speed) {
      const power = this.power * speedMap[this.speed].cost;
      const health = new Health(power * powerToHealth);
      health.onDeath = this.onDeath;
      this.components.set(ComponentType.Health, health);
      this.components.set(
        ComponentType.Walker,
        new Walker(
          speedMap[this.speed].speed * BASE_SPEED,
          this.onComplete.bind(this)
        )
      );
    }
  }

  onComplete() {
    this.game?.town?.health()?.takeDamage(1);
    this.game?.removeEntity(this);
  }

  onDeath = () => {
    this.game?.addGold(10);
  };
}
