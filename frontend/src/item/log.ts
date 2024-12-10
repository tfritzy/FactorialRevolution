import { Item } from "./item";
import { ItemType } from "./item-type";

export class Log extends Item
{
    constructor(quantity: number = 1)
    {
        super(ItemType.Log, 1, quantity)
    }
}