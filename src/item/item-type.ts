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
  Galena: "lead-ore",
  LeadBar: "lead-bar",
  Coal: "coal",
  SteelPlate: "steel-plate",
  CopperSheetRoll: "copper-sheet-roll",

  // Tool
  Anvil: "anvil",
  Human: "human",
  CannonBarrel: "cannon-barrel",
  IronGear: "iron-gear",
  SteelGear: "steel-gear",

  // Electric
  CopperWire: "copper-wire",
  MetalRoller: "metal-roller",
  LargeElectricMotor: "large-electric-motor",
  ElectricMotor: "electric-motor",

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
  LightMachineGunAmmo: "light-machine-gun-ammo",
  MediumMachineGunAmmo: "medium-machine-gun-ammo",
  HeavyMachineGunAmmo: "heavy-machine-gun-ammo",

  // Tower components
  LightMachineGun: "light-machine-gun",
  MediumMachineGun: "medium-machine-gun",
  HeavyMachineGun: "heavy-machine-gun",

  // Towers
  Slinger: "slinger-item",
  ArcherTower: "archer-tower-item",
  Keep: "keep-item",
  Ballista: "ballista-item",
  OilTower: "oil-tower-item",
  Castle: "castle-item",
  CannonTower: "cannon-tower-item",
  BombardTower: "bombard-tower-item",
  LightMachineGunner: "light-machine-gunner-item",
  MediumMachineGunner: "medium-machine-gunner-item",
  HeavyMachineGunner: "heavy-machine-gunner-item",

  // Buildings
  Lumberyard: "lumberyard-item",
  Conveyor: "wooden-conveyor-item",
  Inserter: "wooden-inserter-item",
  Gunsmith: "gunsmith-item",
  MunitionsFactory: "munitions-factory-item",
  Crate: "crate-item",
  Mine: "mine-item",
  StoneCarver: "stone-carver-item",
  GatheringHut: "gathering-hut-item",
  Blacksmith: "blacksmith-item",
  StoneFurnace: "stone-furnace-item",
  SteelFurnace: "steel-furnace-item",
  MetalRollingMill: "metal-rolling-mill",
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
