import { V2 } from "../numerics/v2";
import { Building } from "./building";
import { getEnemyForType } from "./enemies";
import { Speed } from "./enemy";
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
  // ... other wave types remain the same
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
  enemiesSpawned: number;
};

export class Portal extends Building {
  public waveCooldown: number;
  public wave: number;
  public waves: Wave[] = [];
  private spawnCooldown: number = 0;

  public static readonly TREATY_DURATION = 120;
  public static readonly WAVE_TIME = 90;
  public static readonly WAVE_BASE_POWER = 10;
  public static readonly SPAWN_DURATION = 20;
  public static readonly BASE_ENEMIES_PER_WAVE = 10;

  constructor(pos: V2) {
    super(BuildingTypes.Portal, pos, 1, 1);
    this.waveCooldown = Portal.TREATY_DURATION;
    this.wave = 0;
  }

  onAddToGrid(): void {
    this.initWaves();
  }

  private initWaves(): void {
    for (let i = 1; i < 20; i++) {
      const waveType = Portal.rollWaveType(i);
      const totalPower = this.getPowerForWave(i);

      this.waves.push({
        index: i,
        name: waveType.name,
        quantity: waveType.quantity,
        type: waveType.possibleTypes[
          Math.floor(Math.random() * waveType.possibleTypes.length)
        ],
        perEnemyPower: totalPower / waveType.quantity,
        remainingPower: totalPower,
        timeBetweenSpawns: Portal.SPAWN_DURATION / waveType.quantity,
        enemiesSpawned: 0,
      });
    }
  }

  private static rollWaveType(i: number): WaveType {
    if (i % 5 === 0) {
      return bossWave;
    }

    const availableWaves = waveTypes.filter((wave) => i >= wave.minWave);
    return availableWaves[Math.floor(Math.random() * availableWaves.length)];
  }

  private getPowerForWave(wave: number): number {
    // Exponential power scaling
    return Math.floor(Math.pow(1.8, wave) + 15 + wave * 8);
  }

  private currentWave(): Wave {
    return this.waves[this.wave];
  }

  private spawnEnemy(): void {
    if (!this.game) return;

    const wave = this.currentWave();
    const spawnPos = this.pos;
    const enemy = getEnemyForType(wave.type, spawnPos, wave.perEnemyPower);

    this.game.addEntity(enemy);
    wave.enemiesSpawned++;
  }

  override tick(deltaTime_s: number): void {
    if (!this.game) return;

    this.waveCooldown -= deltaTime_s;

    if (this.waveCooldown <= 0) {
      this.wave += 1;
      this.waveCooldown = Portal.WAVE_TIME;
    }

    const currentWave = this.currentWave();
    if (
      this.wave > 0 &&
      currentWave.remainingPower > 0 &&
      currentWave.enemiesSpawned < currentWave.quantity
    ) {
      this.spawnCooldown -= deltaTime_s;
      if (this.spawnCooldown <= 0) {
        this.spawnEnemy();
        currentWave.remainingPower -= currentWave.perEnemyPower;
        this.spawnCooldown = currentWave.timeBetweenSpawns;
      }
    }
  }
}
