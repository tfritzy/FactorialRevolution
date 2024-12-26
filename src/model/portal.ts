import { randomElement } from "../helpers/random";
import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { getEnemyForType } from "./enemies";
import { Speed } from "./enemy";
import { Entity } from "./entity";
import { BuildingTypes, EnemyType } from "./entity-type";

type WaveType = {
  name: string;
  speed: Speed;
  quantity: number;
  flying: boolean;
  minWave: number;
  possibleTypes: EnemyType[];
};
const waveTypes: WaveType[] = [
  {
    name: "Normal",
    speed: "normal",
    quantity: 10,
    flying: false,
    minWave: 0,
    possibleTypes: ["goblin", "slime", "Minotaur"],
  },
  {
    name: "Swarm",
    speed: "normal",
    quantity: 20,
    flying: false,
    minWave: 3,
    possibleTypes: ["slime"],
  },
  {
    name: "Speedsters",
    speed: "fast",
    quantity: 10,
    flying: false,
    minWave: 4,
    possibleTypes: ["doglike-thingy"],
  },
  {
    name: "Chonkers",
    speed: "slow",
    quantity: 10,
    flying: false,
    minWave: 5,
    possibleTypes: ["phat-walkey-guy", "armoured-walkey-guy"],
  },
  {
    name: "Lumberers",
    speed: "lumbering",
    quantity: 10,
    flying: false,
    minWave: 6,
    possibleTypes: ["giant"],
  },
  {
    name: "Hoarde",
    speed: "slow",
    quantity: 40,
    flying: false,
    minWave: 7,
    possibleTypes: ["basically-a-bloon"],
  },
  {
    name: "Flyers",
    speed: "normal",
    quantity: 10,
    flying: true,
    minWave: 8,
    possibleTypes: ["wisp"],
  },
  {
    name: "Flying swarm",
    speed: "normal",
    quantity: 20,
    flying: true,
    minWave: 9,
    possibleTypes: ["bat"],
  },
  {
    name: "Flying hoarde",
    speed: "normal",
    quantity: 40,
    flying: true,
    minWave: 10,
    possibleTypes: ["jellyfish"],
  },
  {
    name: "Speedster swarm",
    speed: "fast",
    quantity: 20,
    flying: false,
    minWave: 11,
    possibleTypes: [],
  },
];
const bossWave: WaveType = {
  name: "boss",
  speed: "normal",
  flying: false,
  minWave: 0,
  quantity: 1,
  possibleTypes: ["flayed-demon"],
};

type Wave = {
  name: string;
  quantity: number;
  type: EnemyType;
  index: number;
  perEnemyPower: number;
  remainingPower: number;
  timeBetweenSpawns: number;
};

export class Portal extends Building {
  public waveCooldown;
  public wave: number;
  public waves: Wave[] = [];

  private spawnCooldown: number = 0;

  public static WAVE_TIME = 240;
  public static WAVE_BASE_POWER = 10;
  public static SPAWN_DURATION = 15;

  constructor(pos: V2) {
    super(BuildingTypes.Portal, pos, 1, 1);
    this.initWaves();
    this.waveCooldown = Portal.WAVE_TIME;
    this.wave = 0;
  }

  initWaves(): void {
    for (let i = 1; i < 20; i++) {
      const waveType = Portal.rollWaveType(i);
      this.waves.push({
        index: i,
        name: waveType.name,
        quantity: waveType.quantity,
        type: randomElement(waveType.possibleTypes),
        perEnemyPower: this.getPowerForWave(i) / waveType.quantity,
        remainingPower: this.getPowerForWave(i),
        timeBetweenSpawns: waveType.quantity / Portal.SPAWN_DURATION,
      });
    }
  }

  static rollWaveType(i: number): WaveType {
    if (i % 5 === 0) {
      return bossWave;
    }

    const availableWaves = [];
    for (const wave of waveTypes) {
      if (i >= wave.minWave) {
        availableWaves.push(wave);
      }
    }

    return randomElement(availableWaves);
  }

  getPowerForWave(wave: number) {
    return Math.floor(Math.pow(1.4, wave) + 10 + wave * 4);
  }

  currentWave(): Wave {
    return this.waves[this.wave];
  }

  spawnEnemy() {
    const wave = this.currentWave();
    const pos = randomElement(this.occupied);
    const enemy = getEnemyForType(wave.type, pos, wave.perEnemyPower);
    this.game?.addEntity(enemy);
  }

  override tick(deltaTime_s: number): void {
    this.waveCooldown -= deltaTime_s;

    if (this.waveCooldown <= 0) {
      this.wave += 1;
      this.waveCooldown = Portal.WAVE_TIME;
    }

    if (this.wave > 0 && this.currentWave().remainingPower > 0) {
      this.spawnCooldown -= deltaTime_s;
      if (this.spawnCooldown <= 0) {
        this.spawnEnemy();
        this.currentWave().remainingPower -= this.currentWave().perEnemyPower;
        this.spawnCooldown = this.currentWave().timeBetweenSpawns;
      }
    }
  }
}
