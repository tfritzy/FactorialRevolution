import { V2 } from "../numerics/v2";
import { Entity } from "./entity";
import { EntityType } from "./entity-type";
import { Side } from "./side";

export class Building extends Entity {
  public width: number;
  public height: number;
  public occupied: V2[] = [];

  constructor(type: EntityType, pos: V2, width: number, height: number) {
    super(type, pos);
    this.width = width;
    this.height = height;
  }

  override onAddToGrid(): void {
    super.onAddToGrid();
    this.occupied = this.getOccupied();
  }

  getOccupied(): V2[] {
    const flipped = this.facing === Side.East || this.facing === Side.West;
    let minX, maxX, minY, maxY;

    if (!flipped) {
      minX = this.pos.x - Math.floor(this.width / 2);
      maxX = this.pos.x + Math.floor(this.width / 2);
      minY = this.pos.y - Math.floor(this.height / 2);
      maxY = this.pos.y + Math.floor(this.height / 2);
    } else {
      minX = this.pos.x - Math.floor(this.height / 2);
      maxX = this.pos.x + Math.floor(this.height / 2);
      minY = this.pos.y - Math.floor(this.width / 2);
      maxY = this.pos.y + Math.floor(this.width / 2);
    }

    const spots = [];
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        spots.push(new V2(x, y));
      }
    }

    return spots;
  }
}
