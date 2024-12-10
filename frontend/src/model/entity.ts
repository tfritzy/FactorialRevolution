import { Component } from "../component/component";
import { ComponentType } from "../component/component-type";
import { generateId } from "../op/id-generator";
import { EntityType } from "./EntityType";

export class Entity
{
    public id: string;
    public type: EntityType;
    public components: Map<ComponentType, Component>;

    constructor(type: EntityType)
    {
        this.type = type;
        this.id = generateId(this.type);
        this.components = new Map();
    }
}