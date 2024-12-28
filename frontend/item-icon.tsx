import { ItemType } from "../src/item/item-type";
import { spritesheetData } from "./pixi/spritesheet";

type ItemIconProps = {
  item: ItemType;
  quantity?: number;
  className?: string;
  scale?: number;
};

export const ItemIcon = ({
  item,
  quantity,
  className = "",
  scale = 2,
}: ItemIconProps) => {
  const frame = spritesheetData.frames[item];

  if (!frame) {
    console.warn(`No sprite data found for item: ${item}`);
    return null;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center w-10 h-10 ${className}`}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          background: `url(${spritesheetData.meta.image})`,
          backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
          imageRendering: "pixelated",
          transform: `scale(${scale})`,
        }}
        role="img"
        aria-label={item}
        title={quantity ? `${quantity} x ${item}` : item}
      />
      {quantity !== undefined && quantity > 1 && (
        <div className="absolute bottom-0 right-1 text-lg font-bold outline-text leading-none font-mono">
          {quantity}
        </div>
      )}
    </div>
  );
};
