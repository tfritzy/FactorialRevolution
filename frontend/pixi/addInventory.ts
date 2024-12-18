import { Container, Graphics } from "pixi.js";
import { Button } from "@pixi/ui";

export function addInventory(container: Container) {
  const button = new Button(new Graphics().rect(0, 0, 100, 50).fill(0xffffff));
  button.onPress.connect(() => console.log("Button pressed!"));

  container.addChild(button.view);
}
