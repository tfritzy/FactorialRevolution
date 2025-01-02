import React, { useEffect, useState } from "react";
import { Game } from "../../src/model/game";
import {
  closeShop,
  purchaseShopOption,
  selectShop,
  ShopDetails,
  ShopResearch,
} from "../../src/model/shop";
import { ItemIcon } from "../item-icon";
import { Tooltip } from "./tooltip";
import { UiItem } from "../item";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function Shop(props: { game: Game }) {
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

function ShopButton(props: { game: Game; shop: ShopDetails; i: number }) {
  const selectShopClick = React.useCallback(() => {
    selectShop(props.game, props.i);
  }, [props.game, props.i]);

  return (
    <Tooltip tooltip={props.shop.description}>
      <button
        className="px-4 py-2 border border-blue"
        onClick={selectShopClick}
      >
        <div className="mb-2">
          <ItemIcon item={props.shop.icon} size="large" />
        </div>

        {props.shop.name}
      </button>
    </Tooltip>
  );
}

function Research(props: { research: ShopResearch; onClick: () => void }) {
  const research = props.research;

  return (
    <Tooltip tooltip={research.description} key={research.name}>
      <div
        className="min-w-[150px] flex flex-col items-center"
        onClick={props.onClick}
      >
        <div className="mb-6">{research.name}</div>
        <ItemIcon item={research.icon} size="large" />
      </div>
    </Tooltip>
  );
}

function ShopWindow(props: { game: Game }) {
  const shop = props.game.shopDetails?.selectedShop;
  const items = shop?.items;
  const gold = useSelector((state: RootState) => state.ui.gold);

  if (!items) {
    return null;
  }

  return (
    <>
      <div className="border-b border-blue pl-2">
        <div>{shop.name}</div>
      </div>
      <div className="p-2">
        <div className="flex flex-row space-x-2 justify-center mb-2">
          {items.map((o) => {
            let button;

            if (o.item.type === "research") {
              button = (
                <Research
                  research={o.item}
                  onClick={() => purchaseShopOption(props.game, o)}
                />
              );
            } else {
              button = <UiItem item={o.item.item} size="large" />;
            }

            return (
              <div>
                <div className="mb-1 p-2 border border-blue">{button}</div>
                <button
                  className="font-semibold text-gold flex flex-row items-center space-x-1 px-1 border border-gold justify-center w-full disabled:opacity-50 hover:bg-gold hover:text-dark-purple disabled:hover:bg-transparent disabled:hover:text-gold"
                  onClick={() => purchaseShopOption(props.game, o)}
                  disabled={o.price > gold}
                >
                  <div className="pointer-events-none py-1">{o.price} gold</div>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row space-x-1">
          <button
            className="w-full py-1 border border-blue disabled:opacity-25"
            onClick={() => closeShop(props.game)}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
