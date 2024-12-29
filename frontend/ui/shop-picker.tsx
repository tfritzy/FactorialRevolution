import { Item } from "../../src/item/item";
import { ItemType } from "../../src/item/item-type";
import { Game } from "../../src/model/game";
import { Shop } from "../../src/model/shop";
import { ItemIcon } from "../item-icon";
import { Tooltip } from "./tooltip";

export function ShopPicker(props: { game: Game }) {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-purple border border-blue text-white pointer-events-auto">
      <div className="border-b border-blue pl-1">
        <div>Choose a shop</div>
      </div>
      <div className="flex flex-row">
        {props.game.shopOptions.map((s) => (
          <ShopButton shop={s} key={s.name} />
        ))}
      </div>
    </div>
  );
}

function ShopButton(props: { shop: Shop }) {
  return (
    <Tooltip text={props.shop.description}>
      <button className="relative w-32 h-32 border border-blue">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <ItemIcon item={props.shop.icon} scale={6} />
        </div>

        {props.shop.name}
      </button>
    </Tooltip>
  );
}

function ShopWindow(props: { shop: Shop }) {
  return;
}
