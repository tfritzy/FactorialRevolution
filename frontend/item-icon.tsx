import { Rarity } from "../src/item/rarity";
import { spritesheetData, SpriteType } from "./pixi/spritesheet";

type ItemIconProps = {
  item: SpriteType;
  quantity?: number;
  className?: string;
  rarity?: Rarity;
  size?: "large" | "medium" | "small" | "xsmall";
};

const SIZES = {
  large: 80,
  medium: 64,
  small: 52,
  xsmall: 16,
};

const SCALES = {
  large: 5,
  medium: 4,
  small: 3,
  xsmall: 2,
};

export const ItemIcon = ({
  item,
  quantity,
  size = "small",
  rarity,
}: ItemIconProps) => {
  const frame = spritesheetData.frames[item];

  const width = SIZES[size];
  const scale = SCALES[size];

  if (!frame) {
    console.warn(`No sprite data found for item: ${item}`);
    return null;
  }

  return (
    <div
      className={`relative pointer-events-none inline-flex items-center justify-center`}
      style={{
        width: width,
        height: width,
      }}
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
        title={quantity ? `${quantity} x ${item}` : item}
      />
      {quantity !== undefined && quantity > 1 && (
        <div className="absolute bottom-1 right-1 text-2xl font-bold outline-text leading-none font-mono">
          {quantity.toFixed(0)}
        </div>
      )}
    </div>
  );
};
