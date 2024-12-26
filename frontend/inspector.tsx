import React from "react";
import { Inventory } from "./inventory";
import { Game } from "../src/model/game";
import { getBuilding } from "../src/op/get-building";
import { useDispatch } from "react-redux";
import { closeInspector } from "./redux/store";
import { RecipeSelector } from "./recipe-selector";

type InspectorProps = {
  game: Game;
  pos: { x: number; y: number };
};

export function Inspector(props: InspectorProps) {
  const { game, pos } = props;
  const dispatch = useDispatch();

  const building = getBuilding(game, pos.y, pos.x);

  if (!building) {
    return null;
  }

  const inventory = building.inventory();
  const inputs = building.inputs();

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[200px] bg-dark-purple text-white border border-blue pointer-events-auto">
      <div className="flex flex-row justify-between w-full pl-3 pr-1 border-b border-blue">
        <div>{building.type}</div>
        <button onClick={() => dispatch(closeInspector())}>✕</button>
      </div>

      <div className="p-1 text-xs flex flex-col space-y-2">
        {building.converter() && !building.converter()?.craftEverything && (
          <div>
            <RecipeSelector building={building} />
          </div>
        )}

        {inputs && (
          <div className="">
            <div className="mb-1">Inputs</div>
            <Inventory inventory={inputs} game={game} />
          </div>
        )}

        {inventory && (
          <div className="">
            <div className="mb-1">Inventory</div>
            <Inventory inventory={inventory} game={game} />
          </div>
        )}
      </div>
    </div>
  );
}
