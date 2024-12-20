import { Inventory } from "../component/inventory";
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
  x: number
) {
  if (game.heldItem) {
    if (inventory.addAt(game.heldItem, y, x)) {
      game.heldItem = undefined;
    }
  }
}
