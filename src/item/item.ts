import { BuildingType } from "../model/entity-type";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { Effect } from "./effect";
import { itemProps } from "./item-props";
import { ItemType } from "./item-type";
import { Rarity } from "./rarity";

export type ItemCategory =
  | "category-arrow"
  | "category-relic"
  | "category-core"
  | "category-log"
  | "category-cannon-ball"
  | ItemType;

export class WorldItem {
  public item: Item;
  public pos: V2;

  constructor(item: Item, pos: V2) {
    this.item = item;
    this.pos = pos;
  }
}

export class Item {
  public id: string;
  public name: string;
  public type: ItemType;
  public maxStack: number;
  public quantity: number;
  public width: number;
  public builds: BuildingType | undefined;
  public effects: Effect[] | undefined;
  public rarity: Rarity | undefined;
  public category: ItemCategory;
  public energy_kwh: number;

  constructor(
    type: ItemType,
    quantity: number = 1,
    rarity: Rarity | undefined = undefined
  ) {
    this.type = type;
    this.id = generateId(type.toString());
    this.maxStack = itemProps[this.type].maxStack;
    this.name = itemProps[this.type].name;
    this.width = itemProps[this.type].width;
    this.builds = itemProps[this.type].builds;
    this.category = itemProps[this.type].category ?? this.type;
    this.energy_kwh = itemProps[this.type].energy_kwh ?? 0;
    this.effects = itemProps[this.type].getEffects?.(rarity ?? "common") ?? [];
    this.quantity = Math.min(quantity, this.maxStack);
    this.rarity = rarity;
  }
}
