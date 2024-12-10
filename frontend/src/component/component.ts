import { ComponentType } from "./component-type";

export class Component
{
    public type: ComponentType;
    
    constructor(type: ComponentType)
    {
        this.type = type;
    }
}