import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
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
import { initPortals } from "../src/op/build-portal.ts";
import { syncEnemies } from "./pixi/sync-enemies.ts";
import { addHarvestProgress } from "./pixi/addHarvestProgressBar.ts";

const game = new Game(75, 75);
initPortals(game);
game.inventory.add(new Item(ItemType.Lumberyard));
game.inventory.add(new Item(ItemType.Furnace));
game.inventory.add(new Item(ItemType.WoodenConveyor, 8));
game.inventory.add(new Item(ItemType.WoodShop, 8));
game.inventory.add(new Item(ItemType.Berries, 16));
game.inventory.add(new Item(ItemType.Wheat, 16));
const buildings = new Map<string, Sprite>();
const items = new Map<string, Sprite>();
const enemies = new Map<string, Sprite>();

const app = new Application();
await app.init({
  background: "#251d3b",
  resizeTo: window,
});

const texture = await Assets.load("spritesheet.png");
const sheet = new Spritesheet(texture, spritesheetData);
await sheet.parse();

addStars(app);
addTiles(game, app, sheet, store);
addViewportControls(app, game);
addHarvestProgress(app, game);

document.body.appendChild(app.canvas);

app.ticker.add((deltaTime) => {
  const deltaS = deltaTime.deltaMS / 1000;
  updateHarvest(game, deltaS);
  syncBuildings(game, buildings, app, sheet, store);
  syncItems(game, items, app, sheet);
  syncEnemies(game, enemies, app, sheet);
  game.tick(deltaS);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App game={game} />
    </Provider>
  </StrictMode>
);
