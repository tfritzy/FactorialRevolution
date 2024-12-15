import React from "react";
import { Inventory as InventoryComponent } from "../src/component/inventory";
import { ItemIcon } from "./item-icon";
import { pickupItem, placeItem } from "../src/op/item-management";
import { Game } from "../src/model/game";
import { useDispatch } from "react-redux";
import { setHeldItem } from "./redux/store";

type InventoryProps = {
  game: Game;
  inventory: InventoryComponent;
};

export function Inventory(props: InventoryProps) {
  const { inventory, game } = props;
  const [renderVersion, setRenderVersion] = React.useState<number>(-1);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let animationFrameId;

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

  const click = React.useCallback(
    (event: React.MouseEvent, y: number, x: number) => {
      event.stopPropagation();
      if (!game.heldItem) {
        pickupItem(game, inventory, y, x);
        dispatch(
          setHeldItem({
            type: game.heldItem!.type,
            quantity: game.heldItem!.quantity,
          })
        );
      } else {
        placeItem(game, inventory, y, x);
        dispatch(setHeldItem(game.heldItem));
      }
    },
    [dispatch, game, inventory]
  );

  const slots = React.useMemo(() => {
    const slots: JSX.Element[][] = [];
    for (let y = 0; y < inventory.items.length; y++) {
      slots[y] = [];
      for (let x = 0; x < inventory.items[0].length; x++) {
        const item = inventory.items[y][x];
        slots[y].push(
          <button
            onClick={(event) => click(event, y, x)}
            className="border border-black bg-gray-300 relative"
          >
            {item ? (
              <ItemIcon item={item.type} quantity={item.quantity} />
            ) : (
              <div className="w-10 h-10" />
            )}
          </button>
        );
      }
    }
    return slots;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderVersion]);

  return (
    <div>
      <div className="flex flex-row">{slots}</div>
    </div>
  );
}
