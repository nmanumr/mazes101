import {BaseBoard, isEnabled} from "../base.js";
import {getRandomFrom} from "../utils.js";
import {keys} from 'ts-transformer-keys';

/*--------------
 * Types
 *-------------- */

interface BoardFunctions<Board extends BaseBoard> {
  /** remove walls between given two cell indexes */
  removeInterWall(index1: number, index2: number, board: Board): Board;

  /** get cell neighbour */
  getNeighbours(index: number, board: Board): number[];
}

export const _required_fns = keys<BoardFunctions<BaseBoard>>();

/*---------------
 * Main function
 *--------------- */

/**
 * Generates maze using BackTrace maze generation Algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>) {
  let visitableCells = Array.from(board.cells)
    .map((_, i) => i)
    .filter((c) => isEnabled(c));

  let visitedCells = new Set();
  let currentCell = getRandomFrom(visitableCells);
  visitedCells.add(currentCell);
  let pathStack = [currentCell];

  while (pathStack.length !== 0) {
    currentCell = pathStack[pathStack.length - 1];

    let cellNeighbours = fns.getNeighbours(currentCell, board);
    const unvisitedNeighbours = cellNeighbours.filter((c) => !visitedCells.has(c));

    if (unvisitedNeighbours.length > 0) {
      let randomCell = getRandomFrom(unvisitedNeighbours);
      visitedCells.add(randomCell);
      board = fns.removeInterWall(currentCell, randomCell, board);
      pathStack.push(randomCell);
    } else {
      pathStack.pop();
    }
  }

  return board;
}
