import { Application, Graphics, Sprite, Spritesheet, Text } from "pixi.js";
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
        const rates = building
          .harvester()
          ?.harvestRates.filter((r) => r.baseRate > 0)
          .map((hr) => ({ to: hr.to, rate: hr.baseRate * 60 }));

        if (rates && rates.length > 0) {
          const labelText = rates
            .map((r) => `${r.to}: ${r.rate.toFixed(1)}/min`)
            .join("\n");

          const label = new Text({
            text: labelText,
            style: {
              fontFamily: "Arial",
              fontSize: 10,
              fill: 0xffffff,
              stroke: {
                color: 0x000000,
              },
              align: "center",
            },
            resolution: 4,
          });

          label.anchor.x = 0.5;
          label.anchor.y = 1;
          label.position.y = -sprite.height / 2 - 5; // Position above the sprite
          sprite.addChild(label);
          label.angle = -sprite.angle;
        }
      }

      if (!building.ghost) {
        sprite.eventMode = "static";
        sprite.cursor = "pointer";

        sprite.on("pointerdown", () => {
          store.dispatch(openInspector(building.id));
        });
      } else {
        sprite.eventMode = "none";
        // sprite.localColor = 0x00ff00;
      }

      buildings.set(building.id, sprite);
      app.stage.addChild(sprite);
    }
  });
  game.addedBuildings.length = 0;
}
