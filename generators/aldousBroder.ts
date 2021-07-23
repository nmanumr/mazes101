import { BaseBoard } from "../base.ts";
import { getRandomIndexFrom } from "../utils.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
}
export const _required_fns = ["removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>): Board {
    let visitedCells = new Set();
    let currentCell = getRandomIndexFrom(board.cells);
    visitedCells.add(currentCell);
    while (visitedCells.size < board.cells.length) {
        const cellNeighbours = fns.getNeighbours(currentCell, board);
        let randomCell = cellNeighbours[Math.round((cellNeighbours.length - 1) * Math.random())];
        if (!visitedCells.has(randomCell)) {
            board = fns.removeInterWall(randomCell, currentCell, board);
            visitedCells.add(randomCell);
        }
        currentCell = randomCell;
    }
    return board;
}
