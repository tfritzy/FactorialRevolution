import { useEffect, useState } from "react";
import { Tower } from "../src/component/tower";

type Props = {
  tower: Tower;
};

export function TowerInspector(props: Props) {
  const rerender = useState<number>(0)[1];
  const tower = props.tower;

  useEffect(() => {
    tower.onStatChange = () => rerender(Math.random());
  }, [rerender, tower]);

  return (
    <div className="text-sm">
      <div>
        Damage: <b>{tower.getDamage()}</b>
      </div>
      <div>
        Percent damage bonus: <b>{tower.getPercentDamageBonus()}% </b>
      </div>
      <div>
        Cooldown: <b>{tower.baseCooldown} seconds</b>
      </div>
      <div>
        Range: <b>{Math.sqrt(tower.getRangeSq())} tiles</b>
      </div>

      <div>
        Ammo: <b>{tower.ammoType}</b>
      </div>
    </div>
  );
}
