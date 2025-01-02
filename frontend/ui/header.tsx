import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Game } from "../../src/model/game";
import { WaveIndicator } from "./wave-indicator";

export function Header({ game }: { game: Game }) {
  const state = useSelector((state: RootState) => state.ui);

  return (
    <div className="fixed top-0 left-0 w-full flex flex-row space-x-4 px-4 bg-dark-purple border-b border-blue py-1">
      <div className="text-gold">{state.gold} gold</div>
      <div className="text-red-600">{state.health} health</div>
      <div className="text-white">{state.paused ? "paused" : ""}</div>
      <WaveIndicator game={game} />
    </div>
  );
}
