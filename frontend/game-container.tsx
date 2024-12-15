import { useEffect, useRef } from "react";
import { initializeGame } from "./game-engine";
import React from "react";
import GameOverlay from "./game-overlay";
import { Game } from "../src/model/game";
import { useDispatch } from "react-redux";

export default function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof initializeGame>>();
  const dispatch = useDispatch();
  const game = React.useMemo(() => {
    return new Game(100, 100);
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
