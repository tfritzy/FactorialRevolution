import { ComponentType } from "../component/component-type";
import { Harvester } from "../component/harvester";
import { Inventory } from "../component/inventory";
import { ItemType } from "../item/item-type";
import { TileType } from "../map/tile-type";
import { V2 } from "../numerics/v2";
import { Entity } from "./entity";
import { EntityType } from "./EntityType";

export class Lumberyard extends Entity
{
    constructor(pos: V2)
    {
        super(EntityType.Lumberyard, pos);
    }

    override initComponents(): void {
        this.components.set(ComponentType.Inventory, new Inventory(4, 1));
        this.components.set(ComponentType.Harvester, new Harvester([{from: TileType.Tree, to: ItemType.Log}], 2, 0.05));
    }
}