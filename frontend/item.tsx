import { Item as ItemModel } from "../src/item/item";
import { ItemIcon } from "./item-icon";
import { ItemInspector } from "./ui/item-inspector";
import { Tooltip } from "./ui/tooltip";

type Props = {
  item: ItemModel;
  size?: "large" | "medium" | "small";
};

export function UiItem(props: Props) {
  return (
    <Tooltip tooltip={<ItemInspector item={props.item} />}>
      <ItemIcon
        item={props.item.type}
        size={props.size}
        rarity={props.item.rarity}
        quantity={props.item.quantity}
      />
    </Tooltip>
  );
}
