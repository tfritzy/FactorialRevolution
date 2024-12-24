export const BuildingTypes = {
  GatheringHut: "gathering-hut",
  Lumberyard: "lumberyard",
  Blacksmith: "blacksmith",
  Furnace: "furnace",
  Fletcher: "fletcher",
  Crate: "crate",
  StoneMiner: "stone-miner",
  WoodenInserter: "wooden-inserter",
  WoodenConveyor: "wooden-conveyor",
  WheatFarm: "wheat-farm",
  WoodShop: "wood-shop",
  Portal: "portal",
  HomePortal: "home-portal",
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
