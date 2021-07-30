import {BaseBoard} from "../base";
import {getRandomIndexFrom} from "../utils";
import {keys} from "ts-transformer-keys";
import {PartialExcept} from "../types";
import * as MovesRegister from "../movesRegister";

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
 * Generates maze using AldousBroder's maze generation Algorithm
 *
 * Ref: https://weblog.jamisbuck.org/2011/1/17/maze-generation-aldous-broder-algorithm
 *
 * NOTE: don't using this algorithm for any real maze generation. theoretically, it can
 * take forever to generate any reasonable sized maze.
 */
export function generate<Board extends BaseBoard>(
  board: Board,
  fns: BoardFunctions<Board>,
  movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'>
    = {register: (...args) => undefined, Type: MovesRegister.Type}
): Board {
  movesRegister.register(movesRegister.Type.RESET_MOVES);
  let visitedCells = new Set();
  let currentCell = getRandomIndexFrom(board.cells);
  visitedCells.add(currentCell);

  while (visitedCells.size < board.cells.length) {
    const cellNeighbours = fns.getNeighbours(currentCell, board);

    let randomCell = cellNeighbours[Math.round((cellNeighbours.length - 1) * Math.random())];
    if (!visitedCells.has(randomCell)) {
      board = fns.removeInterWall(randomCell, currentCell, board)
      visitedCells.add(randomCell);
    }

    currentCell = randomCell;
  }

  return board
}
