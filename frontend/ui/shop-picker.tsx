import React, { useEffect, useState } from "react";
import { Game } from "../../src/model/game";
import { purchaseShopOption, selectShop, Shop } from "../../src/model/shop";
import { ItemIcon } from "../item-icon";
import { Tooltip } from "./tooltip";

export function ShopFlow(props: { game: Game }) {
  const rerender = useState<number>(0)[1];

  useEffect(() => {
    props.game.onShopChosen = () => rerender(Math.random());
  }, [props.game, rerender]);

  if (!props.game.shopDetails) {
    return null;
  }

  let content;
  if (props.game.shopDetails.selectedShop) {
    content = <ShopWindow game={props.game} />;
  } else {
    content = (
      <>
        <div className="border-b border-blue pl-1">
          <div>Choose a shop</div>
        </div>
        <div className="flex flex-row">
          {props.game.shopDetails.shopOptions.map((s, i) => (
            <ShopButton shop={s} key={s.name} game={props.game} i={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-purple border border-blue text-white pointer-events-auto">
      <div>{content}</div>
    </div>
  );
}

export function ShopPicker(props: { game: Game }) {
  if (!props.game.shopDetails) {
    return null;
  }

  return <></>;
}

function ShopButton(props: { game: Game; shop: Shop; i: number }) {
  const selectShopClick = React.useCallback(() => {
    selectShop(props.game, props.i);
  }, [props.game, props.i]);

  return (
    <Tooltip text={props.shop.description}>
      <button
        className="relative w-32 h-32 border border-blue"
        onClick={selectShopClick}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <ItemIcon item={props.shop.icon} scale={6} />
        </div>

        {props.shop.name}
      </button>
    </Tooltip>
  );
}

function ShopWindow(props: { game: Game }) {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const shop = props.game.shopDetails?.selectedShop;
  const options = props.game.shopDetails?.options;

  if (!shop || !options) {
    return null;
  }

  return (
    <>
      <div className="border-b border-blue pl-1">
        <div>{shop.name}</div>
      </div>
      <div className="flex flex-row space-x-1 justify-center p-1">
        {options.map((o, i) => (
          <Tooltip text={o.description} key={i}>
            <button
              className="relative w-32 h-32 border border-blue ring-gold"
              onClick={() => setSelectedIndex(i)}
              style={{
                outlineWidth: selectedIndex === i ? 2 : 0,
              }}
            >
              {o.name}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                <ItemIcon item={shop.icon} scale={6} />
              </div>
            </button>
          </Tooltip>
        ))}
      </div>
      <button
        className="w-full py-1 border border-blue"
        onClick={() => purchaseShopOption(props.game, o)}
      >
        Purchase
      </button>
    </>
  );
}
