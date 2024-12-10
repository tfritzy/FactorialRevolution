import { Item } from "./item";
import { ItemType } from "./item-type";

export class IronBar extends Item
{
    constructor(quantity: number = 1)
    {
        super(ItemType.IronBar, 4, quantity)
    }
}