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
import { initPortals } from "../src/op/build-portal.ts";
import { syncEnemies } from "./pixi/sync-enemies.ts";
import { addHarvestProgress } from "./pixi/addHarvestProgressBar.ts";
import { ItemTypes } from "../src/item/item-type.ts";
import { Core } from "../src/item/core.ts";
import { Item } from "../src/item/item.ts";

const game = new Game(125, 125);
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

game.inventory.add(new Item(ItemTypes.Lumberyard));
game.inventory.add(new Item(ItemTypes.Furnace));
game.inventory.add(new Item(ItemTypes.WoodenConveyor, 8));
game.inventory.add(new Item(ItemTypes.WoodShop, 8));
game.inventory.add(new Item(ItemTypes.Slinger, 16));
game.inventory.add(new Core("legendary"));
game.inventory.add(new Core("magic"));
game.inventory.add(new Core("rare"));
game.inventory.add(new Core("common"));
const buildings = new Map<string, Sprite>();
const items = new Map<string, Sprite>();
const enemies = new Map<string, Sprite>();

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
  updateHarvest(game, deltaS);
  syncBuildings(game, buildings, app, sheet, store);
  syncItems(game, items, app, sheet);
  syncEnemies(game, enemies, app, sheet, store);
  game.tick(deltaS);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App game={game} />
    </Provider>
  </StrictMode>
);
