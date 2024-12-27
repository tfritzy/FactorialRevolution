import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Health extends Component {
  public health: number;
  public maxHealth: number;

  constructor(maxHealth: number) {
    super(ComponentType.Converter);
    this.health = maxHealth;
    this.maxHealth = maxHealth;
  }

  takeDamage(damage: number) {
    this.health -= damage;

    if (this.health <= 0) {
      this.owner?.game?.removeEntity(this.owner);
    }
  }
}
