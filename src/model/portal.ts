import { isTraversable } from "../helpers/grid-helpers";
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
  private spawnPoints: V2[] = [];

  public static readonly TREATY_DURATION = 300;
  public static readonly WAVE_TIME = 90;
  public static readonly WAVE_BASE_POWER = 10;
  public static readonly SPAWN_DURATION = 20;
  public static readonly BASE_ENEMIES_PER_WAVE = 10;
  public static readonly ENEMY_GROWTH_RATE = 1.2; // Exponential growth rate

  constructor(pos: V2) {
    super(BuildingTypes.Portal, pos, 1, 1);
    this.waveCooldown = Portal.TREATY_DURATION;
    this.wave = 0;
  }

  onAddToGrid(): void {
    this.findSpawnPoints();
    this.initWaves();
  }

  private findSpawnPoints(): void {
    if (!this.game) return;

    // Get all traversable tiles along the top edge of the map
    const topRow = 0;
    for (let x = 0; x < this.game.map[0].length; x++) {
      const pos = new V2(x, topRow);
      if (isTraversable(this.game, pos.y, pos.x)) {
        this.spawnPoints.push(pos);
      }
    }

    if (this.spawnPoints.length === 0) {
      console.error("No valid spawn points found along top edge!");
    }
  }

  private getEnemyQuantityForWave(waveIndex: number): number {
    // Exponential growth formula: BASE * (GROWTH_RATE ^ waveIndex)
    return Math.floor(
      Portal.BASE_ENEMIES_PER_WAVE *
        Math.pow(Portal.ENEMY_GROWTH_RATE, waveIndex)
    );
  }

  private initWaves(): void {
    for (let i = 1; i < 20; i++) {
      const waveType = Portal.rollWaveType(i);
      const quantity = this.getEnemyQuantityForWave(i);
      const totalPower = this.getPowerForWave(i);

      this.waves.push({
        index: i,
        name: waveType.name,
        quantity: quantity,
        type: waveType.possibleTypes[
          Math.floor(Math.random() * waveType.possibleTypes.length)
        ],
        perEnemyPower: totalPower / quantity,
        remainingPower: totalPower,
        timeBetweenSpawns: Portal.SPAWN_DURATION / quantity,
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

  private getNextSpawnPoint(): V2 {
    if (this.spawnPoints.length === 0) {
      // Fallback to center of top edge if no valid points
      return new V2(Math.floor(this.game?.map[0].length ?? 0 / 2), 0);
    }

    // Randomly select from available spawn points
    const index = Math.floor(Math.random() * this.spawnPoints.length);
    return this.spawnPoints[index];
  }

  private spawnEnemy(): void {
    if (!this.game) return;

    const wave = this.currentWave();
    const spawnPos = this.getNextSpawnPoint();
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
