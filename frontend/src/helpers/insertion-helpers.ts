import { Item } from "../item/item";
import { Entity } from "../model/entity";

export function grabItem(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.withdrawFirstItem();
  }

  if (entity.conveyor()) {
    const conveyor = entity.conveyor()!;
    const item = conveyor.items.find(
      (i) => i.progress < 0.5 && i.item.width + i.progress > 0.5
    );
    if (item) {
      conveyor.items.splice(conveyor.items.indexOf(item), 1);
    }
    return item?.item;
  }

  return undefined;
}

export function findItemToGrab(entity: Entity): Item | undefined {
  if (entity.inventory()) {
    return entity.inventory()!.firstItem();
  }

  if (entity.conveyor()) {
    return entity
      .conveyor()!
      .items.find((i) => i.progress < 0.5 && i.item.width + i.progress > 0.5)
      ?.item;
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
