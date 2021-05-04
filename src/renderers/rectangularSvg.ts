import {Direction, RectangularBoard, toPosition} from "../boards/rectangular.js";
import {BoardType, isEnabled} from "../base.js";

interface RendererOptions {
  cellSize: number;
  lineWidth: number;
}

const defaultOptions: RendererOptions = {
  cellSize: 30,
  lineWidth: 2,
}

export function render(board: RectangularBoard, options: Partial<RendererOptions> = {}) {
  options = {...defaultOptions, ...options};

  const width = options.cellSize * (board.size.width + 2) + options.lineWidth;
  const height = options.cellSize * (board.size.height + 2) + options.lineWidth;
  let p2 = "";

  const path = board.cells.reduce((acc, cell, index) => {
    const {x, y} = toPosition(index, {size: board.size});
    const pivotX = x * options.cellSize + (options.lineWidth / 2) + options.cellSize;
    const pivotY = y * options.cellSize + (options.lineWidth / 2) + options.cellSize;

    if (!isEnabled(cell)) {
      p2 += `M${pivotX},${pivotY}H${pivotX + options.cellSize}V${pivotY + options.cellSize}H${pivotX}z`;
      return acc;
    }

    if ((cell & Direction.TOP) === 0) {
      acc += `M${pivotX},${pivotY}H${pivotX + options.cellSize}`;
    }
    if ((cell & Direction.RIGHT) === 0) {
      acc += `M${pivotX + options.cellSize},${pivotY}V${pivotY + options.cellSize}`;
    }
    if ((cell & Direction.BOTTOM) === 0) {
      acc += `M${pivotX},${pivotY + options.cellSize}H${pivotX + options.cellSize}`;
    }
    if ((cell & Direction.LEFT) === 0) {
      acc += `M${pivotX},${pivotY}V${pivotY + options.cellSize}`;
    }

    return acc;
  }, '');

  return `<svg stroke="currentColor" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <path d="${p2}" fill="#ddd" stroke-width="${0}" stroke-linecap="round"/>
    <path d="${path}" stroke-width="${options.lineWidth}" stroke-linecap="round"/>
  </svg>`;
}

export const _supported_boards = [BoardType.Rectangular];
