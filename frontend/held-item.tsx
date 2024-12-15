import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import React, { useState } from "react";
import { ItemIcon } from "./item-icon";
import { V2 } from "../src/numerics/v2";

export const HeldItem = () => {
  const [mousePos, setMousePos] = useState<V2>(V2.zero());
  const { heldItem } = useSelector((state: RootState) => state.ui);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos(new V2(e.clientX, e.clientY));
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!heldItem) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: mousePos.x, top: mousePos.y }}
    >
      <ItemIcon item={heldItem.type} quantity={heldItem.quantity} />
    </div>
  );
};
