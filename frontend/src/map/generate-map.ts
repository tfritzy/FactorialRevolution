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
    const gradY = (h < 4 ? 1 : h === 12 || h === 14 ? -1 : 0);
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

export function generateMap(width: number, height: number, scale: number = 20): TileType[][] {
    const map: TileType[][] = [];
    const perm = generatePermutationTable();

    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            const sX = x / scale;
            const sY = y / scale;
            const xFloor = Math.floor(sX);
            const yFloor = Math.floor(sY);
            
            const topRight = grad(perm[perm[xFloor + 1] + yFloor], sX - xFloor - 1, sY - yFloor);
            const topLeft = grad(perm[perm[xFloor] + yFloor], sX - xFloor, sY - yFloor);
            const bottomRight = grad(perm[perm[xFloor + 1] + yFloor + 1], sX - xFloor - 1, sY - yFloor - 1);
            const bottomLeft = grad(perm[perm[xFloor] + yFloor + 1], sX - xFloor, sY - yFloor - 1);

            const xFade = fade(sX - xFloor);
            const yFade = fade(sY - yFloor);

            const noise = lerp(
                yFade,
                lerp(xFade, topLeft, topRight),
                lerp(xFade, bottomLeft, bottomRight)
            );

            // Map noise value (-1 to 1) to tile types
            const normalizedNoise = (noise + 1) / 2;
            if (normalizedNoise < 0.3) map[y][x] = TileType.Water;
            else if (normalizedNoise < 0.6) map[y][x] = TileType.Grass;
            else map[y][x] = TileType.Cliff;
        }
    }
    return map;
}