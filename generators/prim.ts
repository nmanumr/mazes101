import { BaseBoard, isEnabled } from "../base.ts";
import { difference, getRandomFrom } from "../utils.ts";
import { PartialExcept } from "../types.ts";
import * as MovesRegister from "../movesRegister.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
}
export const _required_fns = ["removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }): Board {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let visitedCells = new Set<number>();
    const enabledCells = board.cells
        .map((_, i) => i)
        .filter((i) => isEnabled(board.cells[i]));
    let currentCell = getRandomFrom(enabledCells);
    let neighbourCells = new Set(fns.getNeighbours(currentCell, board));
    visitedCells.add(currentCell);
    while (neighbourCells.size > 0) {
        currentCell = getRandomFrom(Array.from(neighbourCells));
        let neighbours = new Set(fns.getNeighbours(currentCell, board));
        for (let neighbour of neighbours) {
            if (visitedCells.has(neighbour)) {
                board = fns.removeInterWall(neighbour, currentCell, board);
                neighbourCells.delete(currentCell);
                visitedCells.add(currentCell);
                neighbourCells = new Set([...neighbourCells, ...neighbours]);
                neighbourCells = difference(neighbourCells, visitedCells);
                break;
            }
        }
    }
    return board;
}
