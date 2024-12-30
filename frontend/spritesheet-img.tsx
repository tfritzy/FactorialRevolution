import { spritesheetData, SpriteType } from "./pixi/spritesheet";

type Props = {
  sprite: SpriteType;
  scale: number;
};

export function SpritesheetImg(props: Props) {
  const frame = spritesheetData.frames[props.sprite];

  if (!frame) {
    console.warn(`No sprite data found for item: ${props.sprite}`);
    return null;
  }

  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        background: `url(${spritesheetData.meta.image})`,
        backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
        imageRendering: "pixelated",
        transform: `scale(${props.scale})`,
      }}
      role="img"
    />
  );
}
