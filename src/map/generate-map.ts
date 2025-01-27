import { TileType } from "./tile-type";

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 15;
  const gradX = (h < 8 ? 1 : -1) * (h & 1);
  const gradY = h < 4 ? 1 : h === 12 || h === 14 ? -1 : 0;
  return gradX * x + gradY * y;
}

function generatePermutationTable(): number[] {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return [...p, ...p];
}

function generateNoise(
  x: number,
  y: number,
  scale: number,
  perm: number[]
): number {
  const sX = x / scale;
  const sY = y / scale;
  const xFloor = Math.floor(sX);
  const yFloor = Math.floor(sY);
  const topRight = grad(
    perm[perm[xFloor + 1] + yFloor],
    sX - xFloor - 1,
    sY - yFloor
  );
  const topLeft = grad(perm[perm[xFloor] + yFloor], sX - xFloor, sY - yFloor);
  const bottomRight = grad(
    perm[perm[xFloor + 1] + yFloor + 1],
    sX - xFloor - 1,
    sY - yFloor - 1
  );
  const bottomLeft = grad(
    perm[perm[xFloor] + yFloor + 1],
    sX - xFloor,
    sY - yFloor - 1
  );
  const xFade = fade(sX - xFloor);
  const yFade = fade(sY - yFloor);
  return lerp(
    yFade,
    lerp(xFade, topLeft, topRight),
    lerp(xFade, bottomLeft, bottomRight)
  );
}

function ensureResourceDistribution(
  map: TileType[][],
  width: number,
  height: number
): TileType[][] {
  const sectionSize = 50;
  const modifiedMap = map.map((row) => [...row]);

  // Process each 50x50 section
  for (let sectionY = 0; sectionY < height; sectionY += sectionSize) {
    for (let sectionX = 0; sectionX < width; sectionX += sectionSize) {
      const sectionEndY = Math.min(sectionY + sectionSize, height);
      const sectionEndX = Math.min(sectionX + sectionSize, width);

      let hasIron = false;
      let hasCopper = false;
      let hasCoal = false;
      let hasLead = false;

      // Check if section has all resources
      for (let y = sectionY; y < sectionEndY; y++) {
        for (let x = sectionX; x < sectionEndX; x++) {
          if (modifiedMap[y][x] === TileType.Iron) hasIron = true;
          if (modifiedMap[y][x] === TileType.Copper) hasCopper = true;
          if (modifiedMap[y][x] === TileType.Coal) hasCoal = true;
          if (modifiedMap[y][x] === TileType.Lead) hasLead = true;
        }
      }

      // Find suitable locations (grass tiles) in the section
      const grassLocations: [number, number][] = [];
      for (let y = sectionY; y < sectionEndY; y++) {
        for (let x = sectionX; x < sectionEndX; x++) {
          if (modifiedMap[y][x] === TileType.Grass) {
            grassLocations.push([x, y]);
          }
        }
      }

      // Shuffle grass locations
      for (let i = grassLocations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grassLocations[i], grassLocations[j]] = [
          grassLocations[j],
          grassLocations[i],
        ];
      }

      // Add missing resources
      if (!hasIron && grassLocations.length > 0) {
        const [x, y] = grassLocations.pop()!;
        modifiedMap[y][x] = TileType.Iron;
      }
      if (!hasCopper && grassLocations.length > 0) {
        const [x, y] = grassLocations.pop()!;
        modifiedMap[y][x] = TileType.Copper;
      }
      if (!hasCoal && grassLocations.length > 0) {
        const [x, y] = grassLocations.pop()!;
        modifiedMap[y][x] = TileType.Coal;
      }
      if (!hasLead && grassLocations.length > 0) {
        const [x, y] = grassLocations.pop()!;
        modifiedMap[y][x] = TileType.Lead;
      }
    }
  }

  return modifiedMap;
}

function placeSulfurFeatures(
  map: TileType[][],
  width: number,
  height: number
): void {
  // Configuration
  const mapArea = width * height;
  const desiredCaveCount = Math.floor(mapArea / 10000); // One cave per 10000 tiles
  const desiredPoolCount = Math.floor(mapArea / 8000); // Slightly more pools than caves

  // Grid-based placement to ensure better distribution
  const gridSize = Math.floor(Math.sqrt(mapArea / desiredCaveCount));

  // Place caves using grid system
  for (let gridY = 0; gridY < height; gridY += gridSize) {
    for (let gridX = 0; gridX < width; gridX += gridSize) {
      if (Math.random() < 0.7) {
        // 70% chance to place a cave in each grid cell
        // Random position within the grid cell
        const offsetX = Math.floor(Math.random() * gridSize);
        const offsetY = Math.floor(Math.random() * gridSize);
        const x = gridX + offsetX;
        const y = gridY + offsetY;

        if (x < width && y < height && map[y][x] === TileType.Grass) {
          map[y][x] = TileType.Cave;

          // Add smaller deposits around the main cave (1-2 deposits)
          const smallDeposits = Math.floor(Math.random() * 2) + 1;
          for (let i = 0; i < smallDeposits; i++) {
            const depositX = x + Math.floor(Math.random() * 5) - 2;
            const depositY = y + Math.floor(Math.random() * 5) - 2;

            if (
              depositX >= 0 &&
              depositX < width &&
              depositY >= 0 &&
              depositY < height &&
              map[depositY][depositX] === TileType.Grass
            ) {
              map[depositY][depositX] = TileType.Cave;
            }
          }
        }
      }
    }
  }

  // Place sulfur pools randomly but with minimum distance checking
  const minDistanceBetweenPools = Math.floor(gridSize / 2);
  const pools: Array<{ x: number; y: number }> = [];
  let attempts = 0;
  const maxAttempts = desiredPoolCount * 10;

  while (pools.length < desiredPoolCount && attempts < maxAttempts) {
    attempts++;
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (map[y][x] !== TileType.Grass) continue;

    // Check minimum distance from other pools
    const tooClose = pools.some((pool) => {
      const dx = pool.x - x;
      const dy = pool.y - y;
      return Math.sqrt(dx * dx + dy * dy) < minDistanceBetweenPools;
    });

    if (!tooClose) {
      map[y][x] = TileType.SulfurPool;
      pools.push({ x, y });

      // Add some smaller pools around the main one (0-2 additional pools)
      const additionalPools = Math.floor(Math.random() * 3);
      for (let i = 0; i < additionalPools; i++) {
        const poolX = x + Math.floor(Math.random() * 3) - 1;
        const poolY = y + Math.floor(Math.random() * 3) - 1;

        if (
          poolX >= 0 &&
          poolX < width &&
          poolY >= 0 &&
          poolY < height &&
          map[poolY][poolX] === TileType.Grass
        ) {
          map[poolY][poolX] = TileType.SulfurPool;
        }
      }
    }
  }
}

export function generateMap(
  width: number,
  height: number,
  scale: number = 100,
  resourceScale: number = 32,
  treeScale: number = 2,
  berryScale: number = 2
): TileType[][] {
  const map: TileType[][] = [];
  const terrainPerm = generatePermutationTable();
  const ironPerm = generatePermutationTable();
  const copperPerm = generatePermutationTable();
  const stonePerm = generatePermutationTable();
  const coalPerm = generatePermutationTable();
  const leadPerm = generatePermutationTable();
  const treePerm = generatePermutationTable();
  const berryPerm = generatePermutationTable();

  for (let y = 0; y < height; y++) {
    map[y] = [];
    for (let x = 0; x < width; x++) {
      // Generate base terrain noise
      const terrainNoise = generateNoise(x, y, scale, terrainPerm);
      const normalizedTerrainNoise = (terrainNoise + 1) / 2;

      // Generate separate noise for each resource type
      const treeNoise = generateNoise(x, y, treeScale, treePerm);
      const normalizedTreeNoise = (treeNoise + 1) / 2;

      const ironNoise = generateNoise(x, y, resourceScale, ironPerm);
      const normalizedIronNoise = (ironNoise + 1) / 2;

      const copperNoise = generateNoise(x, y, resourceScale, copperPerm);
      const normalizedCopperNoise = (copperNoise + 1) / 2;

      const stoneNoise = generateNoise(x, y, resourceScale, stonePerm);
      const normalizedStoneNoise = (stoneNoise + 1) / 2;

      const coalNoise = generateNoise(x, y, resourceScale, coalPerm);
      const normalizedCoalNoise = (coalNoise + 1) / 2;

      const leadNoise = generateNoise(x, y, resourceScale, leadPerm);
      const normalizedLeadNoise = (leadNoise + 1) / 2;

      const berryNoise = generateNoise(x, y, berryScale, berryPerm);
      const normalizedBerryNoise = (berryNoise + 1) / 2;

      // Determine tile type
      let tileType: TileType;
      if (normalizedTerrainNoise < 0.3) {
        tileType = TileType.Water;
      } else {
        tileType = TileType.Grass;

        // Define thresholds for each resource type
        const treeThreshold = 0.65;
        const resourceThreshold = 0.7;
        const berryThreshold = 0.75;

        // Check each resource type independently
        const resources = [
          { type: TileType.Iron, noise: normalizedIronNoise },
          { type: TileType.Copper, noise: normalizedCopperNoise },
          { type: TileType.Stone, noise: normalizedStoneNoise },
          { type: TileType.Coal, noise: normalizedCoalNoise },
          { type: TileType.Lead, noise: normalizedLeadNoise },
        ];

        const strongestResource = resources.reduce((prev, current) =>
          current.noise > prev.noise ? current : prev
        );

        if (normalizedTreeNoise > treeThreshold) {
          tileType = TileType.Tree;
        } else if (strongestResource.noise > resourceThreshold) {
          tileType = strongestResource.type;
        } else if (normalizedBerryNoise > berryThreshold) {
          tileType = TileType.BerryBush;
        }
      }
      map[y][x] = tileType;
    }
  }

  // Place sulfur features after initial map generation
  placeSulfurFeatures(map, width, height);

  // Ensure resource distribution
  return ensureResourceDistribution(map, width, height);
}
