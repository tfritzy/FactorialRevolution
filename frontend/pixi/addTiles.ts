import { Application, Container, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../../src/model/game";
import { WORLD_TO_CANVAS } from "./constants";
import { isHarvestable, playerHarvest } from "../../src/op/player-harvest";

export async function addTiles(
  game: Game,
  app: Application,
  sheet: Spritesheet
) {
  const container = new Container();

  for (let y = 0; y < game.map.length; y++) {
    for (let x = 0; x < game.map[0].length; x++) {
      const texture = sheet.textures[game.map[y][x].toString()];

      if (texture) {
        texture.source.scaleMode = "nearest";
        const tile = new Sprite(texture);

        tile.position.x = x * WORLD_TO_CANVAS;
        tile.position.y = y * WORLD_TO_CANVAS;
        tile.width = WORLD_TO_CANVAS;
        tile.height = WORLD_TO_CANVAS;

        if (isHarvestable(game, y, x)) {
          tile.eventMode = "static";
          tile.cursor = "pointer";
          tile.on("pointerdown", () => {
            playerHarvest(game, y, x);
          });
        }

        container.addChild(tile);
      }
    }
  }

  app.stage.addChild(container);
}
