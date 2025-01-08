import { Application, Graphics, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { Store } from "@reduxjs/toolkit";
import { getSprite } from "./addSprite";
import { Building } from "../../src/model/building";
import { openInspector } from "../redux/store";
import { Layer, WORLD_TO_CANVAS } from "./constants";

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
        building.pos.x,
        Layer.World
      );
      sprite.rotation = (building.facing * Math.PI) / 2;

      if (building.tower()) {
        const tower = building.tower()!;
        const circle = new Graphics();
        circle.eventMode = "none";
        circle
          .circle(0, 0, (tower.getRange() / 2) * WORLD_TO_CANVAS)
          .stroke(0x00ff00);
        sprite.addChild(circle);
        tower.onStatChangeForBuildingSprite = () => {
          circle.clear();
          circle
            .circle(0, 0, tower.getRange() * WORLD_TO_CANVAS)
            .stroke(0x00ff00);
        };
      }

      if (building.ghost && building.harvester()) {
        // from: TileType;
        // to: ItemType[];
        // baseRate: number;
        // remainingTime: number;
        console.log(building.harvester()?.harvestRates);
        const rates = building
          .harvester()
          ?.harvestRates.filter((r) => r.baseRate > 0)
          .map((hr) => ({ to: hr.to, rate: hr.baseRate * 60 }));
        console.log(rates);
      }

      if (!building.ghost) {
        sprite.eventMode = "static";
        sprite.cursor = "pointer";

        sprite.on("pointerdown", () => {
          store.dispatch(openInspector(building.id));
        });
      } else {
        sprite.eventMode = "none";
        sprite.localColor = 0x00ff00;
      }

      buildings.set(building.id, sprite);
      app.stage.addChild(sprite);
    }
  });
  game.addedBuildings.length = 0;
}
