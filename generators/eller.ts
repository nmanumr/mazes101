import { BaseBoard } from "../base.ts";
import { getItemSet, isFromSameSet, ItemSets, joinItemSets } from "./_pathSet.ts";
import { getRandomFrom, shuffle } from "../utils.ts";
import { PartialExcept } from "../types.ts";
import * as MovesRegister from "../movesRegister.ts";
interface BoardFunctions<Board extends BaseBoard> {
    getRows(board: Board): number[][];
    removeInterWall(index1: number, index2: number, board: Board): Board;
    getNeighbours(index: number, board: Board): number[];
    getFactor?(rowIndex: number): number;
}
export const _required_fns = ["getRows", "removeInterWall", "getNeighbours"];
export function generate<Board extends BaseBoard>(board: Board, funcs: BoardFunctions<Board>, movesRegister: PartialExcept<typeof MovesRegister, 'register' | 'Type'> = { register: (...args) => undefined, Type: MovesRegister.Type }): Board {
    movesRegister.register(movesRegister.Type.RESET_MOVES);
    let fns: Required<BoardFunctions<Board>> = { getFactor: () => Math.random(), ...funcs };
    let pathSets: ItemSets<number> = [];
    const rows = fns.getRows(board);
    for (let index of rows[0]) {
        pathSets.push(new Set([index]));
    }
    for (let i = 0; i < rows.length - 1; i++) {
        let row = rows[i];
        [board, pathSets] = visitRow(row, i, false, board, pathSets, fns);
        [board, pathSets] = connectToOtherRow(row, rows[i + 1], board, pathSets, fns);
    }
    [board, pathSets] = visitRow(rows[rows.length - 1], rows.length - 1, true, board, pathSets, fns);
    return board;
}
export function visitRow<Board extends BaseBoard>(row: number[], rowIndex: number, mergeAll: boolean, board: Board, pathSets: ItemSets<number>, fns: Required<BoardFunctions<Board>>): [
    Board,
    ItemSets<number>
] {
    for (let i = 1; i < row.length; i++) {
        if (getItemSet(row[i - 1], pathSets) == null) {
            pathSets.push(new Set([row[i - 1]]));
        }
        if (getItemSet(row[i], pathSets) == null) {
            pathSets.push(new Set([row[i]]));
        }
        let neighbours = fns.getNeighbours(row[i - 1], board);
        if (!neighbours.includes(row[i]))
            continue;
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
export function connectToOtherRow<Board extends BaseBoard>(row: number[], nextRow: number[], board: Board, pathSets: ItemSets<number>, fns: Required<BoardFunctions<Board>>): [
    Board,
    ItemSets<number>
] {
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
