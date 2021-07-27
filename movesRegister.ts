import { BaseBoard, setAllWalls } from "./base.ts";
export enum Type {
    RESET_MOVES,
    CREATE_CELL_GROUP,
    MERGE_CELL_GROUP,
    APPEND_CELL_GROUP,
    POP_CELL_GROUP,
    CLEAR_CELL_GROUPS
}
export interface MoveTypeParamsMap {
    [Type.RESET_MOVES]: undefined;
    [Type.CREATE_CELL_GROUP]: {
        id: number | string;
        cell: number;
    };
    [Type.MERGE_CELL_GROUP]: {
        cell1: number;
        cell2: number;
    };
    [Type.APPEND_CELL_GROUP]: {
        id: number | string;
        cell: number;
        neighbourCell: number;
    };
    [Type.POP_CELL_GROUP]: {
        id: number | string;
        cell: number;
    };
    [Type.CLEAR_CELL_GROUPS]: undefined;
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
    if (move.type === Type.CLEAR_CELL_GROUPS) {
        paths = {};
    }
    if (move.type === Type.CREATE_CELL_GROUP) {
        let { id, cell } = (move.params as MoveTypeParamsMap[Type.CREATE_CELL_GROUP]);
        paths[id] = [cell];
    }
    else if (move.type === Type.APPEND_CELL_GROUP) {
        let { id, cell, neighbourCell } = (move.params as MoveTypeParamsMap[Type.APPEND_CELL_GROUP]);
        paths[id].push(cell);
        board = fns.removeInterWall(cell, neighbourCell, board);
    }
    else if (move.type === Type.POP_CELL_GROUP) {
        let { id, cell } = (move.params as MoveTypeParamsMap[Type.POP_CELL_GROUP]);
        paths[id].splice(paths[id].indexOf(cell), 1);
    }
    else if (move.type === Type.MERGE_CELL_GROUP) {
        let { cell1, cell2 } = (move.params as MoveTypeParamsMap[Type.MERGE_CELL_GROUP]);
        let path1Id = Object.entries(paths).find((e) => e[1].includes(cell1))?.[0] as string | number;
        let path2Id = Object.entries(paths).find((e) => e[1].includes(cell2))?.[0] as string | number;
        paths[path1Id] = [...paths[path1Id], ...paths[path2Id]];
        delete paths[path2Id];
        board = fns.removeInterWall(cell1, cell2, board);
    }
    return [board, paths];
}
