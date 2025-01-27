import { Application, Container, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import {
  cancelHarvest,
  isHarvestable,
  playerHarvest,
} from "../../src/op/player-harvest";
import { buildHeldBuilding } from "../../src/op/build-building";
import { getSprite } from "./get-sprite";
import { Store } from "@reduxjs/toolkit";
import { getState, setHeldItem } from "../redux/store";
import { Layer } from "./constants";
import { tileData } from "../../src/map/tile-type";
import { randomElement } from "../../src/helpers/random";

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
      const tile = getSprite(
        sheet,
        randomElement(tileData[game.map[y][x]]),
        y,
        x,
        Layer.TILE,
        0
      );
      // tile.anchor = 0;
      tile.eventMode = "static";

      tile.on("pointerenter", (e) => {
        const preview = (e.buttons & 1) !== 1;
        if (
          buildHeldBuilding(
            game,
            y,
            x,
            getState(store).ui.buildingOrientation,
            preview
          ) &&
          !preview
        ) {
          store.dispatch(setHeldItem(game.heldItem));
        }
      });

      if (isHarvestable(game, y, x)) {
        tile.on("pointerdown", (e) => {
          playerHarvest(game, y, x);
          e.stopPropagation();
        });
        tile.on("pointerup", (e) => {
          cancelHarvest(game);
          e.stopPropagation();
        });
        tile.on("pointerleave", (e) => {
          cancelHarvest(game);
          e.stopPropagation();
        });
        tile.cursor = "pointer";
      }

      tile.on("pointerdown", (e) => {
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
          e.stopPropagation();
        }
      });

      container.addChild(tile);
    }
  }

  app.stage.addChild(container);
}
