import { Rarity } from "./rarity";

export function coreNameGenerator(rarity: Rarity) {
  // Different prefix pools based on rarity
  const prefixesByRarity = {
    common: ["Sturdy", "Simple", "Basic", "Rough", "Plain"],
    magic: ["Fierce", "Sharp", "Strong", "Quick", "Hardy"],
    rare: ["Blessed", "Sacred", "Mystic", "Royal", "Ancient"],
    legendary: ["Godly", "Celestial", "Divine", "Mythical", "Eternal"],
    unique: ["Cruel", "Thorned", "Burning", "Storm", "Shadow"],
  };

  // Different suffix pools based on rarity
  const suffixesByRarity = {
    common: ["of Iron", "of Stone", "of Skill", "of Health", "of Defense"],
    magic: ["of Power", "of Speed", "of Grace", "of Might", "of Vigor"],
    rare: [
      "of the Wolf",
      "of the Bear",
      "of the Eagle",
      "of Thunder",
      "of Light",
    ],
    legendary: [
      "of the Phoenix",
      "of the Dragon",
      "of the Titans",
      "of Dominion",
      "of Glory",
    ],
    unique: [
      "of the Apocalypse",
      "of Annihilation",
      "of Devastation",
      "of Cataclysm",
      "of Eternity",
    ],
  };

  // Probability settings based on rarity
  const raritySettings: Record<
    Rarity,
    { prefixChance: number; suffixChance: number }
  > = {
    common: { prefixChance: 0.3, suffixChance: 0.3 },
    magic: { prefixChance: 0.5, suffixChance: 0.5 },
    rare: { prefixChance: 0.7, suffixChance: 0.7 },
    legendary: { prefixChance: 0.9, suffixChance: 0.9 },
  };

  // Get the appropriate pools based on rarity
  const prefixes = prefixesByRarity[rarity];
  const suffixes = suffixesByRarity[rarity];
  const { prefixChance, suffixChance } = raritySettings[rarity];

  // Random selection from each array
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const itemType = "Core";
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // Apply rarity-based probability for prefix/suffix
  const hasPrefix = Math.random() < prefixChance;
  const hasSuffix = Math.random() < suffixChance;

  let name = "";
  if (hasPrefix) name += prefix + " ";
  name += itemType;
  if (hasSuffix) name += " " + suffix;

  return name;
}
