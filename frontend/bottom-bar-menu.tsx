import React from "react";
import { Game } from "../src/model/game";
import { Inventory } from "./inventory";
import { useDispatch } from "react-redux";
import { toggleCrafting } from "./redux/store";

type BottomBarMenu = {
  game: Game;
};

export function BottomBarMenu(props: BottomBarMenu) {
  const { game } = props;
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch(toggleCrafting());
  }, [dispatch]);

  return (
    <div className="fixed left-1/2 bottom-8 -translate-x-1/2">
      <div className="flex flex-row space-x-2">
        <Inventory inventory={game.inventory} game={game} />
        <button
          className="border border-black bg-white text-black px-2 pointer-events-auto"
          onClick={onClick}
        >
          Crafting
        </button>
      </div>
    </div>
  );
}
