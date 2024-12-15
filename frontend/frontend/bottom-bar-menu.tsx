import React from "react";
import { Game } from "../src/model/game";
import { Inventory } from "./inventory";

type BottomBarMenu = {
  game: Game;
  toggleCrafting: () => void;
};

export function BottomBarMenu(props: BottomBarMenu) {
  const { game } = props;

  return (
    <div className="fixed left-1/2 bottom-8 -translate-x-1/2">
      <div className="flex flex-row space-x-2">
        <Inventory inventory={game.inventory} game={game} />
        <button
          className="border border-black bg-white text-black px-2"
          onClick={props.toggleCrafting}
        >
          Crafting
        </button>
      </div>
    </div>
  );
}
