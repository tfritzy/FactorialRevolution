import { Entity } from "./entity";
import { EntityType } from "./EntityType";

export class Building extends Entity
{
    constructor(type: EntityType)
    {
        super(type);
    }
}