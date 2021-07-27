import { BaseBoard, isEnabled } from "../base.ts";
import { getRandomFrom } from "../utils.ts";
import * as MovesRegister from "../movesRegister.ts";
import { PartialExcept } from "../types.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
}
export const _required_fns = ["removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }) {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let visitableCells = Array.from(board.cells)
        .map((_, i) => i)
        .filter((c) => isEnabled(c));
    let visitedCells = new Set();
    let currentCell = getRandomFrom(visitableCells);
    visitedCells.add(currentCell);
    let pathStack = [currentCell];
    movesRegister.register(movesRegister.Type.CREATE_CELL_GROUP, { id: 0, cell: currentCell });
    while (pathStack.length !== 0) {
        currentCell = pathStack[pathStack.length - 1];
        let cellNeighbours = fns.getNeighbours(currentCell, board);
        const unvisitedNeighbours = cellNeighbours.filter((c) => !visitedCells.has(c));
        if (unvisitedNeighbours.length > 0) {
            let randomCell = getRandomFrom(unvisitedNeighbours);
            visitedCells.add(randomCell);
            board = fns.removeInterWall(currentCell, randomCell, board);
            pathStack.push(randomCell);
            movesRegister.register(movesRegister.Type.APPEND_CELL_GROUP, {
                id: 0, cell: randomCell, neighbourCell: currentCell
            });
        }
        else {
            let id = pathStack.pop() as number;
            movesRegister.register(movesRegister.Type.POP_CELL_GROUP, { id: 0, cell: id });
        }
    }
    return board;
}
