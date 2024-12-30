import React from "react";
import { Game } from "../src/model/game";
import { CraftingMenu } from "./crafting-menu";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { HeldItem } from "./held-item";
import { Inspector } from "./inspector";
import HotkeyListener from "./hotkeys";
import { BottomBarMenu } from "./bottom-bar-menu";
import { Shop } from "./ui/shop";

interface GameOverlayProps {
  game: Game;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ game }) => {
  const openMenu = useSelector((state: RootState) => state.ui.openMenu);
  const inspecting = useSelector((state: RootState) => state.ui.inspecting);

  return (
    <>
      {openMenu === "shop" && <Shop game={game} />}
      {openMenu === "crafting" && <CraftingMenu game={game} />}
      {openMenu === "inspector" && inspecting && (
        <Inspector game={game} id={inspecting} />
      )}
      <BottomBarMenu game={game} />
      <HeldItem />
      <HotkeyListener game={game} />
    </>
  );
};

export default GameOverlay;
