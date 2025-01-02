import React, { useState, useCallback } from "react";
import { Recipe, recipes } from "../src/model/crafting-recipes";
import { ItemIcon } from "./item-icon";
import { ItemType } from "../src/item/item-type";
import { Game } from "../src/model/game";
import { craftItem } from "../src/op/craft-item";
import { useDispatch } from "react-redux";
import { toggleCrafting } from "./redux/store";
import { itemProps } from "../src/item/item-props";
import { Tooltip } from "./ui/tooltip";

export function CraftingMenu({ game }: { game: Game }) {
  const [filter, setFilter] = useState<string>("");
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSelect = useCallback((item: ItemType, recipe: Recipe) => {
    setSelectedItem(item);
    setSelectedRecipe(recipe);
  }, []);

  const selectRecipe = useCallback((item: ItemType) => {
    setSelectedItem(item);
    const recipe = recipes[item];
    setSelectedRecipe(recipe);
  }, []);

  const handleInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setFilter(event.target.value);
    },
    [setFilter]
  );

  const handleKey = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key !== "Escape") {
      event.stopPropagation();
    }
  }, []);

  return (
    <div className="fixed min-w-max left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-purple text-white border border-blue pointer-events-auto">
      <div className="flex flex-row justify-between border-b border-blue px-1">
        <h3>Crafting</h3>
        <button onClick={() => dispatch(toggleCrafting())}>✕</button>
      </div>
      <div className="flex">
        <div className="p-1 border-r border-blue">
          <input
            placeholder="Search..."
            className="w-full h-8 mb-1 bg-dark-purple border border-blue text-white px-1 text-sm focus:bg-blue/50 focus:border-blue outline-none"
            value={filter}
            onChange={handleInput}
            onKeyDown={handleKey}
            autoFocus
          />
          <div className="h-[300px] overflow-y-auto overflow-x-hidden">
            <div
              className="grid grid-cols-5 gap-1"
              onWheel={(e) => e.stopPropagation()}
            >
              {(Object.keys(recipes) as ItemType[])
                .filter((item) => recipes[item].ingredients.length === 1)
                .filter((item) => item.includes(filter))
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
        </div>
        <CraftingDetails
          item={selectedItem}
          recipe={selectedRecipe}
          game={game}
          selectRecipe={selectRecipe}
        />
      </div>
    </div>
  );
}

type CraftingDetailsProps = {
  item: ItemType | null;
  recipe: Recipe | null;
  game: Game;
  selectRecipe: (item: ItemType) => void;
};

function CraftingDetails({
  item,
  recipe,
  game,
  selectRecipe,
}: CraftingDetailsProps) {
  const craft = useCallback(() => {
    if (!item || !recipe) return;
    craftItem(game, item);
  }, [game, item, recipe]);

  if (!item || !recipe) {
    return <div className="p-4 min-w-[200px]"></div>;
  }

  return (
    <div className="p-4 min-w-[200px]">
      <div className="text-lg mb-4">{item}</div>
      <div className="mb-2">Ingredients</div>
      <div className="flex flex-row mb-4">
        {Array.from(recipe.ingredients[0].keys()).map((ingredient) => (
          <Tooltip
            tooltip={`${recipe.ingredients[0].get(ingredient)!}×${
              itemProps[ingredient].name
            }`}
          >
            <button onClick={() => selectRecipe(ingredient)}>
              <ItemIcon
                key={ingredient}
                item={ingredient}
                quantity={recipe.ingredients[0].get(ingredient)!}
              />
            </button>
          </Tooltip>
        ))}
      </div>
      <div className="mb-2">Crafting time</div>
      <div className="mb-4">{recipe.duration}s</div>
      <button className="relative w-full border border-blue">
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
      className={`cursor-pointer border border-blue ${
        isSelected ? "bg-dark-purple" : ""
      }`}
    >
      <ItemIcon item={item} />
    </button>
  );
}
