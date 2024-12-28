import { ColorMatrixFilter, Sprite } from "pixi.js";

const createFlashFilter = () => {
  const filter = new ColorMatrixFilter();
  return filter;
};

export const flashSprite = (sprite: Sprite, duration: number = 75) => {
  const flashFilter = createFlashFilter();
  sprite.filters = [flashFilter];

  flashFilter.brightness(50, true);

  setTimeout(() => {
    sprite.filters = [];
  }, duration);
};
