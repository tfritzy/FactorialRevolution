import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Walker extends Component {
  public speed: number;
  public baseSpeed: number;

  constructor(baseSpeed: number) {
    super(ComponentType.Converter);
    this.speed = baseSpeed;
    this.baseSpeed = baseSpeed;
  }
}
