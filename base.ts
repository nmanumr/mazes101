export interface BaseBoard {
    cells: Uint8Array;
}
export const enum BoardType {
    Rectangular = "rectangular",
    Circular = "circular",
    Triangular = "triangular",
    Hexagonal = "hexagonal"
}
export function genericBoard(size: number): BaseBoard {
    return {
        cells: new Uint8Array(size)
    };
}
export function isEnabled(cell: number): boolean {
    return (cell & 1 << 7) === 0;
}
export function disableCell<Board extends BaseBoard>(index: number, board: Board): Board {
    let cells = board.cells.slice(0);
    cells[index] = cells[index] | (1 << 7);
    return { ...board, cells };
}
export function disableCells<Board extends BaseBoard>(indexes: number[], board: Board): Board {
    let cells = board.cells.slice(0);
    for (let index of indexes) {
        cells[index] = cells[index] | (1 << 7);
    }
    return { ...board, cells };
}
export function removeAllWall(cell: number): number {
    return !isEnabled(cell) ? 255 : cell | 127;
}
export function setAllWalls(cell: number): number {
    return !isEnabled(cell) ? cell & 128 : cell & 0;
}
export function hasCellWall(cell: number, wall: number): boolean {
    return !isEnabled(cell) || (cell & 1 << wall) === 0;
}
export function setWall(cell: number, wall: number): number {
    return !isEnabled(cell) ? cell : cell | (1 << wall);
}
export function removeWall(cell: number, wall: number): number {
    return !isEnabled(cell) ? cell : cell & ~(1 << wall);
}
export function hasInterWall<Board extends BaseBoard, Dir extends number>(index1: number, index2: number, board: Board, relativeDirectionFn: (index1: number, index2: number, board: Board) => Dir, opposingWallFn: (dir: Dir) => Dir): boolean {
    const cell1Dir = relativeDirectionFn(index1, index2, board);
    const cell2Dir = opposingWallFn(cell1Dir);
    return hasCellWall(board.cells[index1], cell1Dir) && hasCellWall(board.cells[index2], cell2Dir);
}
export function setInterWallValue<Board extends BaseBoard, Dir extends number>(index1: number, index2: number, board: Board, opposingWallFn: (dir: Dir) => Dir, relativeDirectionFn: (index1: number, index2: number, board: Board) => Dir, cellValueFn: (cell: number, dir: Dir) => number): Board {
    let cells = board.cells.slice(0);
    const cell1Dir = relativeDirectionFn(index1, index2, board);
    const cell2Dir = opposingWallFn(cell1Dir);
    if (isEnabled(cells[index1]))
        cells[index1] = cellValueFn(cells[index1], cell1Dir);
    if (isEnabled(cells[index2]))
        cells[index2] = cellValueFn(cells[index2], cell2Dir);
    return { ...board, cells };
}
