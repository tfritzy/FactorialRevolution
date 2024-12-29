export function randomElement<T>(list: T[]) {
  const element = Math.floor(Math.random() * list.length);
  return list[Math.min(element, list.length - 1)];
}

export function randomInt<T>(size: number) {
  return Math.min(Math.floor(Math.random() * size), size - 1);
}

export function select3Random<T>(array: T[]) {
  const result = [];
  const len = array.length;

  if (len <= 3) return [...array];

  const used = new Set();
  while (used.size < 3) {
    const index = Math.floor(Math.random() * len);
    if (!used.has(index)) {
      used.add(index);
      result.push(array[index]);
    }
  }

  return result;
}
