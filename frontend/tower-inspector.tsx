import { useState } from "react";
import { Tower } from "../src/component/tower";

type Props = {
  tower: Tower;
};

export function TowerInspector(props: Props) {
  const rerender = useState<number>(0)[1];
  const tower = props.tower;

  //   useEffect(() => {
  //     props.health.onChange = () => rerender(Math.random());
  //   }, [props.health, rerender]);

  return (
    <div className="text-sm">
      <div>
        Damage: <b>{tower.damage}</b>
      </div>
      <div>
        Cooldown: <b>{tower.baseCooldown} seconds</b>
      </div>
      <div>
        Range: <b>{Math.sqrt(tower.rangeSq)} tiles</b>
      </div>
      <div>
        Ammo: <b>{tower.ammoType}</b>
      </div>
    </div>
  );
}
