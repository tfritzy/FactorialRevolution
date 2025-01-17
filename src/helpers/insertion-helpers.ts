import { Item } from "../item/item";
import { Entity } from "../model/entity";

export function grabItem(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.withdrawFirstItem();
  }

  if (entity.conveyor()) {
    return entity.conveyor()!.takeLastItem()?.item;
  }

  return undefined;
}

export function findItemToGrab(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.firstItem();
  }

  if (entity.conveyor()) {
    const conveyor = entity.conveyor()!;
    return conveyor.items.at(-1)?.item;
  }

  return undefined;
}

export function canInsertInto(entity: Entity, item: Item): boolean {
  if (entity.ammo() && item.category === entity.tower()?.ammoType) {
    return entity.ammo()!.canAddItem(item);
  }

  if (entity.inputs()) {
    return entity.inputs()!.canAddItem(item);
  }

  if (entity.inventory()) {
    return entity.inventory()!.canAddItem(item);
  }

  return false;
}

export function insertInto(entity: Entity, item: Item): boolean {
  if (entity.ammo() && item.category === entity.tower()?.ammoType) {
    return entity.ammo()!.add(item);
  }

  if (entity.inputs()) {
    return entity.inputs()!.add(item);
  }

  if (entity.inventory()) {
    return entity.inventory()!.add(item);
  }

  return false;
}
