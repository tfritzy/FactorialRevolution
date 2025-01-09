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
  PineLog: "pine-log",
  Board: "board",
  Beam: "beam",
  Stick: "stick",
  Niter: "Niter",
  Charcoal: "charcoal",
  Gunpowder: "gunpowder",
  Sulfur: "sulfur",

  // stone
  Stone: "stone",
  StoneBlock: "stone-block",

  // Food
  Food: "food",

  // Metal
  IronBar: "iron-bar",
  IronOre: "iron-ore",
  CopperOre: "copper-ore",
  CopperBar: "copper-bar",
  Coal: "coal",
  SteelPlate: "steel-plate",

  // Tool
  Anvil: "anvil",
  Human: "human",
  CannonBarrel: "cannon-barrel",
  IronGear: "iron-gear",

  // Projectiles
  StoneArrow: "stone-arrow",
  IronArrow: "iron-arrow",
  CopperArrow: "copper-arrow",
  Arrowhead: "arrowhead",
  IronArrowhead: "iron-arrowhead",
  CopperArrowhead: "copper-arrowhead",
  Cannonball: "cannonball",
  GrapeCannonShot: "grape-cannon-shot",
  CarcassCannonShot: "carcass-cannon-shot",
  ExplosiveCannonShot: "explosive-cannon-shot",
  BallistaBolt: "ballista-bolt",

  // Towers
  Slinger: "slinger-item",
  ArcherTower: "archer-tower-item",
  Keep: "keep-item",
  Ballista: "ballista-item",
  OilTower: "oil-tower-item",
  Castle: "castle-item",
  CannonTower: "cannon-tower-item",
  BombardTower: "bombard-tower-item",

  // Buildings
  Lumberyard: "lumberyard-item",
  Conveyor: "wooden-conveyor-item",
  Inserter: "wooden-inserter-item",
  Crate: "crate-item",
  Mine: "mine-item",
  StoneCarver: "stone-carver-item",
  GatheringHut: "gathering-hut-item",
  Blacksmith: "blacksmith-item",
  StoneFurnace: "stone-furnace-item",
  Fletcher: "fletcher-item",
  SteamMiningDrill: "steam-mining-drill-item",
  WheatFarm: "wheat-farm-item",
  WoodShop: "wood-shop-item",
  Portal: "portal-item",
  Town: "town-item",
  PalisadeWall: "palisade-wall-item",

  // core
  Core: "core",
  ...RelicTypes,
} as const;
export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes];
