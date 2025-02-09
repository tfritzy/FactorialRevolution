import { V2 } from "../numerics/v2";
import { Entity } from "./entity";
import { EntityType } from "./entity-type";

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
    const spots = [];
    for (let y = this.pos.y; y < this.pos.y + this.height; y++) {
      for (let x = this.pos.x; x < this.pos.x + this.width; x++) {
        spots.push(new V2(x, y));
      }
    }

    return spots;
  }
}
