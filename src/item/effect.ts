import { Entity } from "../model/entity";

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
