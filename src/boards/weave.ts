import {isEnabled} from "../base";
import {RectangularBoard} from "./rectangular";

export interface WeaveBoard extends RectangularBoard {
}

/**
 * Get neighbour cells of the given position
 */
export function getNeighbours(index: number, {cells, size}: WeaveBoard): number[] {
  let neighboursCells: number[] = [];

  // TOP
  if (index >= size.width) {
    let cell = cells[index - size.width];
    if ((cell & 0b000_1111) === 0b000_1010 && index - size.width >= size.width) {
      neighboursCells.push(index - size.width - size.width);
    } else {
      neighboursCells.push(index - size.width);
    }
  }
  // RIGHT
  if ((index + 1) % size.width !== 0) {
    let cell = cells[index + 1];
    if ((cell & 0b000_1111) === 0b000_0101 && (index + 2) % size.width !== 0) {
      neighboursCells.push(index + 2);
    } else {
      neighboursCells.push(index + 1);
    }
  }
  // BOTTOM
  if (index < cells.length - size.width) {
    let cell = cells[index + size.width];
    if ((cell & 0b000_1111) === 0b000_1010 && (index + size.width) < cells.length - size.width) {
      neighboursCells.push(index + size.width + size.width);
    } else {
      neighboursCells.push(index + size.width);
    }
  }
  // LEFT
  if (index % size.width != 0) {
    let cell = cells[index - 1];
    if ((cell & 0b000_1111) === 0b000_0101 && (index - 1) % size.width != 0) {
      neighboursCells.push(index - 2);
    } else {
      neighboursCells.push(index - 1);
    }
  }

  neighboursCells = neighboursCells.filter((i) => isEnabled(cells[i]));

  return neighboursCells;
}

export * from './rectangular';
