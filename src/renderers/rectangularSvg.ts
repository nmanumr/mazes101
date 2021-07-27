import {Direction, RectangularBoard, toPosition} from "../boards/rectangular";
import {BoardType} from "../base";
import {StrH as globalH} from "../h";
import {fillColor, findCellPathId, getColors} from "./utils";

interface RendererOptions<T> {
  cellSize: number;
  lineWidth: number;
  paths: Record<number | string, number[]>,
  colors: Record<number | string, string>,
  h: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T;
}

const defaultOptions: RendererOptions<string> = {
  cellSize: 30,
  lineWidth: 2,
  paths: {},
  colors: {},
  h: globalH,
}

export function render<T = string>(board: RectangularBoard, options: Partial<RendererOptions<T>> = {}): T {
  let opts: RendererOptions<T> = {...defaultOptions, ...options} as RendererOptions<T>;
  let colors = fillColor(opts.paths, opts.colors);

  const width = opts.cellSize * (board.size.width + 2) + opts.lineWidth;
  const height = opts.cellSize * (board.size.height + 2) + opts.lineWidth;
  let paths: Record<string, string> = {};
  let walls = '';

  board.cells.forEach((cell, index) => {
    const {x, y} = toPosition(index, {size: board.size});
    const pivotX = x * opts.cellSize + (opts.lineWidth / 2) + opts.cellSize;
    const pivotY = y * opts.cellSize + (opts.lineWidth / 2) + opts.cellSize;
    const pathId = findCellPathId(index, opts.paths);

    if ((cell & Direction.TOP) === 0) {
      walls += `M${pivotX},${pivotY}H${pivotX + opts.cellSize}`;
    }
    if ((cell & Direction.RIGHT) === 0) {
      walls += `M${pivotX + opts.cellSize},${pivotY}V${pivotY + opts.cellSize}`;
    }
    if ((cell & Direction.BOTTOM) === 0) {
      walls += `M${pivotX},${pivotY + opts.cellSize}H${pivotX + opts.cellSize}`;
    }
    if ((cell & Direction.LEFT) === 0) {
      walls += `M${pivotX},${pivotY}V${pivotY + opts.cellSize}`;
    }

    if (pathId) {
      let closedPath = `M${pivotX},${pivotY}H${pivotX + opts.cellSize}V${pivotY + opts.cellSize}H${pivotX}z`;
      paths[pathId] = ((paths[pathId] || '') + closedPath);
    }
  });

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
    Object.entries(paths).map(([k, path]) => {
      return h('path', {d: path, fill: colors[k], key: k, strokeWidth: `0`});
    }),
    h('path', {d: walls, strokeWidth: `${opts.lineWidth}px`, strokeLinecap: 'round'}),
  );
}

export const _supported_boards = [BoardType.Rectangular];
