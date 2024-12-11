import { GridHelper } from "../helpers/grid-helpers";
import { Item } from "../item/item";
import { getBuilding } from "../op/get-building";
import { Component } from "./component";
import { ComponentType } from "./component-type";

type ItemOnBelt = {
  item: Item;
  progress: number;
};

export class ConveyorComponent extends Component {
  public items: ItemOnBelt[];

  constructor() {
    super(ComponentType.Conveyor);
    this.items = [];
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

  add(item: Item) {
    this.items.unshift({ item: item, progress: 0 });
  }

  moveItemsForward(deltaTime_s: number) {
    const owner = this.owner;
    const game = this.owner?.game;
    if (!owner) return;
    if (!game) return;

    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].progress += deltaTime_s;
      this.items[i].progress = Math.min(1, this.items[i].progress);

      if (i !== this.items.length - 1) {
        this.items[i].progress = Math.min(
          this.items[i].progress,
          this.items[i + 1].progress - this.items[i].item.width
        );
      } else {
        const next = getBuilding(
          game,
          owner.pos.y + owner.facing.y,
          owner.pos.x + owner.facing.x
        );
        if (next) {
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
            const nextInventory = next.inventory();
            if (nextInventory) {
              if (nextInventory.canAddItem(this.items[i].item)) {
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

  takeFromPrevInventory() {
    const owner = this.owner;
    const game = this.owner?.game;
    if (!owner) return;
    if (!game) return;

    const prev = getBuilding(
      game,
      owner.pos.y - owner.facing.y,
      owner.pos.x - owner.facing.x
    );

    if (!prev?.inventory()) {
      return;
    }

    const item = prev.inventory()!.firstItem();
    if (item) {
      if (this.canAccept(item)) {
        const withdrawn = prev.inventory()!.withdrawFirstItem(1);
        if (withdrawn) {
          this.add(withdrawn);
        }
      }
    }
  }

  override tick(deltaTime_s: number) {
    this.moveItemsForward(deltaTime_s);
    this.takeFromPrevInventory();
  }
}