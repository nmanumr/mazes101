import {BaseBoard} from "../base.js";
import {getRandomFrom, shuffle} from "../utils.js";
import {keys} from "ts-transformer-keys";
import {ItemSets} from "./_pathSet";
import {visitRow} from './eller.js';

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

export const _required_fns = keys<Omit<BoardFunctions<BaseBoard>, 'getFactor'>>();

/*---------------
 * Main function
 *--------------- */

/**
 * Generates maze using sidewinder maze generation Algorithm
 *
 * Ref: https://weblog.jamisbuck.org/2011/2/3/maze-generation-sidewinder-algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>) {
  let rows = fns.getRows(board);
  let pathSets: ItemSets<number> = [];

  if (!fns.getFactor) {
    fns.getFactor = () => 0.5;
  }

  [board, pathSets] = visitRow(rows[0], 0, true, board, pathSets, fns);

  for (let i = 1; i < rows.length; i++) {
    [board, pathSets] = visitRow(rows[i], i, false, board, pathSets, fns);
    [board, pathSets] = connectToOtherRow(rows[i], rows[i - 1], board, pathSets, fns);
  }

  return board;
}

/** open passages between the cells of current row and the next row */
export function connectToOtherRow<Board extends BaseBoard>(
  row: number[],
  nextRow: number[],
  board: Board,
  pathSets: ItemSets<number>,
  fns: BoardFunctions<Board>
): [Board, ItemSets<number>] {
  for (let set of pathSets) {
    let rowCells = Array.from(set).filter((index) => row.includes(index));
    rowCells = shuffle(rowCells);

    let cell = getRandomFrom(rowCells);
    if (cell === undefined || cell === null) {
      continue;
    }

    const otherRowCells = fns.getNeighbours(cell, board).filter((c) => nextRow.includes(c));
    const otherCell = getRandomFrom(otherRowCells);
    if (otherCell === undefined || otherCell === null) {
      continue;
    }

    board = fns.removeInterWall(cell, otherCell, board);
    set.add(otherCell);
  }

  return [board, pathSets];
}
