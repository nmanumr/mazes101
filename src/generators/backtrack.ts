import {BaseBoard} from "../base.js";
import {getRandomIndexFrom} from "../utils.js";
import { keys } from 'ts-transformer-keys';

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
 * Generates maze using BackTrace maze generation Algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>) {
  let visitedCells = new Set();
  let currentCell = getRandomIndexFrom(board.cells);
  visitedCells.add(currentCell);
  let pathStack = [currentCell];

  while (pathStack.length !== 0) {
    let path = fns.randomWalk(pathStack.pop(), board, fns.getNeighbours, (position: number, path: number[]) => {
      const cellNeighbours = fns.getNeighbours(position, board);
      const unvisitedNeighbours = cellNeighbours.filter((c) => !visitedCells.has(c));

      return unvisitedNeighbours.length > 0;
    });

    for (let i = 1; i < path.length; i++) {
      board = fns.removeInterWall(path[i-1], path[i], board);
    }
    pathStack = [...pathStack, ...path];
  }
}
