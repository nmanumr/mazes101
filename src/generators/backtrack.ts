import {BaseBoard, isEnabled} from "../base";
import {getRandomFrom} from "../utils";
import {keys} from 'ts-transformer-keys';
import * as MovesRegister from '../movesRegister';
import {PartialExcept} from "../types";

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
export function generate<Board extends BaseBoard>(
  board: Board,
  fns: BoardFunctions<Board>,
  movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'>
    = {register: (...args) => undefined, Type: MovesRegister.Type}
) {

  movesRegister.register(movesRegister.Type.RESET_MOVES);
  let visitableCells = Array.from(board.cells)
    .map((_, i) => i)
    .filter((c) => isEnabled(c));

  let visitedCells = new Set();
  let currentCell = getRandomFrom(visitableCells);
  visitedCells.add(currentCell);
  let pathStack = [currentCell];

  movesRegister.register(movesRegister.Type.CREATE_CELL_GROUP, {id: 0, initialCellIdx: [currentCell]});

  while (pathStack.length !== 0) {
    currentCell = pathStack[pathStack.length - 1];

    let cellNeighbours = fns.getNeighbours(currentCell, board);
    const unvisitedNeighbours = cellNeighbours.filter((c) => !visitedCells.has(c));

    if (unvisitedNeighbours.length > 0) {
      let randomCell = getRandomFrom(unvisitedNeighbours);
      visitedCells.add(randomCell);
      board = fns.removeInterWall(currentCell, randomCell, board);
      pathStack.push(randomCell);

      movesRegister.register(movesRegister.Type.APPEND_CELL_GROUP, {id: 0, cellIdx: randomCell});
    } else {
      let id = pathStack.pop() as number;
      movesRegister.register(movesRegister.Type.POP_CELL_GROUP, {id: 0, cellIdx: id});
    }
  }

  return board;
}
