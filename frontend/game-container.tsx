import { useEffect, useRef } from "react";
import { initializeGame } from "./game-engine";
import React from "react";
import GameOverlay from "./game-overlay";
import { Game } from "../src/model/game";
import { useDispatch } from "react-redux";
import { Item } from "../src/item/item";
import { ItemType } from "../src/item/item-type";

export default function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof initializeGame>>();
  const dispatch = useDispatch();
  const game = React.useMemo(() => {
    const game = new Game(100, 100);
    game.inventory.add(new Item(ItemType.Lumberyard));
    game.inventory.add(new Item(ItemType.WoodenConveyor, 4));
    return game;
  }, []);

  useEffect(() => {
    if (containerRef.current && !engineRef.current) {
      engineRef.current = initializeGame(containerRef.current, game, dispatch);
    }

    return () => {
      engineRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <GameOverlay game={game} />
    </div>
  );
}
