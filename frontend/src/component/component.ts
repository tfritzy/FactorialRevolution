import { Entity } from "../model/entity";
import { ComponentType } from "./component-type";

export abstract class Component
{
    public type: ComponentType;
    public owner: Entity | undefined;
    
    constructor(type: ComponentType)
    {
        this.type = type;
    }

    tick(deltaTime_s: number) {}
}