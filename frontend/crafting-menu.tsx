import React, { useState, useCallback } from "react";
import { Recipe, recipes } from "../src/model/crafting-recipes";
import { ItemIcon } from "./item-icon";
import { ItemType } from "../src/item/item-type";
import { Game } from "../src/model/game";
import { craftItem } from "../src/op/craft-item";
import { useDispatch } from "react-redux";
import { toggleCrafting } from "./redux/store";

type CraftingDetailsProps = {
  item: ItemType | null;
  recipe: Recipe | null;
  game: Game;
};

function CraftingDetails({ item, recipe, game }: CraftingDetailsProps) {
  const [isCrafting, setIsCrafting] = useState(false);
  const [progress, setProgress] = useState(0);

  const craft = useCallback(() => {
    if (!item || !recipe) return;

    setIsCrafting(true);
    const startTime = Date.now();
    const duration = recipe.craftDuration * 1000;

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
  }, [game, item, recipe]);

  if (!item || !recipe) {
    return <div className="p-4">Select an item to craft</div>;
  }

  return (
    <div className="p-4 min-w-[200px]">
      <div className="text-lg mb-4">{item}</div>
      <div className="mb-2">Ingredients</div>
      <div className="flex flex-row mb-4">
        {Array.from(recipe.ingredients.keys()).map((ingredient) => (
          <ItemIcon
            key={ingredient}
            item={ingredient}
            quantity={recipe.ingredients.get(ingredient)!}
          />
        ))}
      </div>
      <div className="mb-2">Crafting time</div>
      <div className="mb-4">{recipe.craftDuration}s</div>
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
        <div className="w-full p-2" onClick={craft}>
          Craft
        </div>
      </button>
    </div>
  );
}

type CraftingSlotProps = {
  item: ItemType;
  recipe: Recipe;
  isSelected: boolean;
  onSelect: (item: ItemType, recipe: Recipe) => void;
};

function CraftingSlot({
  item,
  recipe,
  isSelected,
  onSelect,
}: CraftingSlotProps) {
  return (
    <button
      onClick={() => onSelect(item, recipe)}
      className={`cursor-pointer border border-black ${
        isSelected ? "bg-gray-200" : ""
      }`}
    >
      <ItemIcon item={item} />
    </button>
  );
}

export function CraftingMenu({ game }: { game: Game }) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSelect = useCallback((item: ItemType, recipe: Recipe) => {
    setSelectedItem(item);
    setSelectedRecipe(recipe);
  }, []);

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black border border-black pointer-events-auto">
      <div className="flex flex-row justify-between border-b border-black px-1">
        <h3>Crafting</h3>
        <button onClick={() => dispatch(toggleCrafting())}>✕</button>
      </div>
      <div className="flex">
        <div className="p-4 border-r border-black">
          <div className="grid grid-cols-5 gap-1">
            {(Object.keys(recipes) as ItemType[])
              .filter((item) => !!recipes[item])
              .map((item) => (
                <CraftingSlot
                  key={item}
                  item={item}
                  recipe={recipes[item]!}
                  isSelected={item === selectedItem}
                  onSelect={handleSelect}
                />
              ))}
          </div>
        </div>
        <CraftingDetails
          item={selectedItem}
          recipe={selectedRecipe}
          game={game}
        />
      </div>
    </div>
  );
}
