import { Application, Container, Graphics } from "pixi.js";
import { Game } from "../../src/model/game";
import { V2 } from "../../src/numerics/v2";
import { Layer, WORLD_TO_CANVAS } from "./constants";

const PROGRESS_BAR_HEIGHT = 6;
const PROGRESS_BAR_OFFSET_Y = -24;

export function addHarvestProgress(app: Application, game: Game) {
  // Create progress bar container
  const progressContainer = new Container();
  const progressBar = new Graphics();
  progressContainer.addChild(progressBar);
  progressContainer.visible = false;
  progressContainer.zIndex = Layer.UI;
  app.stage.addChild(progressContainer);

  // Store animation frame ID for cleanup
  let animationFrameId: number;

  // Update progress bar position and fill based on game.harvesting
  function updateHarvestProgress() {
    if (game.harvesting) {
      // Position the progress bar above the tile
      progressContainer.position.set(
        game.harvesting.pos.x * WORLD_TO_CANVAS - WORLD_TO_CANVAS / 2,
        game.harvesting.pos.y * WORLD_TO_CANVAS + PROGRESS_BAR_OFFSET_Y
      );
      progressContainer.visible = true;

      // Calculate progress (0 to 1)
      const progress = 1 - game.harvesting.remainingtime;

      progressBar.clear();
      // Background
      progressBar.beginFill(0x000000);
      progressBar.drawRect(0, 0, WORLD_TO_CANVAS, PROGRESS_BAR_HEIGHT);
      progressBar.endFill();
      // Progress
      progressBar.beginFill(0xffe250);
      progressBar.drawRect(
        0,
        0,
        WORLD_TO_CANVAS * progress,
        PROGRESS_BAR_HEIGHT
      );
      progressBar.endFill();
    } else {
      progressContainer.visible = false;
    }

    // Always continue the animation loop
    animationFrameId = requestAnimationFrame(updateHarvestProgress);
  }

  // Start the update loop
  animationFrameId = requestAnimationFrame(updateHarvestProgress);

  return {
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      app.stage.removeChild(progressContainer);
      progressContainer.destroy();
    },
  };
}
