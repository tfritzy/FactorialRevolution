import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getBuilding } from "../../src/op/get-building";
import { WORLD_TO_CANVAS } from "./constants";

export function syncBuildings(
  game: Game,
  buildings: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet
) {
  console.log(game.changedBuildings);
  game.changedBuildings.forEach((pos) => {
    if (game.buildings[pos.y][pos.x]) {
      const building = getBuilding(game, pos.y, pos.x)!;
      const texture = sheet.textures[building.type];
      const sprite = new Sprite(texture);
      sprite.position.y = pos.y * WORLD_TO_CANVAS;
      sprite.position.x = pos.x * WORLD_TO_CANVAS;
      app.stage.addChild(sprite);
      buildings.set(building.id, sprite);
    } else {
      console.log("todo: remove building");
    }
  });

  game.changedBuildings.length = 0;
}
