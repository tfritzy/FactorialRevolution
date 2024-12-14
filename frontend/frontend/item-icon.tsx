import React from "react";
import { ItemType } from "../src/item/item-type";

type ItemIconProps = {
  item: ItemType;
  quantity?: number;
};

export const ItemIcon = (props: ItemIconProps) => {
  return (
    <div className="relative">
      <img
        src={`${props.item}.png`}
        className="w-8 h-8"
        style={{ imageRendering: "pixelated" }}
        aria-label={props.item}
        title={
          props.quantity ? `${props.quantity} x ${props.item}` : props.item
        }
      />
      {props.quantity && (
        <div className="absolute bottom-0 right-0 pr-1 bg-white/75 text-sm font-semibold font-mono pointer-events-none">
          {props.quantity}
        </div>
      )}
    </div>
  );
};
