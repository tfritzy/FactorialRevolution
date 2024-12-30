import { ItemType } from "../../item/item-type";
import { ShopOption } from "../shop";

export const researchOptions: ShopOption[] = [
  {
    name: "Double-bit axe",
    description: "Increases lumber harvest rates by 25%",
    onPurchase: () => {},
    price: 25,
    icon: ItemType.Axe,
  },
  {
    name: "Plow",
    description: "Increases farm yields by 25%",
    onPurchase: () => {},
    price: 35,
    icon: ItemType.Hoe,
  },
  {
    name: "Branch mining",
    description: "Increases mining rates by 25%",
    onPurchase: () => {},
    price: 25,
    icon: ItemType.Pickaxe,
  },
  {
    name: "Selective breeding",
    description: "Increases caloric value of food by 25%",
    onPurchase: () => {},
    price: 25,
    icon: ItemType.Wheat,
  },
  {
    name: "Bellows",
    description: "Decreases blacksmith production time by 25%",
    onPurchase: () => {},
    price: 25,
    icon: ItemType.Furnace,
  },
  {
    name: "Leather shoes",
    description: "Increases human movement speed by 25%",
    onPurchase: () => {},
    price: 45,
    icon: ItemType.Human,
  },
  {
    name: "Operational efficiency",
    description: "Decreases all production times by 10%",
    onPurchase: () => {},
    price: 50,
    icon: ItemType.Human,
  },
];
