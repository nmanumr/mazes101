import {BaseBoard} from "../base";
import {getItemSet, isFromSameSet, ItemSets, joinItemSets} from "./_pathSet";
import {getRandomFrom, shuffle} from "../utils";
import {keys} from "ts-transformer-keys";

/*--------------
 * Types
 *-------------- */

interface BoardFunctions<Board extends BaseBoard> {
  /** returns array of set of cell indexes in a row */
  getRows(board: Board): number[][];

  /** remove walls between given two cell indexes */
  removeInterWall(index1: number, index2: number, board: Board): Board;

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
 * Generates maze using Eller's maze generation Algorithm
 *
 * Ref: https://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>): Board {
  if (!fns.getFactor) {
    // if fns object is freezed, this will make it a normal object.
    fns = {...fns};
    fns.getFactor = () => Math.random();
  }

  let pathSets: ItemSets<number> = [];
  const rows = fns.getRows(board);

  // create pathSet for each cell in first row
  for (let index of rows[0]) {
    pathSets.push(new Set([index]));
  }

  for (let i = 0; i < rows.length - 1; i++) {
    let row = rows[i];
    [board, pathSets] = visitRow(row, i, false, board, pathSets, fns);
    [board, pathSets] = connectToOtherRow(row, rows[i + 1], board, pathSets, fns);
  }

  [board, pathSets] = visitRow(rows[rows.length - 1], rows.length - 1, true, board, pathSets, fns);
  // TODO: if pathSets have length greater than 1 try to merge the path sets
  return board;
}

/*------------------
 * Helper functions
 *------------------ */

/**
 * Visit row cells and randomly merge them
 */
export function visitRow<Board extends BaseBoard>(
  row: number[],
  rowIndex: number,
  mergeAll: boolean,
  board: Board,
  pathSets: ItemSets<number>,
  fns: BoardFunctions<Board>
): [Board, ItemSets<number>] {
  for (let i = 1; i < row.length; i++) {
    if (getItemSet(row[i - 1], pathSets) == null) {
      pathSets.push(new Set([row[i - 1]]));
    }
    if (getItemSet(row[i], pathSets) == null) {
      pathSets.push(new Set([row[i]]));
    }

    // check if cells are neighbours
    let neighbours = fns.getNeighbours(row[i - 1], board);
    if (!neighbours.includes(row[i])) continue;

    if (isFromSameSet(row[i - 1], row[i], pathSets)) {
      continue;
    }

    if (Math.random() > fns.getFactor(rowIndex) || mergeAll) {
      board = fns.removeInterWall(row[i - 1], row[i], board);
      pathSets = joinItemSets(row[i - 1], row[i], pathSets);
    }
  }

  return [board, pathSets];
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
    let n = 1 + Math.round(Math.random() * (rowCells.length - 1));
    for (let i = 0; i < n; i++) {
      const cell = rowCells[i];
      const nextRowCells = fns.getNeighbours(cell, board).filter((c) => nextRow.includes(c));
      const nextCell = getRandomFrom(nextRowCells);

      if (nextCell === undefined || nextCell === null) {
        continue;
      }
      board = fns.removeInterWall(cell, nextCell, board);
      set.add(nextCell);
    }
  }

  return [board, pathSets];
}
