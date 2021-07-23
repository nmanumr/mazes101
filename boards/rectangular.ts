import { BaseBoard, hasInterWall, isEnabled, setInterWallValue } from "../base.ts";
import { PartialExcept } from "../types.ts";
export enum Direction {
    TOP = 0b0001,
    RIGHT = 0b0010,
    BOTTOM = 0b0100,
    LEFT = 0b1000
}
export interface Size {
    height: number;
    width: number;
}
export interface Position {
    x: number;
    y: number;
}
export interface RectangularBoard extends BaseBoard {
    size: Size;
}
export const _size_params = ["height", "width"];
export function newBoard(size: Size): RectangularBoard {
    return {
        cells: new Uint8Array(size.width * size.height),
        size
    };
}
export function newFromBaseBoard({ cells }: BaseBoard, size: Size): RectangularBoard {
    return { cells: cells, size };
}
export function toIndex(position: Position, { size }: PartialExcept<RectangularBoard, 'size'>) {
    return position.y * size.width + position.x;
}
export function toPosition(index: number, { size }: PartialExcept<RectangularBoard, 'size'>) {
    return {
        x: index % size.width,
        y: Math.floor(index / size.width)
    };
}
export function getCellByPosition(position: Position, { cells, size }: RectangularBoard): number {
    return cells[toIndex(position, { size })];
}
export function setCellByPosition(position: Position, value: number, { cells, size }: RectangularBoard) {
    return cells[toIndex(position, { size })] = value;
}
export function getOpposingDirection(direction: Direction): Direction {
    return ((direction << 2) | (direction >> 2)) & 0b1111;
}
export function getRelativeDirection(index1: number, index2: number, { size }: PartialExcept<RectangularBoard, 'size'>): Direction {
    const pos1 = toPosition(index1, { size });
    const pos2 = toPosition(index2, { size });
    if (pos1.y > pos2.y)
        return Direction.TOP;
    if (pos1.x < pos2.x)
        return Direction.RIGHT;
    if (pos1.y < pos2.y)
        return Direction.BOTTOM;
    if (pos1.x > pos2.x)
        return Direction.LEFT;
    throw `'${pos1}' and '${pos2}' are not neighbours`;
}
export function getRelativePosition({ x, y }: Position, direction: Direction) {
    let newPosition = { x, y };
    if (direction === Direction.TOP)
        newPosition.y--;
    if (direction === Direction.RIGHT)
        newPosition.x++;
    if (direction === Direction.BOTTOM)
        newPosition.y++;
    if (direction === Direction.LEFT)
        newPosition.x--;
    return newPosition;
}
export function getNeighbours(index: number, { cells, size }: RectangularBoard): number[] {
    let neighboursCells: number[] = [];
    if (index >= size.width) {
        neighboursCells.push(index - size.width);
    }
    if ((index + 1) % size.width != 0) {
        neighboursCells.push(index + 1);
    }
    if (index < cells.length - size.width) {
        neighboursCells.push(index + size.width);
    }
    if (index % size.width != 0) {
        neighboursCells.push(index - 1);
    }
    neighboursCells = neighboursCells.filter((i) => isEnabled(cells[i]));
    return neighboursCells;
}
export function getAllowedDirection({ x, y }: Position, { cells, size }: RectangularBoard, visitableOnly = true) {
    let directions: Direction[] = [];
    if (y > 0)
        directions.push(Direction.TOP);
    if (x < size.width - 1)
        directions.push(Direction.RIGHT);
    if (y < size.height - 1)
        directions.push(Direction.BOTTOM);
    if (x > 0)
        directions.push(Direction.LEFT);
    directions.filter((dir) => {
        const newPos = getRelativePosition({ x, y }, dir);
        const index1 = toIndex(newPos, { size });
        const index2 = toIndex({ x, y }, { size });
        const cell = cells[index1];
        if (visitableOnly && hasInterWall<RectangularBoard, Direction>(index1, index2, { cells: cells, size }, getRelativeDirection, getOpposingDirection)) {
            return false;
        }
        return isEnabled(cell);
    });
    return directions;
}
export function getRows({ cells, size }: RectangularBoard): number[][] {
    return Array.from(cells)
        .map((_, i) => i)
        .reduce((acc, item, index) => {
        if (index % size.width === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(item);
        return acc;
    }, [] as number[][])
        .map((row) => row.filter((c) => isEnabled(cells[c])))
        .filter((row) => row.length);
}
export function removeInterWall(index1: number, index2: number, board: RectangularBoard): RectangularBoard {
    return setInterWallValue<RectangularBoard, Direction>(index1, index2, board, getOpposingDirection, getRelativeDirection, (cell, dir) => cell | dir);
}
export function setInterWall(index1: number, index2: number, board: RectangularBoard): RectangularBoard {
    return setInterWallValue<RectangularBoard, Direction>(index1, index2, board, getOpposingDirection, getRelativeDirection, (cell, dir) => cell & ~dir);
}
