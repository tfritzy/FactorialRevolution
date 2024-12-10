import { Item } from "./item";
import { ItemType } from "./item-type";

export class Stone extends Item
{
    constructor(quantity: number = 1)
    {
        super(ItemType.Stone, 1, quantity)
    }
}