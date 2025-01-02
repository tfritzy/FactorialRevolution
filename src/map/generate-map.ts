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
  scale: number = 16,
  resourceScale: number = 10,
  treeScale: number = 16,
  berryScale: number = 2
): TileType[][] {
  const map: TileType[][] = [];
  const terrainPerm = generatePermutationTable();
  const ironPerm = generatePermutationTable();
  const copperPerm = generatePermutationTable();
  const stonePerm = generatePermutationTable();
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
        // Use Math.max to determine which resource has the strongest presence at this point
        const resources = [
          { type: TileType.Iron, noise: normalizedIronNoise },
          { type: TileType.Copper, noise: normalizedCopperNoise },
          { type: TileType.Stone, noise: normalizedStoneNoise },
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

  // Ensure resource distribution
  return ensureResourceDistribution(map, width, height);
}
