import { ItemTypes } from "../item/item-type";
import { recipes } from "../model/crafting-recipes";
import { ComponentType } from "./component-type";
import { Converter } from "./converter";

export class Smelter extends Converter {
  public energy: number;
  public energyLossSpeed: number;

  ENERGY_LOSS_RATE_KWH_S = 0.02;

  constructor(speed: number, energyLossSpeed: number) {
    super({
      craftable: [recipes[ItemTypes.CopperBar], recipes[ItemTypes.IronBar]],
      speed: speed,
      craftEverything: true,
      type: ComponentType.Smelter,
    });
    this.energy = 0;
    this.energyLossSpeed = energyLossSpeed;
  }

  override tick(deltaTime_s: number): void {
    if (this.energy <= 0 && !this.owner?.inputs()?.isEmpty()) {
      const fuel = this.owner?.fuel();
      if (fuel) {
        const withdrawn = fuel.withdrawFirstItem(1);
        if (withdrawn?.energy_kwh) {
          this.energy += withdrawn.energy_kwh;
        }
      }
    }

    if (this.energy >= 0) {
      this.energy -=
        deltaTime_s * this.ENERGY_LOSS_RATE_KWH_S * this.energyLossSpeed;

      super.tick(deltaTime_s);
    }
  }
}
