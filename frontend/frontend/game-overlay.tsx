import React, { useCallback, useState } from "react";
import { Game } from "../src/model/game";
import { CraftingMenu } from "./crafting-menu";
import { BottomBarMenu } from "./bottom-bar-menu";

interface GameOverlayProps {
  game: Game;
}

type Menu = "crafting" | "inspection" | null;

const GameOverlay: React.FC<GameOverlayProps> = ({ game }) => {
  const [menu, setMenu] = useState<Menu>(null);

  const toggleCrafting = useCallback(() => {
    if (menu === "crafting") {
      setMenu(null);
    } else {
      setMenu("crafting");
    }
  }, [menu]);

  return (
    <div className="relative">
      {menu && <CraftingMenu game={game} onClose={toggleCrafting} />}
      <BottomBarMenu game={game} toggleCrafting={toggleCrafting} />
    </div>
  );
};

export default GameOverlay;
