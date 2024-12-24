import { V2 } from "../numerics/v2";
import { Enemy, Speed } from "./enemy";
import { EnemyType, EnemyTypes, EntityTypes } from "./entity-type";

export function getEnemyForType(type: EnemyType, pos: V2, power: number) {
  switch (type) {
    case EnemyTypes.Goblin:
      return new Goblin(pos, power);
    case EnemyTypes.Minotaur:
      return new Minotaur(pos, power);
    case EnemyTypes.Slime:
      return new Slime(pos, power);
    case EnemyTypes.Lizard:
      return new Lizard(pos, power);
    case EnemyTypes.DoglikeThingy:
      return new DoglikeThingy(pos, power);
    case EnemyTypes.PhatWalkeyGuy:
      return new PhatWalkeyGuy(pos, power);
    case EnemyTypes.ArmoredWalkeyGuy:
      return new ArmoredWalkeyGuy(pos, power);
    case EnemyTypes.Giant:
      return new Giant(pos, power);
    case EnemyTypes.BasicallyABloon:
      return new BasicallyABloon(pos, power);
    case EnemyTypes.Wisp:
      return new Wisp(pos, power);
    case EnemyTypes.Bat:
      return new Bat(pos, power);
    case EnemyTypes.Jellyfish:
      return new Jellyfish(pos, power);
    case EnemyTypes.FlayedDemon:
      return new FlayedDemon(pos, power);
    default:
      throw new Error("No enemy for", type);
  }
}

export class Goblin extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Goblin, pos, power, "normal");
  }
}

export class Minotaur extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Minotaur, pos, power, "normal");
  }
}

export class Slime extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Slime, pos, power / 2, "normal");
  }
}

export class Lizard extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Lizard, pos, power, "normal");
  }
}

export class DoglikeThingy extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.DoglikeThingy, pos, power, "fast");
  }
}

export class PhatWalkeyGuy extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.PhatWalkeyGuy, pos, power, "slow");
  }
}

export class ArmoredWalkeyGuy extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.ArmoredWalkeyGuy, pos, power, "slow");
  }
}

export class Giant extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Giant, pos, power, "lumbering");
  }
}

export class BasicallyABloon extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.BasicallyABloon, pos, power, "normal");
  }
}

export class Wisp extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Wisp, pos, power, "normal", true);
  }
}

export class Bat extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Bat, pos, power, "normal", true);
  }
}

export class Jellyfish extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.Jellyfish, pos, power, "slow", true);
  }
}

export class FlayedDemon extends Enemy {
  constructor(pos: V2, power: number) {
    super(EntityTypes.FlayedDemon, pos, power, "slow", true);
  }
}
