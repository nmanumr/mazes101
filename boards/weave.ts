import { isEnabled } from "../base.ts";
import { RectangularBoard } from "./rectangular.ts";
export interface WeaveBoard extends RectangularBoard {
}
export function getNeighbours(index: number, { cells, size }: WeaveBoard): number[] {
    let neighboursCells: number[] = [];
    if (index >= size.width) {
        let cell = cells[index - size.width];
        if ((cell & 15) === 10 && index - size.width >= size.width) {
            neighboursCells.push(index - size.width - size.width);
        }
        else {
            neighboursCells.push(index - size.width);
        }
    }
    if ((index + 1) % size.width !== 0) {
        let cell = cells[index + 1];
        if ((cell & 15) === 5 && (index + 2) % size.width !== 0) {
            neighboursCells.push(index + 2);
        }
        else {
            neighboursCells.push(index + 1);
        }
    }
    if (index < cells.length - size.width) {
        let cell = cells[index + size.width];
        if ((cell & 15) === 10 && (index + size.width) < cells.length - size.width) {
            neighboursCells.push(index + size.width + size.width);
        }
        else {
            neighboursCells.push(index + size.width);
        }
    }
    if (index % size.width != 0) {
        let cell = cells[index - 1];
        if ((cell & 15) === 5 && (index - 1) % size.width != 0) {
            neighboursCells.push(index - 2);
        }
        else {
            neighboursCells.push(index - 1);
        }
    }
    neighboursCells = neighboursCells.filter((i) => isEnabled(cells[i]));
    return neighboursCells;
}
export * from "./rectangular.ts";
