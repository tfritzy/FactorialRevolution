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
        src={`/item/${props.item}.png`}
        className="w-10 h-10"
        style={{ imageRendering: "pixelated" }}
        aria-label={props.item}
        title={
          props.quantity ? `${props.quantity} x ${props.item}` : props.item
        }
      />
      {props.quantity !== undefined && props.quantity > 0 && (
        <div className="absolute -bottom-[1px] right-[2px] text-2xl font-extrabold outline-text leading-none font-mono">
          {props.quantity}
        </div>
      )}
    </div>
  );
};
