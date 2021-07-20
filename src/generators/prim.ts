import {BaseBoard, isEnabled} from "../base";
import {difference, getRandomFrom} from "../utils";
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
 * Ref: http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>): Board {
  let visitedCells = new Set<number>();
  const enabledCells = board.cells
    .map((_, i) => i)
    .filter((i) => isEnabled(board.cells[i]));
  let currentCell = getRandomFrom(enabledCells);
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
