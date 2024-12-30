import { ItemType, ItemTypes } from "../../item/item-type";
import { ShopOption } from "../shop";

export const researchOptions: ShopOption[] = [
  {
    item: {
      type: "research",
      name: "Double-bit axe",
      description: "Increases lumber harvest rates by 25%",
      icon: ItemTypes.Axe,
    },
    onPurchase: () => {},
    price: 25,
  },
  {
    item: {
      type: "research",
      name: "Plow",
      description: "Increases farm yields by 25%",
      icon: ItemTypes.Hoe,
    },
    onPurchase: () => {},
    price: 35,
  },
  {
    item: {
      type: "research",
      name: "Branch mining",
      description: "Increases mining rates by 25%",
      icon: ItemTypes.Pickaxe,
    },
    onPurchase: () => {},
    price: 25,
  },
  {
    item: {
      type: "research",
      name: "Selective breeding",
      description: "Increases caloric value of food by 25%",
      icon: ItemTypes.Wheat,
    },
    onPurchase: () => {},
    price: 25,
  },
  {
    item: {
      type: "research",
      name: "Bellows",
      description: "Decreases blacksmith production time by 25%",
      icon: ItemTypes.Furnace,
    },
    onPurchase: () => {},
    price: 25,
  },
  {
    item: {
      type: "research",
      name: "Leather shoes",
      description: "Increases human movement speed by 25%",
      icon: ItemTypes.Human,
    },
    onPurchase: () => {},
    price: 45,
  },
  {
    item: {
      type: "research",
      name: "Operational efficiency",
      description: "Decreases all production times by 10%",
      icon: ItemTypes.Human,
    },
    onPurchase: () => {},
    price: 50,
  },
];
