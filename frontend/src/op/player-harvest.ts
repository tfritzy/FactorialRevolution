import { GridHelper } from "../helpers/grid-helpers";
import { Item } from "../item/item";
import { ItemType } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { Game } from "../model/game";

export function playerHarvest(game: Game, y: number, x: number) {
  const tile = GridHelper.getItem(game.map, y, x);

  switch (tile) {
    case TileType.Tree:
      game.inventory.add(new Item(ItemType.Log));
      game.inventory.add(new Item(ItemType.PlantMatter, 4));
      game.inventory.add(new Item(ItemType.Stick, 2));
      break;
    case TileType.Iron:
      game.inventory.add(new Item(ItemType.IronOre));
      break;
    case TileType.Copper:
      game.inventory.add(new Item(ItemType.CopperOre));
      break;
    case TileType.Stone:
      game.inventory.add(new Item(ItemType.Stone));
      break;
  }
}
