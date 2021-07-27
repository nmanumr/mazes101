import { BaseBoard, setAllWalls } from "./base.ts";
export enum Type {
    RESET_MOVES,
    CREATE_CELL_GROUP,
    MERGE_CELL_GROUP,
    APPEND_CELL_GROUP,
    POP_CELL_GROUP
}
export interface MoveTypeParamsMap {
    [Type.RESET_MOVES]: undefined;
    [Type.CREATE_CELL_GROUP]: {
        id: number | string;
        cellIdx: number;
    };
    [Type.MERGE_CELL_GROUP]: {
        path1Id: number | string;
        path2Id: number | string;
    };
    [Type.APPEND_CELL_GROUP]: {
        id: number | string;
        cellIdx: number;
        neighbourCell: number;
    };
    [Type.POP_CELL_GROUP]: {
        id: number | string;
        cellIdx: number;
    };
}
export interface Move<T extends keyof MoveTypeParamsMap> {
    type: T;
    params: MoveTypeParamsMap[T];
}
export let moves: Move<keyof MoveTypeParamsMap>[] = [];
export function register<T extends keyof MoveTypeParamsMap>(type: T, params?: MoveTypeParamsMap[T]) {
    if (type === Type.RESET_MOVES) {
        moves = [];
        return;
    }
    moves.push({ type, params });
}
interface BoardFunctions<Board extends BaseBoard> {
    removeInterWall(index1: number, index2: number, board: Board): Board;
}
export function applyMove<Board extends BaseBoard, T extends keyof MoveTypeParamsMap>(board: Board, paths: Record<string | number, number[]>, move: Move<T>, fns: BoardFunctions<Board>) {
    if (move.type === Type.RESET_MOVES) {
        board.cells = board.cells.map((c) => setAllWalls(c));
        paths = {};
    }
    if (move.type === Type.CREATE_CELL_GROUP) {
        let { id, cellIdx } = (move.params as MoveTypeParamsMap[Type.CREATE_CELL_GROUP]);
        paths[id] = [cellIdx];
    }
    else if (move.type === Type.APPEND_CELL_GROUP) {
        let { id, cellIdx, neighbourCell } = (move.params as MoveTypeParamsMap[Type.APPEND_CELL_GROUP]);
        paths[id].push(cellIdx);
        board = fns.removeInterWall(cellIdx, neighbourCell, board);
    }
    else if (move.type === Type.POP_CELL_GROUP) {
        let { id, cellIdx } = (move.params as MoveTypeParamsMap[Type.POP_CELL_GROUP]);
        paths[id].splice(paths[id].indexOf(cellIdx), 1);
    }
    return [board, paths];
}
