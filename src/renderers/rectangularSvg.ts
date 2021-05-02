import {Direction, RectangularBoard, toPosition} from "../boards/rectangular";

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

  const path = board.cells.reduce((acc, cell, index) => {
    const {x, y} = toPosition(index, {size: board.size});
    const pivotX = x * options.cellSize + (options.lineWidth / 2) + options.cellSize;
    const pivotY = y * options.cellSize + (options.lineWidth / 2) + options.cellSize;

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
      // Left wall
      acc += `M${pivotX},${pivotY}V${pivotY + options.cellSize}`;
    }

    return acc;
  }, '');

  return `<svg stroke="currentColor" fill="none" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <path d="${path}" stroke-width="${options.lineWidth}" stroke-linecap="round"/>
  </svg>`;
}
