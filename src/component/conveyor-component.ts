import { Item, WorldItem } from "../item/item";
import { flipSide, rotateSide, Side } from "../model/side";
import { V2 } from "../numerics/v2";
import { getBuilding } from "../op/get-building";
import { Component } from "./component";
import { ComponentType } from "./component-type";

type RenderCase = "straight" | "curved" | "curved-reverse";

const CURVED_LENGTH = (2 * Math.PI * 0.5) / 4;
const STRAIGHT_LENGTH = 1;
type ItemOnBelt = {
  item: Item;
  progress: number;
};

export class ConveyorComponent extends Component {
  public items: ItemOnBelt[];
  public prevDir: Side;
  public isCurved: boolean;
  public length: number;
  public halfLength: number;
  public renderCase: RenderCase;

  private nextPos: V2 | undefined;
  private prevPos: V2 | undefined;

  constructor() {
    super(ComponentType.Conveyor);
    this.items = [];
    this.prevDir = Side.South;
    this.isCurved = false;
    this.length = STRAIGHT_LENGTH;
    this.halfLength = STRAIGHT_LENGTH / 2;
    this.renderCase = "straight";
  }

  canAccept(item: Item) {
    const firstItem = this.items[0];
    if (!firstItem) {
      return true;
    }

    if (firstItem.progress > item.width) {
      return true;
    }

    return false;
  }

  override onAddToGrid(): void {
    const owner = this.owner;
    const game = this.owner?.game;
    if (!owner || !game) return;

    this.nextPos = owner.pos.walk(owner.facing);

    for (let i = 1; i < 4; i++) {
      const side = rotateSide(owner.facing, i);
      const intoThis = flipSide(side);
      const pos = owner.pos.walk(side);
      const building = getBuilding(game, pos.y, pos.x);
      if (building?.conveyor() && building.facing === intoThis) {
        this.prevDir = intoThis;
        this.prevPos = pos;
        if (i !== 2) this.setCurved();
        return;
      }
    }

    this.prevDir = owner.facing;
    this.prevPos = owner.pos.walk(flipSide(owner.facing));
  }

  add(item: Item) {
    this.items.unshift({ item: item, progress: 0 });
    this.owner?.game?.addItem(new WorldItem(item, V2.zero()));
  }

  moveItemsForward(deltaTime_s: number) {
    const owner = this.owner;
    const game = this.owner?.game;
    if (!owner || !game || !this.nextPos) return;

    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].progress += deltaTime_s;
      this.items[i].progress = Math.min(1, this.items[i].progress);

      if (i !== this.items.length - 1) {
        this.items[i].progress = Math.min(
          this.items[i].progress,
          this.items[i + 1].progress - this.items[i].item.width
        );
      } else {
        const next = getBuilding(game, this.nextPos.y, this.nextPos.x);
        if (next && !next.ghost) {
          const nextConveyor = next.conveyor();
          if (nextConveyor) {
            if (nextConveyor.items[0]) {
              this.items[i].progress = Math.min(
                nextConveyor.items[0].progress - this.items[i].item.width + 1,
                this.items[i].progress
              );
            }

            if (
              this.items[i].progress >= 1 &&
              nextConveyor.canAccept(this.items[i].item)
            ) {
              next.conveyor()?.add(this.items[i].item);
              this.items.pop();
            }
          } else if (this.items[i].progress >= 1) {
            const nextInputs = next.inputs();
            const nextInventory = next.inventory();
            const nextAmmo = next.ammo();
            const nextTower = next.tower();
            if (nextAmmo && nextTower) {
              if (this.items[i].item.type === nextTower.ammoType) {
                if (nextAmmo.canAddItem(this.items[i].item)) {
                  this.owner?.game?.removeItem(this.items[i].item.id);
                  nextAmmo.add(this.items[i].item);
                  this.items.pop();
                }
              }
            } else if (nextInputs) {
              if (nextInputs.canAddItem(this.items[i].item)) {
                this.owner?.game?.removeItem(this.items[i].item.id);
                nextInputs.add(this.items[i].item);
                this.items.pop();
              }
            } else if (nextInventory) {
              if (nextInventory.canAddItem(this.items[i].item)) {
                this.owner?.game?.removeItem(this.items[i].item.id);
                nextInventory.add(this.items[i].item);
                this.items.pop();
              }
            }
          }
        } else {
          // Don't overextend
          this.items[i].progress = Math.min(
            1 - this.items[i].item.width,
            this.items[i].progress
          );
        }
      }
    }
  }

  updateWorldItemPositions() {
    const game = this.owner?.game;
    if (!game) return;

    this.items = this.items.filter((item) => {
      const worldItem = game.items.get(item.item.id);
      if (!worldItem || !this.owner) return false;

      const basePos = this.owner.pos;
      const progress = item.progress - item.item.width;
      const distance = this.isCurved ? (Math.PI / 2) * progress : progress;
      const angle = (this.owner.facing * Math.PI) / 2 - Math.PI / 2;
      const progressX = Math.cos(angle) * distance;
      const progressY = Math.sin(angle) * distance;
      worldItem.pos = new V2(basePos.x + progressX, basePos.y + progressY);
      return true;
    });
  }

  takeFromPrevInventory() {
    const owner = this.owner;
    const game = this.owner?.game;
    if (!owner || !game || !this.prevPos) return;
    if (!game) return;

    const prev = getBuilding(game, this.prevPos.y, this.prevPos.x);

    if (!prev?.inventory()) {
      return;
    }

    const item = prev.inventory()!.firstItem();
    if (item) {
      if (this.canAccept(item)) {
        const withdrawn = prev.inventory()!.withdrawFirstItem(1);
        if (withdrawn) {
          this.add(withdrawn);
          owner.game?.addItem(new WorldItem(withdrawn, V2.zero()));
        }
      }
    }
  }

  override tick(deltaTime_s: number) {
    if (!this.owner || this.owner.ghost) {
      return;
    }

    this.moveItemsForward(deltaTime_s);
    this.updateWorldItemPositions();
    this.takeFromPrevInventory();
  }

  setCurved() {
    this.length = CURVED_LENGTH;
    this.isCurved = true;
    this.halfLength = CURVED_LENGTH / 2;

    if (this.owner?.facing !== undefined) {
      if (rotateSide(this.owner!.facing, -1) === this.prevDir) {
        this.renderCase = "curved";
      } else {
        this.renderCase = "curved-reverse";
      }
    }
  }
}
