import { Item } from "../../src/item/item";
import { getRarityColor } from "./get-rarity-color";

type Props = {
  item: Item;
};

export function ItemInspector(props: Props) {
  const item = props.item;

  if (item.effects?.length) {
    return (
      <div className="text-white p-2 w-max text-left">
        <div
          className="p-1 font-bold mb-2"
          style={{ color: item.rarity && getRarityColor(item.rarity) }}
        >
          {item.name}
        </div>
        <ul>
          {item.effects.map((e) => (
            <li>{e.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div className="w-max text-white px-1">{item.name}</div>;
  }
}
