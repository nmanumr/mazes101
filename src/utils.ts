/*-----------------
 * Array Related
 *----------------- */

/**
 * returns a new array with item elements shuffled
 */
export function shuffle<T>(array: T[]): T[] {
  let out = array.slice(0);

  for (let i = out.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);

    const temp = out[i - 1];
    out[i - 1] = out[randomIndex];
    out[randomIndex] = temp;
  }

  return out;
}

/**
 * returns a random element from given array
 */
export function getRandomFrom<T>(list: ArrayLike<T>): T {
  return list[getRandomIndexFrom(list)];
}

/**
 * return random element index from given array
 */
export function getRandomIndexFrom<T>(list: ArrayLike<T>): number {
  return Math.round(Math.random() * (list.length - 1));
}
