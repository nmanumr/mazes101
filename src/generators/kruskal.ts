import {BaseBoard} from "../base";
import {getRandomIndexFrom, getRandomFrom} from "../utils";
import {isFromSameSet, ItemSets, joinItemSets} from "./_pathSet";

/*--------------
 * Types
 *-------------- */

interface BoardFunctions<Board extends BaseBoard> {
  /** remove walls between given two cell indexes */
  removeInterWall(index1: number, index2: number, board: Board): Board;

  /** get cell neighbour */
  getNeighbours(index: number, board: Board): number[];
}


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

  for (let cell of board.cells) {
    pathSets.push(new Set([cell]));
  }

  while (pathSets.length > 1) {
    const randomCell = getRandomIndexFrom(board.cells);
    const neighbours = fns.getNeighbours(randomCell, board);
    const randomNeighbour = getRandomFrom(neighbours);

    if (isFromSameSet(randomCell, randomNeighbour, pathSets)) continue;

    board = fns.removeInterWall(randomCell, randomNeighbour, board);
    pathSets = joinItemSets(randomCell, randomNeighbour, pathSets);
  }

  return board;
}
