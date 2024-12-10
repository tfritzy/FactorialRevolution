import { generateId } from "../op/id-generator";
import { ItemType } from "./item-type";

export class Item
{
    public id: string;
    public type: ItemType;
    public maxStack: number;
    public quantity: number;

    constructor(type: ItemType, maxStack: number, quantity: number = 1)
    {
        this.type = type;
        this.id = generateId(type.toString());
        this.maxStack = maxStack;
        this.quantity = quantity;
    }
}