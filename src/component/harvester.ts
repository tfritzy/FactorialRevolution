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

type HarvestDetails = HarvestType & {
  baseRate: number;
  remainingTime: number;
};

export class Harvester extends Component {
  public range: number;
  public harvestRatePerTile_ips: number;
  public energy_kwh: number = 0;
  public energyConsumption_kw: number | undefined;
  public harvestRates: HarvestDetails[] = [];
  public onEnergyChange: (() => void) | undefined;

  private readonly harvestTypes: HarvestType[];

  constructor({
    harvestTypes,
    range,
    harvestRatePerTile,
    energyConsumption_kw = undefined,
  }: {
    harvestTypes: HarvestType[];
    range: number;
    harvestRatePerTile: number;
    energyConsumption_kw?: number;
  }) {
    super(ComponentType.Harvester);
    this.range = range;
    this.harvestRatePerTile_ips = harvestRatePerTile;
    this.energyConsumption_kw = energyConsumption_kw;
    this.harvestTypes = harvestTypes;
  }

  override onAddToGrid(): void {
    const pos = this.owner?.pos;
    const game = this.owner?.game;

    if (!pos || !game) return;

    this.harvestRates = this.harvestTypes.map((harvestType) => {
      const tilesInRange = GridHelper.countTilesInRange(
        game.map,
        pos.x,
        pos.y,
        this.range,
        (type) => type === harvestType.from
      );

      const baseRate = tilesInRange * this.harvestRatePerTile_ips;

      return {
        ...harvestType,
        baseRate,
        remainingTime: baseRate > 0 ? 1 / baseRate : Infinity,
      };
    });
  }

  override tick(deltaTime_s: number) {
    const pos = this.owner?.pos;
    const game = this.owner?.game;
    const inventory = this.owner?.inventory();

    if (!pos || !game || !inventory) return;

    const fuel = this.owner?.fuel();
    if (this.energyConsumption_kw && fuel) {
      this.energy_kwh -= (this.energyConsumption_kw * deltaTime_s) / 3600;
      this.energy_kwh = Math.max(0, this.energy_kwh);
      this.onEnergyChange?.();

      if (this.energy_kwh <= 0) {
        const withdrawn = fuel.withdrawFirstItem(1);
        this.energy_kwh += withdrawn?.energy_kwh ?? 0;
      }
    }

    const energyPenalty =
      this.energyConsumption_kw === undefined || this.energy_kwh > 0 ? 1 : 0.3;

    for (let i = 0; i < this.harvestRates.length; i++) {
      if (this.harvestRates[i].baseRate <= 0) continue;

      this.harvestRates[i].remainingTime -= deltaTime_s * energyPenalty;

      if (this.harvestRates[i].remainingTime <= 0) {
        inventory.add(new Item(this.harvestRates[i].to, 1));
        this.harvestRates[i].remainingTime = 1 / this.harvestRates[i].baseRate;
      }
    }
  }
}
