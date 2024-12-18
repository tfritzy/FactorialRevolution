import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { Application, Assets, Spritesheet } from "pixi.js";
import { spritesheetData } from "./pixi/spritesheet.ts";
import { addStars } from "./pixi/addStars.ts";
import { addTiles } from "./pixi/addTiles.ts";
import { Game } from "../src/model/game.ts";
import { addViewportControls } from "./pixi/addViewportControls.ts";
import { updateHarvest } from "../src/op/player-harvest.ts";

const game = new Game(200, 100);

const app = new Application();
await app.init({
  background: "#251d3b",
  resizeTo: window,
});

const texture = await Assets.load("sheet.png");
const sheet = new Spritesheet(texture, spritesheetData);
await sheet.parse();

addStars(app);
addTiles(game, app, sheet);
addViewportControls(app);

document.body.appendChild(app.canvas);

app.ticker.add((deltaTime) => {
  updateHarvest(game, deltaTime.deltaMS / 1000);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App game={game} />
  </StrictMode>
);
