import {BaseBoard} from "../base";
import {getRandomFrom, getRandomInt} from "../utils";

/*--------------
 * Types
 *-------------- */

interface BoardFunctions<Board extends BaseBoard> {
  /** remove walls between given two cell indexes */
  removeInterWall(index1: number, index2: number, board: Board): Board;

  /** returns array of set of cell indexes in a row */
  getRows(board: Board): number[][];

  /** get cell neighbour */
  getNeighbours(index: number, board: Board): number[];

  /**
   * should return a number between 0 - 1
   * default is 0.5
   * greater the number longer the vertical passages
   * shorter the number longer the horizontal passages
   */
  getFactor?(rowIndex: number): number;
}

/*---------------
 * Main function
 *--------------- */

/**
 * Generates maze using sidewinder maze generation Algorithm
 *
 * Ref:https://weblog.jamisbuck.org/2011/2/3/maze-generation-sidewinder-algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>) {
  let rows = fns.getRows(board);

  if (!fns.getFactor) {
    fns.getFactor = () => 0.5;
  }

  for (let i = 1; i < rows[0].length; i++) {
    board = fns.removeInterWall(rows[0][i], rows[0][i - 1], board);
  }

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    let joinedCells = 0;

    for (let cellIndex = 1; cellIndex < rows[rowIndex].length; cellIndex++) {
      if (Math.random() > fns.getFactor(rowIndex)) {
        board = fns.removeInterWall(rows[rowIndex][cellIndex - 1], rows[rowIndex][cellIndex], board);
        joinedCells++;
      } else {
        const h = getRandomInt(cellIndex - 1 - joinedCells, cellIndex);
        let neighbours = fns.getNeighbours(rows[rowIndex][h], board);
        let previousRowNeighbours = neighbours.filter((n) => rows[rowIndex - 1].includes(n));

        board = fns.removeInterWall(getRandomFrom(previousRowNeighbours), rows[rowIndex][h], board);
        joinedCells = 0;
      }
    }

    const h = getRandomInt(rows[rowIndex].length - joinedCells - 1, rows[rowIndex].length);
    let neighbours = fns.getNeighbours(rows[rowIndex][h], board);
    let previousRowNeighbours = neighbours.filter((n) => rows[rowIndex - 1].includes(n));

    board = fns.removeInterWall(getRandomFrom(previousRowNeighbours), rows[rowIndex][h], board);
  }

  return board;
}
