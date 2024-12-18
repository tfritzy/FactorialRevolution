import { Application } from "pixi.js";

export function addViewportControls(app: Application) {
  let isDragging = false;
  let lastPosition = { x: 0, y: 0 };
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 5;

  // Initialize viewport state
  const viewport = app.stage;
  viewport.eventMode = "static";

  // Pan controls
  viewport.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastPosition = { x: event.clientX, y: event.clientY };
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const dx = event.clientX - lastPosition.x;
    const dy = event.clientY - lastPosition.y;

    viewport.position.x += dx;
    viewport.position.y += dy;

    lastPosition = { x: event.clientX, y: event.clientY };
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });

  // Zoom controls
  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      const mousePosition = {
        x: event.clientX - viewport.position.x,
        y: event.clientY - viewport.position.y,
      };

      // Calculate zoom factor based on wheel delta
      const zoomFactor = event.deltaY > 0 ? 0.8 : 1.2;

      // Calculate new scale
      const newScale = Math.min(
        Math.max(viewport.scale.x * zoomFactor, MIN_ZOOM),
        MAX_ZOOM
      );

      // Calculate zoom center offset
      const beforeTransform = {
        x: mousePosition.x / viewport.scale.x,
        y: mousePosition.y / viewport.scale.y,
      };

      // Set new scale
      viewport.scale.set(newScale);

      const afterTransform = {
        x: mousePosition.x / viewport.scale.x,
        y: mousePosition.y / viewport.scale.y,
      };

      // Adjust position to zoom toward mouse cursor
      viewport.position.x +=
        (afterTransform.x - beforeTransform.x) * viewport.scale.x;
      viewport.position.y +=
        (afterTransform.y - beforeTransform.y) * viewport.scale.y;
    },
    { passive: false }
  );

  // Reset view function (optional)
  return {
    resetView: () => {
      viewport.position.set(0, 0);
      viewport.scale.set(1);
    },
  };
}
