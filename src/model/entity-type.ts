export const BuildingTypes = {
  GatheringHut: "gathering-hut",
  Lumberyard: "lumberyard",
  Blacksmith: "blacksmith",
  StoneFurnace: "stone-furnace",
  SteelFurnace: "steel-furnace",
  MetalRollingMill: "metal-rolling-mill",
  Fletcher: "fletcher",
  Crate: "crate",
  Mine: "mine",
  StoneCarver: "stone-carver",
  WoodenInserter: "wooden-inserter",
  Conveyor: "conveyor",
  WheatFarm: "wheat-farm",
  WoodShop: "wood-shop",
  Portal: "portal",
  Town: "town",
  Slinger: "slinger",
  Keep: "keep",
  ArcherTower: "archer-tower",
  Ballista: "ballista",
  OilTower: "oil-tower",
  Castle: "castle",
  CannonTower: "cannon-tower",
  BombardTower: "bombard-tower",
  PalisadeWall: "palisade-wall",
  SteamMiningDrill: "steam-mining-drill",
  MunitionsFactory: "munitions-factory",
  Gunsmith: "gunsmith",
  LightMachineGunner: "light-machine-gunner",
  MediumMachineGunner: "medium-machine-gunner",
  HeavyMachineGunner: "heavy-machine-gunner",
} as const;

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes];

export const EnemyTypes = {
  Goblin: "goblin",
  Minotaur: "Minotaur",
  Slime: "slime",
  Lizard: "lizard",
  DoglikeThingy: "doglike-thingy",
  PhatWalkeyGuy: "phat-walkey-guy",
  ArmoredWalkeyGuy: "armoured-walkey-guy",
  Giant: "giant",
  BasicallyABloon: "basically-a-bloon",
  Wisp: "wisp",
  Bat: "bat",
  Jellyfish: "jellyfish",
  FlayedDemon: "flayed-demon",
} as const;
export type EnemyType = (typeof EnemyTypes)[keyof typeof EnemyTypes];

export const EntityTypes = {
  ...BuildingTypes,
  ...EnemyTypes,
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
