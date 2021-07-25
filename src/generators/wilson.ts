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

  randomWalk(
    startPosition: number, board: Board,
    getNeighbours: (index: number, board: Board) => number[],
    until: (position: number, path: number[]) => boolean
  ): number[]
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
    let randomCell = getRandomIndexFrom(board.cells);

    // make random walk until not reached some visited cell
    let path = fns.randomWalk(
      randomCell, board,
      fns.getNeighbours,
      (cell, path) => {
        if (path.includes(cell)) {
          const i = path.indexOf(cell);
          path.splice(i, path.length);
        }

        return !visitedCells.has(cell);
      }
    );

    // remove wall between cells of path
    for (let i = 1; i < path.length; i++) {
      board = fns.removeInterWall(path[i - 1], path[i], board);
    }

    // mark all the path cells as visited
    visitedCells = new Set([...visitedCells, ...path]);
  }

  return board
}
