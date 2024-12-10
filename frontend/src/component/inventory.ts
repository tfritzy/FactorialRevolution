import { Item } from "../item/item";
import { Component } from "./component";
import { ComponentType } from "./component-type";

export class Inventory extends Component
{
    public width: number;
    public height: number;
    items: (Item | undefined)[][];

    constructor(width: number, height: number)
    {
        super(ComponentType.Inventory);
        this.width = width;
        this.height = height;
        this.items = this.initItems(width, height);
    }

    initItems(width: number, height: number): (Item | undefined)[][]
    {
        const items: (Item | undefined)[][] = [];
        for (let y = 0; y < height; y++)
        {
            items[y] = [];
            items[y][width - 1] = undefined;
        }

        return items;
    }

    addAt(item: Item, y: number, x: number): boolean
    {
        if (this.items[y][x] === undefined)
        {
            this.items[y][x] = item;
            return true;
        }

        const existingItem = this.items[y][x];
        if (existingItem.type === item.type)
        {
            const addable = existingItem.maxStack - existingItem.quantity;
            const toBeAdded = Math.min(addable, item.quantity);
            item.quantity -= toBeAdded;
            existingItem.quantity += toBeAdded;
        }

        return item.quantity === 0;
    }

    add(item: Item): boolean
    {
        const slot = this.firstOpenSlot();

        for (let y = 0; y < this.height; y++)
        {
            for (let x = 0; x < this.width; x++)
            {
                const slot = this.items[y][x];
                if (slot === undefined || (slot.type === item.type && slot.quantity < slot.maxStack))
                {
                    const allAdded = this.addAt(item, y, x);
                    if (allAdded)
                    {
                        return true;
                    }
                }
            }
        }

       return false;
    }

    get(y: number, x: number): Item | undefined
    {
        return this.items[y][x];
    }

    firstOpenSlot(): {x: number, y: number} | null
    {
        for (let y = 0; y < this.height; y++)
        {
            for (let x = 0; x < this.width; x++)
            {
                if (this.items[y][x] === undefined)
                {
                    return {x, y};
                }
            }
        }

        return null;
    }
}