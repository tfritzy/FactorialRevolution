import React, { useState, useEffect, useRef, useCallback } from "react";
import { Recipe, recipes } from "../src/model/crafting-recipes";
import { ItemIcon } from "./item-icon";
import { ItemType } from "../src/item/item-type";
import { Game } from "../src/model/game";
import { craftItem } from "../src/op/craft-item";

type CraftingTooltipProps = {
  item: ItemType;
  recipe: Recipe;
  onClose: () => void;
  game: Game;
};

function CraftingTooltip(props: CraftingTooltipProps) {
  const { onClose, game, item } = props;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isCrafting, setIsCrafting] = useState(false);
  const [progress, setProgress] = useState(0);

  const craft = useCallback(() => {
    setIsCrafting(true);
    const startTime = Date.now();
    const duration = props.recipe.craftDuration * 1000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;

      if (newProgress < 100) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        craftItem(game, item);
        setIsCrafting(false);
        setProgress(0);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [game, item, props.recipe.craftDuration]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={tooltipRef}
      className="absolute -right-1 translate-x-full top-0 bg-white border w-max border-black z-50"
    >
      <div className="border-b border-black flex flex-row justify-between px-1">
        <div>{props.item}</div>
        <button onClick={props.onClose}>✕</button>
      </div>
      <div className="p-1">
        <div>Ingredients</div>
        <div className="flex flex-row">
          {Array.from(props.recipe.ingredients.keys()).map((item) => (
            <ItemIcon
              key={item}
              item={item}
              quantity={props.recipe.ingredients.get(item)!}
            />
          ))}
        </div>
        <div>Crafting time</div>
        <div>{props.recipe.craftDuration}s</div>
        <button
          className="relative w-full border border-black hover:bg-gray-100"
          disabled={isCrafting}
        >
          {isCrafting && (
            <div
              className="absolute top-0 left-0 h-full bg-amber-300/25"
              style={{ width: `${progress}%` }}
            />
          )}
          <div className="w-full disabled:hover:bg-white" onClick={craft}>
            Craft
          </div>
        </button>
      </div>
    </div>
  );
}

type CraftingSlotProps = {
  item: ItemType;
  recipe: Recipe;
  game: Game;
};

function CraftingSlot(props: CraftingSlotProps) {
  const [tooltipShown, setTooltipShown] = useState<boolean>(false);
  const toggleTooltip = useCallback(() => {
    setTooltipShown(!tooltipShown);
  }, [tooltipShown]);
  const closeTooltip = useCallback(() => {
    setTooltipShown(false);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleTooltip}
        className="cursor-pointer border border-black"
      >
        <ItemIcon item={props.item} />
      </button>
      {tooltipShown && (
        <CraftingTooltip
          item={props.item}
          recipe={props.recipe}
          onClose={closeTooltip}
          game={props.game}
        />
      )}
    </div>
  );
}

type CraftingMenuProps = {
  game: Game;
};

export function CraftingMenu(props: CraftingMenuProps) {
  return (
    <div className="fixed left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-1 border border-black">
      <h3>Crafting</h3>
      <div className="grid grid-cols-5 gap-x-1">
        {(Object.keys(recipes) as ItemType[])
          .filter((item) => !!recipes[item])
          .map((item) => (
            <CraftingSlot
              key={item}
              item={item}
              recipe={recipes[item]!}
              game={props.game}
            />
          ))}
      </div>
    </div>
  );
}
