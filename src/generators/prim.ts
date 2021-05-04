import {BaseBoard} from "../base.js";
import {difference, getRandomFrom, getRandomIndexFrom} from "../utils.js";
import {keys} from "ts-transformer-keys";

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
 * Generates maze using Wilson's maze generation Algorithm
 *
 * Ref: https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm.html
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>): Board {
  let visitedCells = new Set<number>();
  let currentCell = getRandomIndexFrom(board.cells);
  let neighbourCells = new Set(fns.getNeighbours(currentCell, board));

  visitedCells.add(currentCell);

  while (neighbourCells.size > 0) {
    currentCell = getRandomFrom(Array.from(neighbourCells));
    let neighbours = new Set(fns.getNeighbours(currentCell, board));

    for (let neighbour of neighbours) {
      if (visitedCells.has(neighbour)) {
        board = fns.removeInterWall(neighbour, currentCell, board);

        neighbourCells.delete(currentCell);
        visitedCells.add(currentCell);

        neighbourCells = new Set([...neighbourCells, ...neighbours]);
        neighbourCells = difference(neighbourCells, visitedCells);
        break;
      }
    }
  }

  return board
}
