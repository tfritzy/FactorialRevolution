import { Inventory } from "../component/inventory";
import { Item } from "../item/item";
import { Game } from "../model/game";

export function pickupItem(
  game: Game,
  inventory: Inventory,
  y: number,
  x: number
) {
  const item = inventory.removeAt(y, x);
  game.heldItem = item;
}

export function placeItem(
  game: Game,
  inventory: Inventory,
  y: number,
  x: number,
  quantity: number | undefined = undefined
) {
  if (game.heldItem) {
    if (!quantity || game.heldItem.quantity === quantity) {
      if (inventory.addAt(game.heldItem, y, x)) {
        game.heldItem = undefined;
      }
    } else {
      game.heldItem.quantity -= quantity;
      const newItem = new Item(game.heldItem.type, quantity);
      inventory.addAt(newItem, y, x);
    }
  }
}

export function pickupItemFromWorld(game: Game, id: string) {
  const worldItem = game.items.get(id);
  if (worldItem) {
    if (game.inventory.add(worldItem.item)) {
      game.removeItem(worldItem.item.id);
    }
  }
}
