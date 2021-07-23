import {Direction, RectangularBoard, toPosition} from "../boards/rectangular";
import {BoardType, isEnabled} from "../base";
import {StrH as globalH} from "../h";

interface RendererOptions<T> {
  cellSize: number;
  lineWidth: number;
  renderDisabled: boolean;
  h: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T;
}

const defaultOptions: RendererOptions<string> = {
  cellSize: 30,
  lineWidth: 2,
  renderDisabled: false,
  h: globalH,
}

export function render<T = string>(board: RectangularBoard, options: Partial<RendererOptions<T>> = {}): T {
  let opts: RendererOptions<T> = {...defaultOptions, ...options} as RendererOptions<T>;

  const width = opts.cellSize * (board.size.width + 2) + opts.lineWidth;
  const height = opts.cellSize * (board.size.height + 2) + opts.lineWidth;
  let p2 = "";

  const path = board.cells.reduce((acc, cell, index) => {
    const {x, y} = toPosition(index, {size: board.size});
    const pivotX = x * opts.cellSize + (opts.lineWidth / 2) + opts.cellSize;
    const pivotY = y * opts.cellSize + (opts.lineWidth / 2) + opts.cellSize;

    if (!isEnabled(cell)) {
      p2 += `M${pivotX},${pivotY}H${pivotX + opts.cellSize}V${pivotY + opts.cellSize}H${pivotX}z`;
      return acc;
    }

    if ((cell & Direction.TOP) === 0) {
      acc += `M${pivotX},${pivotY}H${pivotX + opts.cellSize}`;
    }
    if ((cell & Direction.RIGHT) === 0) {
      acc += `M${pivotX + opts.cellSize},${pivotY}V${pivotY + opts.cellSize}`;
    }
    if ((cell & Direction.BOTTOM) === 0) {
      acc += `M${pivotX},${pivotY + opts.cellSize}H${pivotX + opts.cellSize}`;
    }
    if ((cell & Direction.LEFT) === 0) {
      acc += `M${pivotX},${pivotY}V${pivotY + opts.cellSize}`;
    }

    return acc;
  }, '');

  const h = opts.h;
  return h(
    'svg',
    {
      stroke: "currentColor",
      fill: "none",
      width: `${width}px`,
      height: `${height}px`,
      viewBox: `0 0 ${width} ${height}`
    },
    opts.renderDisabled && h('path', {d: p2, className: 'disabledPath'}),
    h('path', {d: path, strokeWidth: `${opts.lineWidth}px`, strokeLinecap:'round'})
  );
}

export const _supported_boards = [BoardType.Rectangular];
