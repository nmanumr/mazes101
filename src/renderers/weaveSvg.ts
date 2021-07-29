import {Direction, RectangularBoard, toPosition} from "../boards/rectangular";
import {BoardType} from "../base";
import {StrH as globalH} from "../h";
import {fillColor, findCellPathId} from "./utils";

interface RendererOptions<T> {
  cellSize: number;
  lineWidth: number;
  paths: Record<number | string, number[]>,
  colors: Record<number | string, string>,
  shouldFillPath: boolean,
  cellGap: number;
  h: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T;
}

const defaultOptions: RendererOptions<string> = {
  cellSize: 22,
  lineWidth: 2,
  shouldFillPath: true,
  paths: {},
  colors: {'default': 'white'},
  cellGap: 8,
  h: globalH,
}

export function render<T = string>(board: RectangularBoard, options: Partial<RendererOptions<T>> = {}): T {
  let opts: RendererOptions<T> = {...defaultOptions, ...options} as RendererOptions<T>;
  let colors = fillColor(opts.paths, opts.colors);

  const width = (opts.cellSize + (opts.cellGap/2) + opts.lineWidth*2) * board.size.width - opts.lineWidth*2;
  const height = (opts.cellSize + (opts.cellGap/2) + opts.lineWidth*2) * board.size.height - opts.lineWidth*2;
  let paths: Record<string, string> = {};
  let walls = '';
  let defaultPath = '';

  board.cells.forEach((cell, index) => {
    const {x, y} = toPosition(index, {size: board.size});
    const pivotX = x * (opts.cellSize + opts.cellGap) + (opts.lineWidth) ;
    const pivotY = y * (opts.cellSize + opts.cellGap) + (opts.lineWidth);
    const pathId = findCellPathId(index, opts.paths);

    let hasTopWall = (cell & Direction.TOP) === 0;
    let hasRightWall = (cell & Direction.RIGHT) === 0;
    let hasBottomWall = (cell & Direction.BOTTOM) === 0;
    let hasLeftWall = (cell & Direction.LEFT) === 0;

    let x1o = hasLeftWall ? 0 : -opts.cellGap,
      x2o = hasRightWall ? 0 : opts.cellGap,
      y1o = hasTopWall ? 0 : -opts.cellGap,
      y2o = hasBottomWall ? 0 : opts.cellGap;

    if (hasTopWall) {
      walls += `M${pivotX + x1o},${pivotY}H${pivotX + opts.cellSize + x2o}`;
    } else {
      if (!hasRightWall) {
        walls += `M${pivotX + opts.cellSize},${pivotY}h${opts.cellGap}`
      }
      if (!hasLeftWall) {
        walls += `M${pivotX + x1o},${pivotY}h${opts.cellGap}`
      }
    }
    if (hasRightWall) {
      walls += `M${pivotX + opts.cellSize},${pivotY + y1o}V${pivotY + opts.cellSize + y2o}`;
    } else {
      if (!hasTopWall) {
        walls += `M${pivotX + opts.cellSize},${pivotY+y1o}v${opts.cellGap}`;
      }
      if (!hasBottomWall) {
        walls += `M${pivotX + opts.cellSize},${pivotY + opts.cellSize}v${opts.cellGap}`
      }
    }
    if ((cell & Direction.BOTTOM) === 0) {
      walls += `M${pivotX + x1o},${pivotY + opts.cellSize}H${pivotX + opts.cellSize + x2o}`;
    } else {
      if (!hasRightWall) {
        walls += `M${pivotX + opts.cellSize},${pivotY + opts.cellSize}h${opts.cellGap}`
      }
      if (!hasLeftWall) {
        walls += `M${pivotX + x1o},${pivotY + opts.cellSize}h${opts.cellGap}`
      }
    }
    if ((cell & Direction.LEFT) === 0) {
      walls += `M${pivotX},${pivotY + y1o}V${pivotY + opts.cellSize + y2o}`;
    } else {
      if (!hasTopWall) {
        walls += `M${pivotX},${pivotY + y1o}v${opts.cellGap}`;
      }
      if (!hasBottomWall) {
        walls += `M${pivotX},${pivotY + opts.cellSize}v${opts.cellGap}`
      }
    }

    x1o /= 2;
    x2o /= 2;
    y1o /= 2;
    y2o /= 2;

    let closedPath = `M${pivotX + x1o},${pivotY + y1o}H${pivotX + opts.cellSize + x2o}V${pivotY + opts.cellSize + y2o}H${pivotX + x1o}z`;
    defaultPath += closedPath;
    if (pathId) {
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
    opts.shouldFillPath && h('path', {d: defaultPath, strokeWidth: `0`, fill: colors.default}),
    h('path', {d: walls, strokeWidth: `${opts.lineWidth}px`, strokeLinecap: 'round'}),
  );
}

export const _supported_boards = [BoardType.Weave];
