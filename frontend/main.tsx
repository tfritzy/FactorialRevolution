import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { Application, Assets, Sprite, Spritesheet } from "pixi.js";
import { spritesheetData } from "./pixi/spritesheet.ts";
import { addStars } from "./pixi/addStars.ts";
import { addTiles } from "./pixi/addTiles.ts";
import { Game } from "../src/model/game.ts";
import { addViewportControls } from "./pixi/addViewportControls.ts";
import { updateHarvest } from "../src/op/player-harvest.ts";
import { syncBuildings } from "./pixi/sync-buildings.ts";
import { ItemType } from "../src/item/item-type.ts";
import { Item } from "../src/item/item.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { syncItems } from "./pixi/sync-items.ts";

const game = new Game(200, 100);
game.inventory.add(new Item(ItemType.Lumberyard));
game.inventory.add(new Item(ItemType.WoodenConveyor, 8));
const buildings = new Map<string, Sprite>();
const items = new Map<string, Sprite>();

const app = new Application();
await app.init({
  background: "#251d3b",
  resizeTo: window,
});

const texture = await Assets.load("sheet.png");
const sheet = new Spritesheet(texture, spritesheetData);
await sheet.parse();

addStars(app);
addTiles(game, app, sheet, store);
addViewportControls(app);

document.body.appendChild(app.canvas);

app.ticker.add((deltaTime) => {
  const deltaS = deltaTime.deltaMS / 1000;
  updateHarvest(game, deltaS);
  syncBuildings(game, buildings, app, sheet, store);
  syncItems(game, items, app, sheet);
  game.tick(deltaS);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App game={game} />
    </Provider>
  </StrictMode>
);
