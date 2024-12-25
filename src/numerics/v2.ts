import { Side } from "../model/side";

export class V2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
    if (Object.is(this.y, -0)) this.y = 0;
    if (Object.is(this.x, -0)) this.x = 0;
  }

  static zero(): V2 {
    return new V2(0, 0);
  }

  static one(): V2 {
    return new V2(1, 1);
  }

  static up(): V2 {
    return new V2(0, -1);
  }

  static down(): V2 {
    return new V2(0, 1);
  }

  static left(): V2 {
    return new V2(-1, 0);
  }

  static right(): V2 {
    return new V2(1, 0);
  }

  negate(): V2 {
    return new V2(-this.x, -this.y);
  }

  add(v: V2): V2 {
    return new V2(this.x + v.x, this.y + v.y);
  }

  sub(v: V2): V2 {
    return new V2(this.x - v.x, this.y - v.y);
  }

  mul(scalar: number): V2 {
    return new V2(this.x * scalar, this.y * scalar);
  }

  div(scalar: number): V2 {
    if (scalar === 0) throw new Error("Division by zero");
    return new V2(this.x / scalar, this.y / scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalized(): V2 {
    const mag = this.magnitude();
    if (mag === 0) return V2.zero();
    return this.div(mag);
  }

  dot(v: V2): number {
    return this.x * v.x + this.y * v.y;
  }

  distance(v: V2): number {
    return this.sub(v).magnitude();
  }

  toGrid(): V2 {
    return new V2(Math.floor(this.x), Math.floor(this.y));
  }

  rotate(clockwiseSteps: number): V2 {
    const normalizedSteps = ((clockwiseSteps % 4) + 4) % 4;

    switch (normalizedSteps) {
      case 0: // 0° rotation
        return this.clone();
      case 1: // 90° clockwise
        return new V2(this.y, -this.x);
      case 2: // 180°
        return new V2(-this.x, -this.y);
      case 3: // 270° clockwise (90° counterclockwise)
        return new V2(-this.y, this.x);
      default:
        throw new Error("Invalid rotation steps");
    }
  }

  equals(v: V2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  clone(): V2 {
    return new V2(this.x, this.y);
  }

  walk(side: Side): V2 {
    switch (side) {
      case Side.North:
        return this.add(V2.up());
      case Side.South:
        return this.add(V2.down());
      case Side.East:
        return this.add(V2.right());
      case Side.West:
        return this.add(V2.left());
      default:
        throw "Unknown side " + side;
    }
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
