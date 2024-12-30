export type Rarity = "common" | "magic" | "rare" | "legendary";

export function rollRarity(): Rarity {
  const roll = Math.random() * 100;

  if (roll < 50) return "common";
  if (roll < 80) return "magic";
  if (roll < 95) return "rare";
  else return "legendary";
}
