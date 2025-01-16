import { Entity } from "../model/entity";
import { BleedingStatus } from "../status/bleeding-status";
import { BurningStatus } from "../status/burning-status";
import { FrozenStatus } from "../status/frozen-status";
import { PoisonStatus } from "../status/poison-status";

export type Effect = {
  name: string;
  apply: (entity: Entity) => void;
};

export const percentAttackSpeed = (percent: number): Effect => ({
  name: `+${(percent * 100).toFixed(0)}% faster attack speed`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ attackSpeedPct: percent });
    }
  },
});

export const critHitChanceEffect = (percent: number): Effect => ({
  name: `+${percent}% crit hit chance`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ critHitChance: percent });
    }
  },
});

export const percentDamageEffect = (percent: number): Effect => ({
  name: `+${percent}% damage`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ percentDamage: percent });
    }
  },
});

export const flatDamageEffect = (damage: number): Effect => ({
  name: `+${damage} damage`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ damage: damage });
    }
  },
});

export const rangeEffect = (range: number): Effect => ({
  name: `+${range} range`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ range: range });
    }
  },
});

export const poisonEffect = (stacks: number): Effect => ({
  name: `${stacks} poison`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ statusEffect: new PoisonStatus(stacks) });
    }
  },
});

export const freezeEffect = (stacks: number): Effect => ({
  name: `${stacks}s freeze`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity.tower()!.addBonusStats({ statusEffect: new FrozenStatus(stacks) });
    }
  },
});

export const bleedEffect = (stacks: number): Effect => ({
  name: `${stacks} bleed`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity
        .tower()!
        .addBonusStats({ statusEffect: new BleedingStatus(stacks) });
    }
  },
});

export const burnEffect = (stacks: number): Effect => ({
  name: `${stacks} burn`,
  apply: (entity: Entity) => {
    if (entity.tower()) {
      entity
        .tower()!
        .addBonusStats({ statusEffect: new BurningStatus(stacks) });
    }
  },
});
