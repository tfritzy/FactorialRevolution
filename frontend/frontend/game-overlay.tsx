import React from "react";
import { Game } from "../src/model/game";
import { Inventory } from "./inventory";
import { CraftingMenu } from "./crafting-menu";

interface GameOverlayProps {
  game: Game;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ game }) => {
  return (
    <div className="relative">
      <CraftingMenu game={game} />
      <Inventory inventory={game.inventory} />
    </div>
  );
};

export default GameOverlay;
