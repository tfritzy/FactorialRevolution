import { Item } from "../item/item";
import { Entity } from "../model/entity";

export function grabItem(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.withdrawFirstItem();
  }

  return undefined;
}

export function findItemToGrab(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.firstItem();
  }

  return undefined;
}

export function canInsertInto(entity: Entity, item: Item): boolean {
  if (entity.inventory()) {
    return entity.inventory()!.canAddItem(item);
  }

  return false;
}

export function insertInto(entity: Entity, item: Item): boolean {
  if (entity.inventory()) {
    return entity.inventory()!.add(item);
  }

  return false;
}
