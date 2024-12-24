export function randomElement<T>(list: T[]) {
  const element = Math.floor(Math.random() * list.length);
  return list[Math.min(element, list.length - 1)];
}

export function randomInt<T>(size: number) {
  return Math.min(Math.floor(Math.random() * size), size - 1);
}
