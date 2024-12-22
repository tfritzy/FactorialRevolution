import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getSprite } from "./addSprite";
import { Layer, WORLD_TO_CANVAS } from "./constants";

export function syncItems(
  game: Game,
  items: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet
) {
  game.addedItems.forEach((id) => {
    const item = game.items.get(id);
    if (item) {
      const sprite = getSprite(sheet, item.item.type, item.pos.y, item.pos.x);
      sprite.width = WORLD_TO_CANVAS / 2;
      sprite.height = WORLD_TO_CANVAS / 2;
      sprite.zIndex = Layer.ITEM;
      items.set(item.item.id, sprite);
      app.stage.addChild(sprite);
    }
  });
  game.addedItems.length = 0;

  game.removedItems.forEach((id) => {
    if (items.has(id)) {
      const itemSprite = items.get(id);
      if (itemSprite) {
        app.stage.removeChild(itemSprite);
      }
      items.delete(id);
    }
  });
  game.removedItems.length = 0;

  game.items.forEach((item) => {
    const sprite = items.get(item.item.id);
    if (sprite) {
      sprite.position.x = item.pos.x * WORLD_TO_CANVAS;
      sprite.position.y = item.pos.y * WORLD_TO_CANVAS;
    }
  });
}