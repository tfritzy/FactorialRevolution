export function randomElement<T>(list: T[]) {
  const element = Math.floor(Math.random() * list.length);
  return list[Math.min(element, list.length - 1)];
}

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomInt(size: number) {
  return Math.min(Math.floor(Math.random() * size), size - 1);
}

export function selectNRandom<T>(array: T[], n: number) {
  const result = [];
  const len = array.length;

  if (len <= n) return [...array];

  const used = new Set();
  while (used.size < n) {
    const index = Math.floor(Math.random() * len);
    if (!used.has(index)) {
      used.add(index);
      result.push(array[index]);
    }
  }

  return result;
}

export function select3Random<T>(array: T[]) {
  return selectNRandom(array, 3);
}
