import { Item } from "../item/item";
import { ComponentType } from "./component-type";
import { TileType } from "../map/tile-type";
import { ItemType } from "../item/item-type";
import { Component } from "./component";
import { GridHelper } from "../helpers/grid-helpers";

type HarvestType = {
  from: TileType;
  to: ItemType;
};

export class Harvester extends Component {
  public harvestTypes: HarvestType[];
  public range: number;
  public harvestRatePerTile_ips: number;
  private harvestCooldown: number;

  constructor(
    harvestTypes: HarvestType[],
    range: number,
    harvestRatePerTile: number
  ) {
    super(ComponentType.Harvester);
    this.harvestTypes = harvestTypes;
    this.range = range;
    this.harvestRatePerTile_ips = harvestRatePerTile;
    this.harvestCooldown = 0;
  }

  override tick(deltaTime_s: number) {
    const pos = this.owner?.pos;
    const game = this.owner?.game;
    const inventory = this.owner?.inventory();
    if (!pos) return;
    if (!game) return;
    if (!inventory) return;

    this.harvestTypes.forEach((ht) => {
      const tilesInRange = GridHelper.countTilesInRange(
        game.map,
        pos.x,
        pos.y,
        this.range,
        (type) => type === ht.from
      );
      if (tilesInRange === 0) return;

      const secondsPerItem = 1 / (tilesInRange * this.harvestRatePerTile_ips);
      this.harvestCooldown -= deltaTime_s;
      if (this.harvestCooldown <= 0) {
        inventory.add(new Item(ht.to, 1));
        this.harvestCooldown = secondsPerItem;
      }
    });
  }
}
