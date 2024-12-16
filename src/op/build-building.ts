import { Game } from "../model/game";
import { Building } from "../model/building";
import { V2 } from "../numerics/v2";
import { EntityType } from "../model/EntityType";
import { Crate } from "../model/crate";
import {
  Lumberyard,
  StoneMiner,
  WoodenConveyor,
  WoodenInserter,
} from "../model/buildings";
import { Side } from "../model/side";

function buildingFromType(type: EntityType, pos: V2) {
  switch (type) {
    case EntityType.Crate:
      return new Crate(pos);
    case EntityType.Lumberyard:
      return new Lumberyard(pos);
    case EntityType.StoneMiner:
      return new StoneMiner(pos);
    case EntityType.WoodenConveyor:
      return new WoodenConveyor(pos);
    case EntityType.WoodenInserter:
      return new WoodenInserter(pos);
  }
}

export function buildHeldBuilding(
  game: Game,
  y: number,
  x: number,
  facing: Side = Side.North
) {
  if (game.heldItem?.builds) {
    const building = buildingFromType(game.heldItem.builds, new V2(x, y));
    buildBuilding(game, building, facing);

    game.heldItem.quantity -= 1;
    if (game.heldItem.quantity <= 0) {
      game.heldItem = undefined;
    }
  }
}

export function buildBuilding(
  game: Game,
  building: Building,
  facing: Side = Side.North
) {
  game.buildings[building.pos.y][building.pos.x] = building.id;
  game.entities.set(building.id, building);
  building.game = game;
  building.facing = facing;
  building.onAddToGrid();
}
