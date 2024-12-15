import { GridHelper } from "../helpers/grid-helpers";
import {
  canInsertInto,
  findItemToGrab,
  grabItem,
  insertInto,
} from "../helpers/insertion-helpers";
import { Item } from "../item/item";
import { getBuilding } from "../op/get-building";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class InserterComponent extends Component {
  public armPosition: number; // 0 is on prev, 1 is on next.
  public heldItem: Item | undefined;
  private armSpeed: number = 1;

  constructor() {
    super(ComponentType.Inserter);
    this.armPosition = 0;
  }

  override tick(deltaTime_s: number) {
    this.moveArm(deltaTime_s);
    this.tryGrabItem();
    this.tryDepositItem();
  }

  moveArm(deltaTime_s: number) {
    if (this.heldItem === undefined && this.armPosition > 0) {
      this.armPosition -= deltaTime_s * this.armSpeed;
    }

    if (this.heldItem !== undefined && this.armPosition < 1) {
      this.armPosition += deltaTime_s * this.armSpeed;
    }
  }

  tryDepositItem() {
    if (this.heldItem === undefined) {
      return;
    }

    if (this.armPosition < 1) {
      return;
    }

    const pos = this.owner?.pos;
    const facing = this.owner?.facing;
    const game = this.owner?.game;
    if (!pos) return;
    if (!facing) return;
    if (!game) return;

    const forwardBuildingId = GridHelper.getItem(
      game.buildings,
      pos.y + facing.y,
      pos.x + facing.x
    );

    if (!forwardBuildingId) {
      return;
    }

    const forwardBuilding = game.entities.get(forwardBuildingId)!;
    if (insertInto(forwardBuilding, this.heldItem)) {
      this.heldItem = undefined;
    }
  }

  tryGrabItem() {
    if (this.heldItem !== undefined) {
      return;
    }

    if (this.armPosition > 0) {
      return;
    }

    const pos = this.owner?.pos;
    const facing = this.owner?.facing;
    const game = this.owner?.game;
    if (!pos) return;
    if (!facing) return;
    if (!game) return;
    const forwardBuilding = getBuilding(
      game,
      pos.y + facing.y,
      pos.x + facing.x
    );
    const backwardsBuilding = getBuilding(
      game,
      pos.y - facing.y,
      pos.x - facing.x
    );

    if (!forwardBuilding || !backwardsBuilding) {
      return;
    }

    const itemToGrab = findItemToGrab(backwardsBuilding);
    if (itemToGrab) {
      if (canInsertInto(forwardBuilding, itemToGrab)) {
        this.heldItem = grabItem(backwardsBuilding);
      }
    }
  }
}
