import { ItemType } from "./item-type";

type ItemProps = {
  maxStack: number;
};

export const itemProps: Record<ItemType, ItemProps> = {
  [ItemType.IronBar]: {
    maxStack: 4,
  },
  [ItemType.Log]: {
    maxStack: 1,
  },
  [ItemType.Stone]: {
    maxStack: 1,
  },
  [ItemType.IronOre]: {
    maxStack: 1,
  },
  [ItemType.CopperOre]: {
    maxStack: 1,
  },
};
