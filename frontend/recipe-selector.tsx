import { useMemo, useState } from "react";
import { Building } from "../src/model/building";
import { ItemIcon } from "./item-icon";

type Props = {
  building: Building;
};

export function RecipeSelector(props: Props) {
  const [r, rerender] = useState<boolean>(false);
  const converter = props.building.converter();

  if (!converter) {
    return null;
  }

  const recipes = useMemo(
    () =>
      converter.craftable.map((c) => (
        <button
          className={`border ${
            converter.recipe.output === c.output
              ? "border-gold bg-gold/10"
              : "border-blue bg-blue/10"
          }`}
          key={c.output}
          onClick={() => {
            converter.selectRecipe(c.output);
            rerender(!r);
          }}
        >
          <div className="flex flex-row items-center justify-center">
            {Array.from(
              c.ingredients[0]
                .entries()
                .map(([item, quantity]) => (
                  <ItemIcon key={item} item={item} quantity={quantity} />
                ))
            )}
            <span className="">{"->"}</span>
            <ItemIcon item={c.output} />
          </div>
        </button>
      )),
    [r]
  );

  return <div className="flex flex-col space-y-1">{recipes}</div>;
}
