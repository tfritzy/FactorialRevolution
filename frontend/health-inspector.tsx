import { useEffect, useState } from "react";
import { Health } from "../src/component/health";

type Props = {
  health: Health;
};

export function HealthInspector(props: Props) {
  const rerender = useState<number>(0)[1];
  const health = props.health;

  useEffect(() => {
    props.health.onChange = () => rerender(Math.random());
  }, [props.health, rerender]);

  return (
    <div className="w-full h-5 bg-blue relative">
      <div
        className="h-full absolute left-0 top-0 bg-rouge-800 text-center"
        style={{ width: `${(health.health / health.maxHealth) * 100}%` }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-md font-semibold">
        {`${health.health}/${health.maxHealth}`}
      </div>
    </div>
  );
}
