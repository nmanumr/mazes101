import {BaseBoard, isEnabled} from "../base.js";
import {getRandomIndexFrom, getRandomFrom} from "../utils.js";
import {isFromSameSet, ItemSets, joinItemSets} from "./_pathSet.js";
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
 * Generates maze using kruskal's maze generation Algorithm
 *
 * Ref: https://weblog.jamisbuck.org/2011/1/3/maze-generation-kruskal-s-algorithm
 */
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>) {
  let pathSets: ItemSets<number> = [];

  for (let i = 0; i < board.cells.length; i++) {
    if (!isEnabled(board.cells[i])) continue;
    pathSets.push(new Set([i]));
  }

  // FIXME: if maze is disjoint by disabled cell it will stuck in infinite loop
  while (pathSets.length > 1) {
    const randomCell = getRandomIndexFrom(board.cells);
    if (!isEnabled(board.cells[randomCell])) continue;

    const neighbours = fns.getNeighbours(randomCell, board).filter((c) => isEnabled(board.cells[c]));
    const randomNeighbour = getRandomFrom(neighbours);

    if (isFromSameSet(randomCell, randomNeighbour, pathSets)) continue;

    board = fns.removeInterWall(randomCell, randomNeighbour, board);
    pathSets = joinItemSets(randomCell, randomNeighbour, pathSets);
  }

  return board;
}
