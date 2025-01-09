import { Application, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getSprite } from "./get-sprite";
import { Layer, WORLD_TO_CANVAS, WorldSubLayer } from "./constants";

export function syncProjectiles(
  game: Game,
  projectiles: Map<string, Sprite>,
  app: Application,
  sheet: Spritesheet
) {
  game.projectiles.forEach((projectile) => {
    const sprite = projectiles.get(projectile.id);
    if (sprite) {
      sprite.position.x = projectile.pos.x * WORLD_TO_CANVAS;
      sprite.position.y = projectile.pos.y * WORLD_TO_CANVAS;
    } else {
      const sprite = getSprite(
        sheet,
        projectile.icon,
        projectile.pos.y,
        projectile.pos.x,
        Layer.World,
        WorldSubLayer.AllElse
      );
      sprite.width = WORLD_TO_CANVAS / 2;
      sprite.height = WORLD_TO_CANVAS / 2;
      sprite.rotation =
        Math.atan2(projectile.velocity.y, projectile.velocity.x) + Math.PI / 4;
      sprite.scale = projectile.scale;
      projectiles.set(projectile.id, sprite);
      app.stage.addChild(sprite);
    }
  });

  game.removedProjectiles.forEach((id) => {
    const sprite = projectiles.get(id);
    if (sprite) {
      app.stage.removeChild(sprite);
    }
    projectiles.delete(id);
  });
  game.removedProjectiles.length = 0;
}
