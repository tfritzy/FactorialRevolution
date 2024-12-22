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
} as const;

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes];

export const EntityTypes = {
  ...BuildingTypes,
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
