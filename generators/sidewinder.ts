import { BaseBoard } from "../base.ts";
import { getRandomFrom, shuffle } from "../utils.ts";
import { ItemSets } from "./_pathSet.ts";
import { visitRow } from "./eller.ts";
import { PartialExcept } from "../types.ts";
import * as MovesRegister from "../movesRegister.ts";
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getRows(board: Board): number[][];
    getNeighbours(index: number, board: Board): number[];
    getFactor?(rowIndex: number): number;
}
export const _required_fns = ["getRows", "removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, funcs: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }) {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let fns: Required<BoardFunctions<Board>> = { getFactor: () => Math.random(), ...funcs };
    let rows = fns.getRows(board);
    let pathSets: ItemSets<number> = {};
    if (!fns.getFactor) {
        fns = { ...fns };
        fns.getFactor = () => Math.random();
    }
    [board, pathSets] = visitRow(rows[0], 0, true, board, pathSets, fns, movesRegister);
    for (let i = 1; i < rows.length; i++) {
        [board, pathSets] = visitRow(rows[i], i, false, board, pathSets, fns, movesRegister);
        [board, pathSets] = connectToOtherRow(rows[i], rows[i - 1], board, pathSets, fns);
    }
    return board;
}
export function connectToOtherRow<Board extends BaseBoard>(row: number[], nextRow: number[], board: Board, pathSets: ItemSets<number>, fns: BoardFunctions<Board>): [
    Board,
    ItemSets<number>
] {
    for (let [id, set] of Object.entries(pathSets)) {
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
