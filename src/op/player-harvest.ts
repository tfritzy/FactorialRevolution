import { getItem } from "../helpers/grid-helpers";
import { Item } from "../item/item";
import { ItemTypes } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { Game } from "../model/game";
import { V2 } from "../numerics/v2";

export type Harvesting = {
  pos: V2;
  remainingtime: number;
};

export function isHarvestable(game: Game, y: number, x: number) {
  return [
    TileType.Tree,
    TileType.Iron,
    TileType.Copper,
    TileType.Stone,
    TileType.BerryBush,
  ].includes(game.map[y][x]);
}

export function cancelHarvest(game: Game) {
  game.harvesting = undefined;
}

export function playerHarvest(game: Game, y: number, x: number) {
  if (isHarvestable(game, y, x)) {
    game.harvesting = {
      pos: new V2(x, y),
      remainingtime: 1,
    };
  }
}

export function updateHarvest(game: Game, deltaTime_s: number) {
  if (!game.harvesting) {
    return;
  }

  game.harvesting.remainingtime -= deltaTime_s;
  if (game.harvesting.remainingtime <= 0) {
    completeHarvest(game, game.harvesting.pos);
    game.harvesting = undefined;
  }
}

function completeHarvest(game: Game, pos: V2) {
  const tile = getItem(game.map, pos.y, pos.x);
  switch (tile) {
    case TileType.Tree:
      game.inventory.add(new Item(ItemTypes.Log));
      break;
    case TileType.Iron:
      game.inventory.add(new Item(ItemTypes.IronOre));
      break;
    case TileType.Copper:
      game.inventory.add(new Item(ItemTypes.CopperOre));
      break;
    case TileType.Stone:
      game.inventory.add(new Item(ItemTypes.Stone));
      break;
    case TileType.BerryBush:
      game.inventory.add(new Item(ItemTypes.Berries));
      break;
  }
}
