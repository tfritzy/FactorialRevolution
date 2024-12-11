export class GridHelper {
    /**
     * Iterates over all positions within range of a center position,
     * calling the callback for each valid position
     */
    static forEachTileInRange<T>(
        grid: T[][],
        centerX: number,
        centerY: number,
        range: number,
        callback: (x: number, y: number, value: T) => void
    ): void {
        const startX = Math.max(0, Math.floor(centerX - range));
        const endX = Math.min(grid[0].length - 1, Math.floor(centerX + range));
        const startY = Math.max(0, Math.floor(centerY - range));
        const endY = Math.min(grid.length - 1, Math.floor(centerY + range));
        
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                callback(x, y, grid[y][x]);
            }
        }
    }

    /**
     * Counts tiles that match a predicate within range of a center position
     */
    static countTilesInRange<T>(
        grid: T[][],
        centerX: number,
        centerY: number,
        range: number,
        predicate: (value: T) => boolean
    ): number {
        let count = 0;
        const startX = Math.max(0, Math.floor(centerX - range));
        const endX = Math.min(grid[0].length - 1, Math.floor(centerX + range));
        const startY = Math.max(0, Math.floor(centerY - range));
        const endY = Math.min(grid.length - 1, Math.floor(centerY + range));
        
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (predicate(grid[y][x])) count++;
            }
        }
        return count;
    }
}