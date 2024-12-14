import React from "react";
import { Inventory as InventoryComponent } from "../src/component/inventory";

type InventoryProps = {
  inventory: InventoryComponent;
};

export function Inventory(props: InventoryProps) {
  const { inventory } = props;

  const slots: JSX.Element[][] = [];
  for (let y = 0; y < inventory.items.length; y++) {
    slots[y] = [];
    for (let x = 0; x < inventory.items[0].length; x++) {
      const item = inventory.items[y][x];
      slots[y].push(
        <div className="min-w-8 min-h-8 border border-black bg-gray-300 relative">
          {item ? (
            <img
              className="w-8 h-8"
              src={`${item?.type}.png`}
              style={{
                imageRendering: "pixelated",
              }}
            />
          ) : (
            <div className="w-8 h-8" />
          )}
          <div className="absolute bottom-0 right-0 text-black bg-white leading-none px-1">
            {inventory.items[y][x]?.quantity}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="fixed left-1/2 bottom-8 -translate-x-1/2">
      <div className="flex flex-row">{slots}</div>
    </div>
  );
}
