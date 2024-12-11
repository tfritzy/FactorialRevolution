import { ItemType } from "./item-type";

type ItemProps = {
  maxStack: number;
  width: number;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemType.IronBar]: {
    maxStack: 4,
    width: 0.25,
  },
  [ItemType.Log]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.Stone]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.IronOre]: {
    maxStack: 1,
    width: 0.5,
  },
  [ItemType.CopperOre]: {
    maxStack: 1,
    width: 0.5,
  },
};
