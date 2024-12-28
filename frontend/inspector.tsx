import { Inventory } from "./inventory";
import { Game } from "../src/model/game";
import { useDispatch } from "react-redux";
import { closeInspector } from "./redux/store";
import { RecipeSelector } from "./recipe-selector";
import { HealthInspector } from "./health-inspector";

type InspectorProps = {
  game: Game;
  id: string;
};

export function Inspector(props: InspectorProps) {
  const { game, id } = props;
  const dispatch = useDispatch();

  const entity = game.entities.get(id);

  if (!entity) {
    console.log("no entity", entity);
    return null;
  }

  const inventory = entity.inventory();
  const inputs = entity.inputs();

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-purple text-white border border-blue pointer-events-auto min-w-[150px]">
      <div className="flex flex-row justify-between w-full pl-1 pr-1 border-b border-blue">
        <div>{entity.type}</div>
        <button onClick={() => dispatch(closeInspector())}>✕</button>
      </div>

      <div className="p-1 text-xs flex flex-col space-y-2">
        {entity.health() && (
          <div>
            <div className="mb-1">Health</div>
            <HealthInspector health={entity.health()!} />
          </div>
        )}

        {entity.converter() && !entity.converter()?.craftEverything && (
          <div>
            <RecipeSelector entity={entity} />
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
