import { BaseBoard, setInterWallValue } from "../base.ts";
import { PartialExcept } from "../types.ts";
export enum Direction {
    TOP_CW = 0b00001,
    TOP_CCW = 0b00010,
    RIGHT = 0b00100,
    BOTTOM = 0b01000,
    LEFT = 0b10000
}
export interface Size {
    radius: number;
    innerRadius: number;
}
export interface Position {
    r: number;
    t: number;
}
export interface CircularBoard extends BaseBoard {
    size: Size;
}
export const _size_params = ["radius", "innerRadius"];
function sum(nums: number[]) {
    return Array.from(nums).reduce((s, i) => s + i, 0);
}
export function newBoard({ radius, innerRadius = 3 }: {
    radius: number;
    innerRadius?: number;
}): CircularBoard {
    const nodeCount = getRingNodeCount(radius);
    const totalNodes = sum(nodeCount.slice(innerRadius));
    return {
        cells: new Uint8Array(totalNodes),
        size: { innerRadius, radius }
    };
}
export function newFromBaseBoard({ cells }: BaseBoard, size: Size): CircularBoard {
    return { cells: cells, size };
}
export function getCell(position: Position, { cells, size }: CircularBoard): number {
    return cells[toIndex(position, { size })];
}
export function setCell(position: Position, value: number, { cells, size }: CircularBoard) {
    return cells[toIndex(position, { size })] = value;
}
export function getOpposingDirection(direction: Direction): Direction {
    switch (direction) {
        case Direction.TOP_CCW:
        case Direction.TOP_CW:
            return Direction.BOTTOM;
        case Direction.RIGHT:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.RIGHT;
    }
    return Direction.TOP_CW & Direction.TOP_CCW;
}
export function getRelativeDirection(index1: number, index2: number, { size }: PartialExcept<CircularBoard, 'size'>): Direction {
    const pos1 = toPosition(index1, { size });
    const pos2 = toPosition(index2, { size });
    if (pos1.r - 1 === pos2.r)
        return Direction.BOTTOM;
    if (pos1.r === pos2.r && pos1.t + 1 === pos2.t)
        return Direction.RIGHT;
    if (pos1.r === pos2.r && pos1.t < pos2.t && pos1.t === 0)
        return Direction.LEFT;
    if (pos1.r === pos2.r && pos1.t - 1 === pos2.t)
        return Direction.LEFT;
    if (pos1.r === pos2.r && pos1.t > pos2.t && pos2.t === 0)
        return Direction.RIGHT;
    if (pos1.r + 1 === pos2.r && index1 % 2 === 0)
        return Direction.TOP_CW;
    if (pos1.r + 1 === pos2.r && index1 % 2 === 1)
        return Direction.TOP_CCW;
    throw `'${pos1}' and '${pos2}' are not neighbours`;
}
export function getRingNodeCount(radius: number): number[] {
    let nodeCount = [1];
    let nodeCountSum = [0];
    for (let i = 1; i < radius; ++i) {
        nodeCount[i] = nodeCount[i - 1];
        if (2 * Math.PI * i / nodeCount[i - 1] > 2)
            nodeCount[i] *= 2;
        nodeCountSum[i] = nodeCountSum[i - 1] + nodeCount[i - 1];
    }
    return nodeCount;
}
export function toIndex(position: Position, { size }: PartialExcept<CircularBoard, 'size'>): number {
    const nodeCount = getRingNodeCount(size.innerRadius + position.r).slice(size.innerRadius);
    return sum(nodeCount) + position.t;
}
export function toPosition(index: number, { size }: PartialExcept<CircularBoard, 'size'>): Position {
    const nodeCount = getRingNodeCount(size.radius).slice(size.innerRadius);
    const nodeCountSum = nodeCount
        .reduce((acc, v) => {
        acc.push(acc[acc.length - 1] + v);
        return acc;
    }, [0]);
    const r = nodeCountSum.findIndex((val) => val > index);
    return {
        r: r - 1,
        t: index - nodeCountSum[r - 1]
    };
}
export function getRows({ size }: CircularBoard): number[][] {
    const nodeCounts = getRingNodeCount(size.radius).slice(size.innerRadius);
    let sum = 0, rows: number[][] = [];
    for (let count of nodeCounts) {
        rows.push(Array.from(new Array(count), (_, i) => sum + i));
        sum += count;
    }
    return rows;
}
export function getNeighbours(index: number, { size }: CircularBoard) {
    const nodeCount = getRingNodeCount(size.radius).slice(size.innerRadius);
    const nodeCountSum = nodeCount
        .reduce((acc, v) => {
        acc.push(acc[acc.length - 1] + v);
        return acc;
    }, [0]);
    const r = nodeCountSum.findIndex((val) => val > index) - 1;
    const t = index - nodeCountSum[r];
    let neighbours: number[] = [];
    if (r < (size.radius - size.innerRadius - 1)) {
        if (nodeCount[r] < nodeCount[r + 1]) {
            const cellIndex = toIndex({ r: r + 1, t: t * 2 }, { size });
            neighbours.push(cellIndex);
            neighbours.push(cellIndex + 1);
        }
        else {
            const cellIndex = toIndex({ r: r + 1, t }, { size });
            neighbours.push(cellIndex);
        }
    }
    if (t > 0) {
        neighbours.push(index - 1);
    }
    else {
        neighbours.push(index + nodeCount[r] - 1);
    }
    if (r > 0) {
        let cellIndex;
        if (nodeCount[r] > nodeCount[r - 1]) {
            cellIndex = toIndex({ r: r - 1, t: Math.floor(t / 2) }, { size });
        }
        else {
            cellIndex = toIndex({ r: r - 1, t }, { size });
        }
        neighbours.push(cellIndex);
    }
    if (t < nodeCount[r] - 1) {
        neighbours.push(index + 1);
    }
    else {
        neighbours.push(index - nodeCount[r] + 1);
    }
    console.log("here");
    return neighbours;
}
export function removeInterWall(index1: number, index2: number, board: CircularBoard): CircularBoard {
    return setInterWallValue<CircularBoard, Direction>(index1, index2, board, getOpposingDirection, getRelativeDirection, (cell, dir) => cell | dir);
}
