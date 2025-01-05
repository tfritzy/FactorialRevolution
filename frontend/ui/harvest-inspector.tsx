import { Harvester } from "../../src/component/harvester";
import { ItemIcon } from "../item-icon";

export function HarvestInspect({ harvester }: { harvester: Harvester }) {
  return (
    <div className="flex flex-row">
      {harvester.harvestRates
        .filter((hr) => hr.baseRate > 0)
        .map((hr, i) => (
          <div key={i}>
            {hr.to.map((r) => (
              <ItemIcon key={r} item={r} quantity={hr.baseRate * 60} />
            ))}
          </div>
        ))}
    </div>
  );
}
