export function init2dArray<T>(
  width: number,
  height: number,
  defaultValue?: T
): T[][] {
  const items: T[][] = [];
  for (let y = 0; y < height; y++) {
    items[y] = [];
    for (let x = 0; x < width; x++) {
      items[y][x] = defaultValue as T;
    }
  }
  return items;
}
