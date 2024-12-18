import React, { useEffect, useRef } from "react";
import { Application, Assets, Spritesheet } from "pixi.js";
import { addStars } from "./addStars";
import { addTiles } from "./addTiles";
import { spritesheetData } from "./spritesheet";
import { Game } from "../../src/model/game";

const app = new Application();
await app.init({
  background: "#251d3b",
  resizeTo: window,
});

export function GameCanvas(props: { game: Game }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGame = async () => {
      const texture = await Assets.load("sheet.png");
      const sheet = new Spritesheet(texture, spritesheetData);
      await sheet.parse();

      addStars(app);
      addTiles(props.game, app, sheet);

      // Add canvas to div
      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }
    };

    initGame();
  }, []);

  return <div ref={canvasRef} className="absolute inset-0" />;
}
