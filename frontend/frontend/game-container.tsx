import { useEffect, useRef } from "react";
import { initializeGame } from "./game-engine";
import React from "react";

export default function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof initializeGame>>();

  useEffect(() => {
    if (containerRef.current && !engineRef.current) {
      engineRef.current = initializeGame(containerRef.current);
    }

    return () => {
      engineRef.current?.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
