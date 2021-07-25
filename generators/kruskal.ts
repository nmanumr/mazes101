import { BaseBoard, isEnabled } from "../base.ts";
import { getRandomIndexFrom, getRandomFrom } from "../utils.ts";
import { isFromSameSet, ItemSets, joinItemSets } from "./_pathSet.ts";
import { PartialExcept } from "../types.ts";
import * as MovesRegister from "../movesRegister.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
}
export const _required_fns = ["removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, fns: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }) {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let pathSets: ItemSets<number> = [];
    let visited = new Set();
    let visitableCells = 0;
    for (let i = 0; i < board.cells.length; i++) {
        if (!isEnabled(board.cells[i]))
            continue;
        pathSets.push(new Set([i]));
        visitableCells++;
    }
    while (visited.size < visitableCells) {
        const randomCell = getRandomIndexFrom(board.cells);
        if (!isEnabled(board.cells[randomCell]))
            continue;
        const neighbours = fns.getNeighbours(randomCell, board)
            .filter((c) => isEnabled(board.cells[c]));
        const randomNeighbour = getRandomFrom(neighbours);
        if (isFromSameSet(randomCell, randomNeighbour, pathSets))
            continue;
        board = fns.removeInterWall(randomCell, randomNeighbour, board);
        pathSets = joinItemSets(randomCell, randomNeighbour, pathSets);
        visited.add(randomCell);
        visited.add(randomNeighbour);
    }
    return board;
}
