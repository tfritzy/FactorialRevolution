import React from "react";
import { Inventory as InventoryComponent } from "../src/component/inventory";
import { pickupItem, placeItem } from "../src/op/item-management";
import { Game } from "../src/model/game";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setHeldItem } from "./redux/store";
import { Item } from "./item";

type InventoryProps = {
  game: Game;
  inventory: InventoryComponent;
};

export function Inventory(props: InventoryProps) {
  const { inventory, game } = props;
  const [renderVersion, setRenderVersion] = React.useState<number>(-1);
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.ui.inspecting);
  const inspecting = id ? game.entities.get(id) : undefined;

  React.useEffect(() => {
    let animationFrameId: number;
    const checkRenderVersion = () => {
      if (inventory.version !== renderVersion) {
        setRenderVersion(inventory.version);
      }
      animationFrameId = requestAnimationFrame(checkRenderVersion);
    };
    animationFrameId = requestAnimationFrame(checkRenderVersion);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inventory.version, renderVersion]);

  const click = (event: React.MouseEvent, y: number, x: number) => {
    event.stopPropagation();
    if (!game.heldItem) {
      if (!event.shiftKey) {
        pickupItem(game, inventory, y, x);
        dispatch(setHeldItem(game.heldItem));
      } else {
        if (inventory.owner) {
          inventory.transfer(game.inventory, y, x);
        } else if (inspecting?.inputs()) {
          inventory.transfer(inspecting.inputs()!, y, x);
        } else if (inspecting?.inventory()) {
          inventory.transfer(inspecting.inventory()!, y, x);
        }
      }
    } else {
      placeItem(game, inventory, y, x);
      dispatch(setHeldItem(game.heldItem));
    }
  };

  const slots = React.useMemo(() => {
    const slots: JSX.Element[] = [];
    for (let y = 0; y < inventory.items.length; y++) {
      for (let x = 0; x < inventory.items[0].length; x++) {
        const item = inventory.items[y][x];
        slots.push(
          <button
            onClick={(event) => click(event, y, x)}
            className="border border-blue bg-dark-purple relative w-14 h-14"
            key={`${x},${y}`}
          >
            {item ? <Item item={item} /> : <div className="w-14 h-14" />}
          </button>
        );
      }
    }
    return slots;
  }, [renderVersion]);

  return (
    <div className="pointer-events-auto">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${inventory.items[0].length}, 56px)`,
          gridTemplateRows: `repeat(${inventory.items.length}, 56px)`,
        }}
      >
        {slots}
      </div>
    </div>
  );
}
