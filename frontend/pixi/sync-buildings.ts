import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { Store } from "@reduxjs/toolkit";
import { getSprite } from "./addSprite";
import { Building } from "../../src/model/building";
import { openInspector } from "../redux/store";
import { Layer } from "./constants";

export function syncBuildings(
  game: Game,
  buildings: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet,
  store: Store
) {
  game.removedBuildings.forEach((id) => {
    if (buildings.has(id)) {
      app.stage.removeChild(buildings.get(id)!);
      buildings.delete(id);
    }
  });
  game.removedBuildings.length = 0;

  game.addedBuildings.forEach((id) => {
    const building = game.entities.get(id) as Building;
    if (building) {
      const sprite = getSprite(
        sheet,
        building.type,
        building.pos.y,
        building.pos.x
      );
      sprite.rotation = (building.facing * Math.PI) / 2;
      sprite.zIndex = Layer.BUILDING;

      if (!building.ghost) {
        sprite.eventMode = "static";
        sprite.cursor = "pointer";

        sprite.on("pointerdown", () => {
          store.dispatch(openInspector(building.pos));
        });
      } else {
        sprite.eventMode = "none";
        sprite.localColor = 0xffff00;
      }

      buildings.set(building.id, sprite);
      app.stage.addChild(sprite);
    }
  });
  game.addedBuildings.length = 0;
}
