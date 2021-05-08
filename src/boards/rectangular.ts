import {BaseBoard, hasInterWall, isEnabled, setInterWallValue} from "../base.js";
import {PartialExcept} from "../types";
import {keys} from "ts-transformer-keys";

/*--------------
 * Types
 *-------------- */

export enum Direction {
  TOP = 0b0001,
  RIGHT = 0b0010,
  BOTTOM = 0b0100,
  LEFT = 0b1000,
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

export const _size_params = keys<Size>();

/*-------------------------
 * Constructor Functions
 *------------------------- */

/**
 * Returns a new rectangularBoard for the given size
 */
export function newBoard(size: Size): RectangularBoard {
  return {
    cells: new Uint8Array(size.width * size.height),
    size,
  }
}

/**
 * Casts base board to RectangularBoard
 */
export function newFromBaseBoard({cells}: BaseBoard, size: Size): RectangularBoard {
  return {cells: cells, size}
}

/*-------------------------
 * Position Functions
 *------------------------- */

/**
 * Linear index from position
 */
export function toIndex(position: Position, {size}: PartialExcept<RectangularBoard, 'size'>) {
  return position.y * size.width + position.x;
}

/**
 * Position from linear index
 */
export function toPosition(index: number, {size}: PartialExcept<RectangularBoard, 'size'>) {
  return {
    x: index % size.width,
    y: Math.floor(index / size.width),
  };
}

/*-------------------------
 * Cell value Functions
 *------------------------- */

/**
 * get cell at given position
 */
export function getCellByPosition(position: Position, {cells, size}: RectangularBoard): number {
  return cells[toIndex(position, {size})];
}

/**
 * set cell at given position
 */
export function setCellByPosition(position: Position, value: number, {cells, size}: RectangularBoard) {
  return cells[toIndex(position, {size})] = value;
}

/*-------------------------
 * Direction Utils
 *------------------------- */

/**
 * return a opposing direction
 *
 * getOpposingDirection(Direction.LEFT) -> Direction.RIGHT
 */
export function getOpposingDirection(direction: Direction): Direction {
  return ((direction << 2) | (direction >> 2)) & 0b1111;
}

/**
 * Get relative direction between two positions
 */
export function getRelativeDirection(
  index1: number, index2: number,
  {size}: PartialExcept<RectangularBoard, 'size'>
): Direction {
  const pos1 = toPosition(index1, {size});
  const pos2 = toPosition(index2, {size});

  if (pos1.y > pos2.y) return Direction.TOP;
  if (pos1.x < pos2.x) return Direction.RIGHT;
  if (pos1.y < pos2.y) return Direction.BOTTOM;
  if (pos1.x > pos2.x) return Direction.LEFT;

  throw `'${pos1}' and '${pos2}' are not neighbours`;
}

/*-------------------------
 * Cell Neighbourhood Utils
 *------------------------- */

/**
 * Returns a new position in direction relative to the given position
 */
export function getRelativePosition({x, y}: Position, direction: Direction) {
  let newPosition = {x, y};
  if (direction === Direction.TOP) newPosition.y--;
  if (direction === Direction.RIGHT) newPosition.x++;
  if (direction === Direction.BOTTOM) newPosition.y++;
  if (direction === Direction.LEFT) newPosition.x--;
  return newPosition;
}

/**
 * Get neighbour cells of the given position
 */
export function getNeighbours(index: number, {cells, size}: RectangularBoard): number[] {
  let neighboursCells = [];

  // TOP
  if (index >= size.width) { neighboursCells.push(index - size.width); }
  // RIGHT
  if ((index + 1) % size.width != 0) { neighboursCells.push(index + 1); }
  // BOTTOM
  if (index < cells.length - size.width) { neighboursCells.push(index + size.width); }
  // LEFT
  if (index % size.width != 0) { neighboursCells.push(index - 1); }

  neighboursCells = neighboursCells.filter((i) => isEnabled(cells[i]));

  return neighboursCells;
}

/**
 * get allowed directions from a given position
 *
 * if visitableOnly is false then it only check nif neighbour is enabled or not
 */
export function getAllowedDirection({x, y}: Position, {cells, size}: RectangularBoard, visitableOnly = true) {
  let directions = [];

  if (y > 0) directions.push(Direction.TOP);
  if (x < size.width - 1) directions.push(Direction.RIGHT);
  if (y < size.height - 1) directions.push(Direction.BOTTOM);
  if (x > 0) directions.push(Direction.LEFT);

  directions.filter((dir) => {
    const newPos = getRelativePosition({x, y}, dir);
    const index1 = toIndex(newPos, {size});
    const index2 = toIndex({x, y}, {size});
    const cell = cells[index1];
    if (visitableOnly && hasInterWall<RectangularBoard, Direction>(
      index1, index2, {cells: cells, size},
      getRelativeDirection, getOpposingDirection
    )) {
      return false;
    }
    return isEnabled(cell);
  });

  return directions;
}

/**
 * return array of rows of cells
 */
export function getRows({cells, size}: RectangularBoard): number[][] {
  return cells
    // map cell to its index
    .map((_, i) => i)
    // map indexes into rows based on board width
    .reduce((acc, item, index) => {
      if (index % size.width === 0) {
        acc.push([]);
      }

      acc[acc.length - 1].push(item);
      return acc;
    }, [])
    // don't allow any disabled cell
    .map((row) => row.filter((c) => isEnabled(cells[c])))
    // ignore empty rows
    .filter((row) => row.length);
}

/*-------------------------
 * Cell Wall Utils
 *------------------------- */

/**
 * Remove wall between the given two cell Indexes
 */
export function removeInterWall(index1: number, index2: number, board: RectangularBoard): RectangularBoard {
  return setInterWallValue<RectangularBoard, Direction>(
    index1, index2, board,
    getOpposingDirection,
    getRelativeDirection,
    (cell, dir) => cell | dir
  )
}

/**
 * Set wall between the given two cell positions
 */
export function setInterWall(index1: number, index2: number, board: RectangularBoard): RectangularBoard {
  return setInterWallValue<RectangularBoard, Direction>(
    index1, index2, board,
    getOpposingDirection,
    getRelativeDirection,
    (cell, dir) => cell & ~dir
  )
}
