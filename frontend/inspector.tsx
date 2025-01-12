import { Inventory } from "./inventory";
import { Game } from "../src/model/game";
import { useDispatch } from "react-redux";
import { closeInspector } from "./redux/store";
import { RecipeSelector } from "./recipe-selector";
import { TowerInspector } from "./tower-inspector";
import { HarvestInspect } from "./ui/harvest-inspector";
import { removeBuilding } from "../src/op/build-building";
import { Building } from "../src/model/building";

type InspectorProps = {
  game: Game;
  id: string;
};

export function Inspector(props: InspectorProps) {
  const { game, id } = props;
  const dispatch = useDispatch();

  const entity = game.entities.get(id);

  if (!entity) {
    console.error("no entity", entity);
    return null;
  }

  const inventory = entity.inventory();
  const inputs = entity.inputs();

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-black border border-blue pointer-events-auto min-w-[150px]">
      <div className="flex flex-row justify-between w-full border-b border-blue pl-3">
        <div>{entity.type}</div>
        <button
          className="p-1 px-2 border-l border-blue"
          onClick={() => dispatch(closeInspector())}
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col space-y-2 p-3">
        {entity.tower() && (
          <div key="tower">
            <TowerInspector tower={entity.tower()!} />
          </div>
        )}

        {entity.converter() && (
          <div key="recipe">
            <RecipeSelector converter={entity.converter()!} />
          </div>
        )}

        {entity.smelter() && (
          <div key="recipe">
            <RecipeSelector converter={entity.smelter()!} />
          </div>
        )}

        {entity.harvester() && (
          <div key="Harvester">
            <div className="mb-1">Harvesting</div>
            <HarvestInspect harvester={entity.harvester()!} />
          </div>
        )}

        {inputs && (
          <div key="inputs">
            <div className="mb-1">Inputs</div>
            <Inventory inventory={inputs} game={game} />
          </div>
        )}

        {entity.fuel() && (
          <div key="fuel" className="">
            <div className="mb-1">Fuel</div>
            <Inventory inventory={entity.fuel()!} game={game} />
          </div>
        )}

        {entity.relics() && (
          <div key="relics" className="">
            <div className="mb-1">Relics</div>
            <Inventory inventory={entity.relics()!} game={game} />
          </div>
        )}

        {entity.ammo() && (
          <div key="ammo">
            <div className="mb-1">Ammo</div>
            <Inventory inventory={entity.ammo()!} game={game} />
          </div>
        )}

        {inventory && (
          <div key="inventory">
            <div className="mb-1">Inventory</div>
            <Inventory inventory={inventory} game={game} />
          </div>
        )}

        {entity instanceof Building && (
          <button onClick={() => removeBuilding(game, entity)}>Delete</button>
        )}
      </div>
    </div>
  );
}
