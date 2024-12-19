import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getBuilding } from "../../src/op/get-building";
import { getSprite } from "./addSprite";
import { Store } from "@reduxjs/toolkit";
import { openInspector } from "../redux/store";

export function syncBuildings(
  game: Game,
  buildings: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet,
  store: Store
) {
  game.changedBuildings.forEach((pos) => {
    if (game.buildings[pos.y][pos.x]) {
      const building = getBuilding(game, pos.y, pos.x)!;
      const sprite = getSprite(
        sheet,
        building.type,
        building.pos.y,
        building.pos.x
      );

      if (!building.ghost) {
        sprite.eventMode = "static";
        sprite.cursor = "pointer";

        sprite.on("pointerdown", () => {
          store.dispatch(openInspector(building.pos));
        });
      } else {
        sprite.eventMode = "none";
        sprite.localColor = 0x00ff00;
      }

      buildings.set(building.id, sprite);
      app.stage.addChild(sprite);
    } else {
      for (const key of buildings.keys()) {
        if (!game.entities.has(key)) {
          app.stage.removeChild(buildings.get(key)!);
          buildings.delete(key);
        }
      }
    }
  });

  game.changedBuildings.length = 0;
}
