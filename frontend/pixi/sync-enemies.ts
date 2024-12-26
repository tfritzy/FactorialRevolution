import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getSprite } from "./addSprite";
import { Layer, WORLD_TO_CANVAS } from "./constants";

export function syncEnemies(
  game: Game,
  enemies: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet
) {
  game.addedEnemies.forEach((id) => {
    const enemy = game.entities.get(id);
    if (enemy) {
      const sprite = getSprite(sheet, enemy.type, enemy.pos.y, enemy.pos.x);
      sprite.zIndex = Layer.ITEM;
      sprite.width = WORLD_TO_CANVAS / 2;
      sprite.height = WORLD_TO_CANVAS / 2;
      enemies.set(id, sprite);
      app.stage.addChild(sprite);
    }
  });
  game.addedEnemies.length = 0;

  for (const [id, sprite] of enemies.entries()) {
    const e = game.entities.get(id);
    if (e) {
      sprite.position.x = (e.pos.x - 0.5) * WORLD_TO_CANVAS;
      sprite.position.y = (e.pos.y - 0.5) * WORLD_TO_CANVAS;
    } else {
      app.stage.removeChild(sprite);
      enemies.delete(id);
    }
  }
}
