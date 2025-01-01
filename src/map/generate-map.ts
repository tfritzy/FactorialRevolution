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

      // Check if section has both resources
      for (let y = sectionY; y < sectionEndY; y++) {
        for (let x = sectionX; x < sectionEndX; x++) {
          if (modifiedMap[y][x] === TileType.Iron) hasIron = true;
          if (modifiedMap[y][x] === TileType.Copper) hasCopper = true;
        }
      }

      // If missing either resource, add it
      if (!hasIron || !hasCopper) {
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
      }
    }
  }

  return modifiedMap;
}

export function generateMap(
  width: number,
  height: number,
  scale: number = 8,
  resourceScale: number = 4,
  treeScale: number = 8,
  berryScale: number = 6
): TileType[][] {
  const map: TileType[][] = [];
  const terrainPerm = generatePermutationTable();
  const resourcePerm = generatePermutationTable();
  const treePerm = generatePermutationTable();
  const mineralPerm = generatePermutationTable();
  const berryPerm = generatePermutationTable();

  for (let y = 0; y < height; y++) {
    map[y] = [];
    for (let x = 0; x < width; x++) {
      // Generate base terrain noise
      const terrainNoise = generateNoise(x, y, scale, terrainPerm);
      const normalizedTerrainNoise = (terrainNoise + 1) / 2;

      // Generate separate noise for trees, minerals, and berries
      const treeNoise = generateNoise(x, y, treeScale, treePerm);
      const normalizedTreeNoise = (treeNoise + 1) / 2;
      const mineralNoise = generateNoise(x, y, resourceScale, mineralPerm);
      const normalizedMineralNoise = (mineralNoise + 1) / 2;
      const berryNoise = generateNoise(x, y, berryScale, berryPerm);
      const normalizedBerryNoise = (berryNoise + 1) / 2;

      // Determine base terrain type
      let tileType: TileType;
      if (normalizedTerrainNoise < 0.3) {
        tileType = TileType.Water;
      } else {
        tileType = TileType.Grass;

        // Create peaked clusters for resources
        const treeThreshold = 0.65;
        const mineralThreshold = 0.68;
        const berryThreshold = 0.7; // Higher threshold for more scattered berry bushes

        // Check for trees only in high peaks of tree noise
        if (normalizedTreeNoise > treeThreshold) {
          tileType = TileType.Tree;
        }
        // Check for minerals only in high peaks of mineral noise
        else if (normalizedMineralNoise > mineralThreshold) {
          // Use relative noise values to determine mineral type
          const mineralTypeNoise = generateNoise(
            x,
            y,
            resourceScale * 2,
            resourcePerm
          );
          if (mineralTypeNoise > 0.33) {
            tileType = TileType.Iron;
          } else if (mineralTypeNoise > -0) {
            tileType = TileType.Copper;
          } else {
            tileType = TileType.Stone;
          }
        }
        // Check for berry bushes
        else if (normalizedBerryNoise > berryThreshold) {
          tileType = TileType.BerryBush;
        }
      }
      map[y][x] = tileType;
    }
  }

  // Ensure resource distribution
  return ensureResourceDistribution(map, width, height);
}
