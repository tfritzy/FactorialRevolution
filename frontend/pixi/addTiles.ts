import { Application, Container, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import {
  cancelHarvest,
  isHarvestable,
  playerHarvest,
} from "../../src/op/player-harvest";
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
      // if (game.map[y][x] === TileType.Grass) {
      //   continue;
      // }
      const tile = getSprite(
        sheet,
        game.map[y][x].toString(),
        y,
        x,
        Layer.TILE
      );
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
