import { Application, Container, Graphics, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { getSprite } from "./addSprite";
import { Layer, WORLD_TO_CANVAS } from "./constants";
import { flashSprite } from "./helpers/flash-sprite";
import { Store } from "@reduxjs/toolkit";
import { openInspector } from "../redux/store";

export function syncEnemies(
  game: Game,
  enemies: Map<string, Container>,
  app: Application,
  sheet: Spritesheet,
  store: Store
) {
  game.addedEnemies.forEach((id) => {
    const enemy = game.entities.get(id);
    if (enemy) {
      const container = new Container();
      const sprite = getSprite(sheet, enemy.type, 0, 0, Layer.World);
      const healthBar = new Graphics();
      sprite.interactive = true;

      sprite.width = WORLD_TO_CANVAS / 2;
      sprite.height = WORLD_TO_CANVAS / 2;

      healthBar.position.y = -15;
      updateHealthBar(
        healthBar,
        enemy.health()?.health ?? 0,
        enemy.health()?.maxHealth ?? 0
      );

      container.addChild(sprite);
      container.addChild(healthBar);
      sprite.on("pointerdown", () => {
        store.dispatch(openInspector(enemy.id));
      });
      sprite.cursor = "pointer";

      enemies.set(id, container);
      app.stage.addChild(container);

      const health = enemy.health();
      if (health) {
        health.onHit = () => {
          flashSprite(sprite);
          updateHealthBar(healthBar, health.health, health.maxHealth);
        };
      }
    }
  });

  game.addedEnemies.length = 0;

  for (const [id, enemyContainer] of enemies.entries()) {
    const e = game.entities.get(id);
    if (e) {
      enemyContainer.position.x = (e.pos.x - 0.5) * WORLD_TO_CANVAS;
      enemyContainer.position.y = (e.pos.y - 0.5) * WORLD_TO_CANVAS;
    } else {
      app.stage.removeChild(enemyContainer);
      enemies.delete(id);
    }
  }
}

function updateHealthBar(
  bar: Graphics,
  currentHealth: number,
  maxHealth: number
) {
  if (currentHealth === maxHealth) {
    return;
  }

  const width = WORLD_TO_CANVAS / 2;
  const height = 2;
  const healthPercentage = currentHealth / maxHealth;

  bar.clear();

  bar.beginFill(0xff5277);
  bar.drawRect(0, 0, width, height);
  bar.endFill();

  bar.beginFill(0x63de53);
  bar.drawRect(0, 0, width * healthPercentage, height);
  bar.endFill();

  bar.position.x = -width / 2;
}
