export const RelicTypes = {
  SpikedClub: "spiked-club",
  RifleScope: "rifle-scope",
  CrowsNest: "crows-nest",
  LlamaHoof: "lucky-llama-hoof",
} as const;
export type RelicType = (typeof RelicTypes)[keyof typeof RelicTypes];

export const ItemTypes = {
  // wood
  Log: "log",
  Board: "board",
  Beam: "beam",
  Stick: "stick",

  // stone
  Stone: "stone",
  StoneBlock: "stone-block",

  // Food
  Wheat: "wheat",
  Berries: "berries",

  // Metal
  IronBar: "iron-bar",
  IronOre: "iron-ore",
  CopperOre: "copper-ore",
  CopperBar: "copper-bar",

  // Tool
  Anvil: "anvil",
  Hoe: "hoe",
  Knife: "knife",
  Chisel: "chisel",
  Saw: "saw",
  Axe: "axe",
  Pickaxe: "pickaxe",
  Human: "human",
  CannonBarrel: "cannon-barrel",

  // Projectiles
  StoneArrow: "stone-arrow",
  IronArrow: "iron-arrow",
  CopperArrow: "copper-arrow",
  Arrowhead: "arrowhead",
  IronArrowhead: "iron-arrowhead",
  CopperArrowhead: "copper-arrowhead",
  Cannonball: "cannonball",
  BallistaBolt: "ballista-bolt",

  // Towers
  Slinger: "slinger",
  Keep: "keep",
  Ballista: "ballista",
  OilTower: "oil-tower",
  Castle: "castle",
  BombardTower: "bombard-tower",

  // Buildings
  Lumberyard: "lumberyard",
  WoodenConveyor: "wooden-conveyor",
  Inserter: "wooden-inserter",
  Crate: "crate",
  Mine: "mine",
  StoneCarver: "stone-carver",
  GatheringHut: "gathering-hut",
  Blacksmith: "blacksmith",
  Furnace: "furnace",
  Fletcher: "fletcher",
  WheatFarm: "wheat-farm",
  WoodShop: "wood-shop",
  Portal: "portal",
  Town: "town",
  PalisadeWall: "palisade-wall-item",

  // core
  Core: "core",
  ...RelicTypes,
} as const;
export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes];
