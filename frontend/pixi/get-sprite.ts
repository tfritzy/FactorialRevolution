import { Sprite, Spritesheet } from "pixi.js";
import { WORLD_TO_CANVAS } from "./constants";

export function getSprite(
  sheet: Spritesheet,
  textureName: string,
  y: number,
  x: number,
  layer: number,
  subLayer: number
): Sprite {
  const texture = sheet.textures[textureName];
  if (!texture) {
    console.warn("unable to find texture: " + textureName);
  } else {
    texture.source.scaleMode = "nearest";
  }

  const sprite = new Sprite(texture);
  sprite.position.y = y * WORLD_TO_CANVAS;
  sprite.position.x = x * WORLD_TO_CANVAS;
  sprite.width = (texture.width / 32) * WORLD_TO_CANVAS;
  sprite.height = (texture.height / 32) * WORLD_TO_CANVAS;
  sprite.zIndex = layer + subLayer + y / 10000;

  return sprite;
}
