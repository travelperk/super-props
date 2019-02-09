export function error(message) {
  return new Error(`[TKType] ${message}`);
}

export function randomNumber({ min = -100, max = 100, integer = true } = {}) {
  const number = Math.random() * (max - min + 1) + min;
  return integer ? Math.floor(number) : number;
}

export function choose(array) {
  return array[randomNumber({ min: 0, max: array.length - 1 })];
}
