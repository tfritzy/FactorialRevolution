import { Application, Container } from "pixi.js";
import { Game } from "../../src/model/game";

function addX(viewport: Container, val: number) {
  viewport.position.x = Math.floor(viewport.position.x + val);
}

function addY(viewport: Container, val: number) {
  viewport.position.y = Math.floor(viewport.position.y + val);
}

const scales = [
  0.375, 0.51, 0.67, 0.75, 0.875, 1, 1.25, 1.75, 2, 2.25, 2.75, 3, 3.25, 3.75,
  4, 5,
];
// Helper function to snap scale to clean values that work well with tile rendering
function snapScale(scale: number): number {
  // Define clean scale values that work well with your tile size

  // Find the closest supported scale
  return scales.reduce((prev, curr) => {
    return Math.abs(curr - scale) < Math.abs(prev - scale) ? curr : prev;
  });
}

export function addViewportControls(app: Application, game: Game) {
  let isDragging = false;
  let lastPosition = { x: 0, y: 0 };
  const MIN_ZOOM = 0.125;
  const MAX_ZOOM = scales[scales.length - 1];

  // Initialize viewport state
  const viewport = app.stage;
  viewport.eventMode = "static";

  // Track gesture state
  let lastGestureScale = 1.0;

  // Mouse drag controls
  viewport.addEventListener("pointerdown", (event) => {
    if (game.heldItem) {
      return;
    }
    isDragging = true;
    lastPosition = { x: event.clientX, y: event.clientY };
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    if (game.heldItem) {
      isDragging = false;
      return;
    }
    const dx = event.clientX - lastPosition.x;
    const dy = event.clientY - lastPosition.y;
    addX(viewport, dx);
    addY(viewport, dy);
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
      const mousePosition = {
        x: event.clientX - viewport.position.x,
        y: event.clientY - viewport.position.y,
      };

      // Use exponential scaling for smoother zoom
      const zoomFactor = Math.exp(-event.deltaY / 500);
      const rawNewScale = viewport.scale.x * zoomFactor;
      const newScale = snapScale(
        Math.min(Math.max(rawNewScale, MIN_ZOOM), MAX_ZOOM)
      );
      console.log(newScale);

      const beforeTransform = {
        x: mousePosition.x / viewport.scale.x,
        y: mousePosition.y / viewport.scale.y,
      };

      viewport.scale.set(newScale);

      const afterTransform = {
        x: mousePosition.x / viewport.scale.x,
        y: mousePosition.y / viewport.scale.y,
      };

      addX(viewport, (afterTransform.x - beforeTransform.x) * viewport.scale.x);
      addY(viewport, (afterTransform.y - beforeTransform.y) * viewport.scale.y);
    },
    { passive: false }
  );

  // Handle multi-touch gestures for pan/zoom
  function onGesture(event: any) {
    event.preventDefault();
    // Capture initial gesture state
    if (event.type === "gesturestart") {
      lastGestureScale = event.scale;
      return;
    }

    // Handle gesture changes
    if (event.type === "gesturechange") {
      // Handle zooming
      const dScale = event.scale - lastGestureScale;
      const zoomFactor = 1.0 + dScale;
      const rawNewScale = viewport.scale.x * zoomFactor;
      const newScale = snapScale(
        Math.min(Math.max(rawNewScale, MIN_ZOOM), MAX_ZOOM)
      );

      viewport.scale.set(newScale);

      // Update gesture state
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
