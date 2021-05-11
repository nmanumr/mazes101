/**
 * returns a new array with item elements shuffled
 */
import {BaseBoard} from "./base";

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

export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let _diff = new Set<T>(setA);
  for (let elem of setB) {
    _diff.delete(elem)
  }
  return _diff;
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

/** return a random int between min (inclusive) and max (exclusive) */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
