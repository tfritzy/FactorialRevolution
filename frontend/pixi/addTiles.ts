import { Application, Container, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { isHarvestable, playerHarvest } from "../../src/op/player-harvest";
import { buildHeldBuilding } from "../../src/op/build-building";
import { getSprite } from "./addSprite";
import { Store } from "@reduxjs/toolkit";
import { getState, setHeldItem } from "../redux/store";
import { Layer } from "./constants";

export async function addTiles(
  game: Game,
  app: Application,
  sheet: Spritesheet,
  store: Store
) {
  const container = new Container();
  container.zIndex = Layer.TILE;

  for (let y = 0; y < game.map.length; y++) {
    for (let x = 0; x < game.map[0].length; x++) {
      const tile = getSprite(sheet, game.map[y][x].toString(), y, x);
      tile.eventMode = "static";

      tile.on("pointerenter", () => {
        buildHeldBuilding(
          game,
          y,
          x,
          getState(store).ui.buildingOrientation,
          true
        );
      });

      if (isHarvestable(game, y, x)) {
        tile.on("pointerdown", () => {
          playerHarvest(game, y, x);
        });
        tile.cursor = "pointer";
      }

      tile.on("pointerdown", () => {
        if (
          buildHeldBuilding(
            game,
            y,
            x,
            getState(store).ui.buildingOrientation,
            false
          )
        ) {
          store.dispatch(setHeldItem(game.heldItem));
        }
      });

      container.addChild(tile);
    }
  }

  app.stage.addChild(container);
}
