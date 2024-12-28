import { ColorMatrixFilter, Sprite } from "pixi.js";

// Create a white flash filter
const createFlashFilter = () => {
  const filter = new ColorMatrixFilter();
  return filter;
};

// Function to animate the flash effect
export const flashSprite = (sprite: Sprite, duration: number = 100) => {
  const flashFilter = createFlashFilter();
  sprite.filters = [flashFilter];

  // Initial flash
  flashFilter.brightness(10, false);

  // Animate back to normal
  const startTime = Date.now();
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    if (progress < 1) {
      // Gradually return to normal brightness
      flashFilter.brightness(2 - progress, false);
      requestAnimationFrame(animate);
    } else {
      // Remove the filter when animation is complete
      sprite.filters = [];
    }
  };

  requestAnimationFrame(animate);
};
