import { Component } from "../component/component";
import { ComponentType } from "../component/component-type";
import { Harvester } from "../component/harvester";
import { Inventory } from "../component/inventory";
import { V2 } from "../numerics/v2";
import { generateId } from "../op/id-generator";
import { EntityType } from "./EntityType";
import { Game } from "./game";

export class Entity
{
    public id: string;
    public type: EntityType;
    public components: Map<ComponentType, Component>;
    public pos: V2;
    public game: Game | undefined;

    constructor(type: EntityType, pos: V2)
    {
        this.type = type;
        this.id = generateId(this.type);
        this.components = new Map();
        this.pos = pos;
        this.initComponents();
        this.claimOwnership();
    }

    inventory(): Inventory | undefined
    {
        return this.components.get(ComponentType.Inventory) as Inventory;
    }

    harvester(): Harvester | undefined
    {
        return this.components.get(ComponentType.Harvester) as Harvester;
    }

    tick(deltaTime_s: number)
    {
        this.components.forEach(component => {
            component.tick(deltaTime_s);
        });
    }

    initComponents() {}

    claimOwnership() {
        this.components.forEach(component => {
            component.owner = this;
        })
    }
}