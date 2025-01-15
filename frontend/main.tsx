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
import { syncBuildings } from "./pixi/sync-buildings.ts";
import { Provider } from "react-redux";
import {
  closeShops,
  setGold,
  setHealth,
  setPaused,
  store,
  viewShops,
} from "./redux/store.tsx";
import { syncItems } from "./pixi/sync-items.ts";
import { syncEnemies } from "./pixi/sync-enemies.ts";
import { addHarvestProgress } from "./pixi/addHarvestProgressBar.ts";
import { syncProjectiles } from "./pixi/sync-projectiles.ts";
import { Item } from "../src/item/item.ts";
import { ItemTypes } from "../src/item/item-type.ts";
import { initPortals } from "../src/op/build-portal.ts";
import { rollRarity } from "../src/item/rarity.ts";
import { Core } from "../src/item/core.ts";

const game = new Game(125, 125);
game.inventory.add(new Item(ItemTypes.Lumberyard));
game.inventory.add(new Item(ItemTypes.Mine));
game.inventory.add(new Item(ItemTypes.Conveyor, 16));

game.inventory.add(new Core(rollRarity()));
game.inventory.add(new Core(rollRarity()));
game.inventory.add(new Core(rollRarity()));
game.inventory.add(new Core(rollRarity()));

initPortals(game);

game.onShopOpen = () => {
  store.dispatch(viewShops());
};

game.onShopClose = () => {
  store.dispatch(closeShops());
};

store.dispatch(setHealth(game.town!.health()!.health));
store.dispatch(setGold(game.getGold()));
game.town!.health()!.onChange = () => {
  store.dispatch(setHealth(game.town!.health()!.health));
};
game.onGoldChange = () => {
  store.dispatch(setGold(game.getGold()));
};
game.onPauseChange = () => {
  store.dispatch(setPaused(game.getPaused()));
};

const buildings = new Map<string, Sprite>();
const items = new Map<string, Sprite>();
const enemies = new Map<string, Sprite>();
const projectiles = new Map<string, Sprite>();

const app = new Application();
await app.init({
  background: "#507396",
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
  syncBuildings(game, buildings, app, sheet, store);
  syncItems(game, items, app, sheet);
  syncEnemies(game, enemies, app, sheet, store);
  syncProjectiles(game, projectiles, app, sheet);
  game.tick(deltaS);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App game={game} />
    </Provider>
  </StrictMode>
);
