import { getItem, GridHelper } from "../helpers/grid-helpers";
import {
  canInsertInto,
  findItemToGrab,
  grabItem,
  insertInto,
} from "../helpers/insertion-helpers";
import { Item } from "../item/item";
import { flipSide, Side } from "../model/side";
import { V2 } from "../numerics/v2";
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

  private cachedFacing: Side | undefined;
  private cachedForward: V2 | undefined;
  private cachedBackwards: V2 | undefined;
  forward(): V2 | undefined {
    if (this.cachedFacing != this.owner?.facing) {
      this.cachedForward = this.owner?.pos.walk(this.owner.facing);
      this.cachedBackwards = this.owner?.pos.walk(flipSide(this.owner.facing));
      this.cachedFacing = this.owner?.facing;
    }

    return this.cachedForward;
  }

  backward() {
    if (this.cachedFacing != this.owner?.facing) {
      this.cachedForward = this.owner?.pos.walk(this.owner.facing);
      this.cachedBackwards = this.owner?.pos.walk(flipSide(this.owner.facing));
      this.cachedFacing = this.owner?.facing;
    }

    return this.cachedBackwards;
  }

  tryDepositItem() {
    if (this.heldItem === undefined) {
      return;
    }

    if (this.armPosition < 1) {
      return;
    }

    const pos = this.owner?.pos;
    const game = this.owner?.game;
    const forward = this.forward();
    if (!pos || !game || !forward) return;

    const forwardBuildingId = getItem(game.buildings, forward.y, forward.x);

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
    const game = this.owner?.game;
    const forward = this.forward();
    const backwards = this.backward();
    if (!pos || !game || !forward || !backwards) return;
    const forwardBuilding = getBuilding(game, forward.y, forward.x);
    const backwardsBuilding = getBuilding(game, backwards.y, backwards.x);

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
