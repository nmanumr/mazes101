import { BaseBoard } from "../base.ts";
import { getRandomIndexFrom } from "../utils.ts";
import { PartialExcept } from "../types.ts";
import * as MovesRegister from "../movesRegister.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
    randomWalk(startPosition: number, board: Board, getNeighbours: (index: number, board: Board) => number[], until: (position: number, path: number[]) => boolean): number[];
}
export const _required_fns = ["removeInterWall", "getNeighbours", "randomWalk"];
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }): Board {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let visitedCells = new Set();
    let currentCell = getRandomIndexFrom(board.cells);
    visitedCells.add(currentCell);
    while (visitedCells.size < board.cells.length) {
        let randomCell = getRandomIndexFrom(board.cells);
        let path = fns.randomWalk(randomCell, board, fns.getNeighbours, (cell, path) => {
            if (path.includes(cell)) {
                const i = path.indexOf(cell);
                path.splice(i, path.length);
            }
            return !visitedCells.has(cell);
        });
        for (let i = 1; i < path.length; i++) {
            board = fns.removeInterWall(path[i - 1], path[i], board);
        }
        visitedCells = new Set([...visitedCells, ...path]);
    }
    return board;
}
