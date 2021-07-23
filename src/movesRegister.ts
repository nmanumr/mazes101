export enum Type {
  RESET_MOVES,
  SET_CURRENT_CELL,

  CREATE_CELL_GROUP,
  MERGE_CELL_GROUP,
  APPEND_CELL_GROUP,
  POP_CELL_GROUP,
}

export interface MoveTypeParamsMap {
  [Type.RESET_MOVES]: undefined;
  [Type.SET_CURRENT_CELL]: { cellIdx: number };
  [Type.CREATE_CELL_GROUP]: { id: number | string, initialCellIdx: number[] };
  [Type.MERGE_CELL_GROUP]: { path1Id: number | string, path2Id: number | string };
  [Type.APPEND_CELL_GROUP]: { id: number | string, cellIdx: number | number[] };
  [Type.POP_CELL_GROUP]: { id: number | string, cellIdx: number | number[] };
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

  moves.push({type, params});
}

