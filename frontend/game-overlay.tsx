import React from "react";
import { Game } from "../src/model/game";
import { CraftingMenu } from "./crafting-menu";
import { BottomBarMenu } from "./bottom-bar-menu";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { HeldItem } from "./held-item";
import { Inspector } from "./inspector";
import HotkeyListener from "./hotkeys";

interface GameOverlayProps {
  game: Game;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ game }) => {
  const openMenu = useSelector((state: RootState) => state.ui.openMenu);
  const inspectingPos = useSelector(
    (state: RootState) => state.ui.inspectingPos
  );

  return (
    <div className="relative">
      {openMenu === "crafting" && <CraftingMenu game={game} />}
      {openMenu === "inspector" && inspectingPos && (
        <Inspector game={game} pos={inspectingPos} />
      )}
      <BottomBarMenu game={game} />
      <HeldItem />
      <HotkeyListener game={game} />
    </div>
  );
};

export default GameOverlay;
