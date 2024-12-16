import React from "react";
import { Inventory } from "./inventory";
import { Game } from "../src/model/game";
import { V2 } from "../src/numerics/v2";
import { getBuilding } from "../src/op/get-building";
import { useDispatch } from "react-redux";
import { closeInspector } from "./redux/store";

type InspectorProps = {
  game: Game;
  pos: V2;
};

export function Inspector(props: InspectorProps) {
  const { game, pos } = props;
  const dispatch = useDispatch();

  const building = getBuilding(game, pos.y, pos.x);

  if (!building) {
    return null;
  }

  const inventory = building.inventory();

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-black">
      <div className="flex flex-row justify-between w-full p-x1 border-b border-black px-1">
        <div>{building.type}</div>
        <button onClick={() => dispatch(closeInspector())}>✕</button>
      </div>

      <div className="p-1">
        {inventory && <Inventory inventory={inventory} game={game} />}
      </div>
    </div>
  );
}
