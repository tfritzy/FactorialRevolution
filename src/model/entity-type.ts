export const BuildingTypes = {
  GatheringHut: "gathering-hut",
  Lumberyard: "lumberyard",
  Blacksmith: "blacksmith",
  Weaver: "weaver",
  Fletcher: "fletcher",
  Crate: "crate",
  StoneMiner: "stone-miner",
  WoodenInserter: "wooden-inserter",
  WoodenConveyor: "wooden-conveyor",
} as const;

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes];

export const EntityTypes = {
  ...BuildingTypes,
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
