import { Application } from "pixi.js";

export function addViewportControls(app: Application) {
  let isDragging = false;
  let lastPosition = { x: 0, y: 0 };
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 5;

  // Initialize viewport state
  const viewport = app.stage;
  viewport.eventMode = "static";

  // Track gesture state
  let lastGestureX = 0;
  let lastGestureY = 0;
  let lastGestureScale = 1.0;

  // Mouse drag controls
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

  // Handle wheel events for non-touch zooming and trackpad panning
  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      // Trackpad pinch-zoom
      if (event.ctrlKey) {
        const mousePosition = {
          x: event.clientX - viewport.position.x,
          y: event.clientY - viewport.position.y,
        };

        // Use exponential scaling for smoother zoom
        const zoomFactor = Math.exp(-event.deltaY / 100);
        const newScale = Math.min(
          Math.max(viewport.scale.x * zoomFactor, MIN_ZOOM),
          MAX_ZOOM
        );

        const beforeTransform = {
          x: mousePosition.x / viewport.scale.x,
          y: mousePosition.y / viewport.scale.y,
        };

        viewport.scale.set(newScale);

        const afterTransform = {
          x: mousePosition.x / viewport.scale.x,
          y: mousePosition.y / viewport.scale.y,
        };

        viewport.position.x +=
          (afterTransform.x - beforeTransform.x) * viewport.scale.x;
        viewport.position.y +=
          (afterTransform.y - beforeTransform.y) * viewport.scale.y;
      } else {
        // Handle trackpad panning
        viewport.position.x -= event.deltaX;
        viewport.position.y -= event.deltaY;
      }
    },
    { passive: false }
  );

  // Handle multi-touch gestures for pan/zoom
  function onGesture(event: any) {
    event.preventDefault();

    // Capture initial gesture state
    if (event.type === "gesturestart") {
      lastGestureX = event.screenX;
      lastGestureY = event.screenY;
      lastGestureScale = event.scale;
      return;
    }

    // Handle gesture changes
    if (event.type === "gesturechange") {
      // Handle panning
      const dx = event.screenX - lastGestureX;
      const dy = event.screenY - lastGestureY;
      viewport.position.x += dx;
      viewport.position.y += dy;

      // Handle zooming
      const dScale = event.scale - lastGestureScale;
      const zoomFactor = 1.0 + dScale;
      const newScale = Math.min(
        Math.max(viewport.scale.x * zoomFactor, MIN_ZOOM),
        MAX_ZOOM
      );
      viewport.scale.set(newScale);

      // Update gesture state
      lastGestureX = event.screenX;
      lastGestureY = event.screenY;
      lastGestureScale = event.scale;
    }
  }

  // Add gesture event listeners
  window.addEventListener("gesturestart", onGesture, { passive: false });
  window.addEventListener("gesturechange", onGesture, { passive: false });
  window.addEventListener("gestureend", onGesture, { passive: false });

  return {
    resetView: () => {
      viewport.position.set(0, 0);
      viewport.scale.set(1);
    },
  };
}
