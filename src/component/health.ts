import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Health extends Component {
  public health: number;
  public maxHealth: number;
  public onHit: (() => void) | undefined;
  public onChange: (() => void) | undefined;
  public onDeath: (() => void) | undefined;

  constructor(maxHealth: number) {
    super(ComponentType.Converter);
    this.health = Math.floor(maxHealth);
    this.maxHealth = Math.floor(maxHealth);
  }

  takeDamage(damage: number) {
    this.health -= damage;
    this.onHit?.();
    this.onChange?.();

    if (this.health <= 0) {
      this.owner?.game?.removeEntity(this.owner);
      this.onDeath?.();
    }
  }
}
