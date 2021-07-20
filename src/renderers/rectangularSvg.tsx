import {Direction, RectangularBoard, toPosition} from "../boards/rectangular";
import {BoardType, isEnabled} from "../base";
import {StrH as globalH} from "../h";

interface RendererOptions<T> {
  cellSize: number;
  lineWidth: number;
  renderDisabled: boolean;
  h?: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T;
}

const defaultOptions: RendererOptions<string> = {
  cellSize: 30,
  lineWidth: 2,
  renderDisabled: false,
  h: globalH,
}

export function render<T = string>(board: RectangularBoard, options: Partial<RendererOptions<T>> = {}): T {
  options = {...defaultOptions, ...options} as RendererOptions<T>;

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

  const h = options.h;
  return (
    <svg stroke="currentColor" width={width} height={height} viewbox={`0 0 ${width} ${height}`}>
      {options.renderDisabled && <path d={p2} className={'disabledPath'}/>}
      <path d={path} strokeWidth={options.lineWidth} strokeLinecap="round"/>
    </svg>
  );
}

export const _supported_boards = [BoardType.Rectangular];
