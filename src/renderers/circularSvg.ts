import {CircularBoard, Direction, getRows} from "../boards/circular";
import {BoardType} from "../base";
import {StrH as globalH} from '../h';
import {fillColor, findCellPathId} from "./utils";

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

export function render<T = string>(board: CircularBoard, options: Partial<RendererOptions<T>> = {}): T {
  let opts: RendererOptions<T> = {...defaultOptions, ...options} as RendererOptions<T>;
  let colors = fillColor(opts.paths, opts.colors);

  const innerRadius = board.size.innerRadius;
  const radiusOffset = (1 - innerRadius) * opts.cellSize * 0.75;
  const radius = opts.cellSize * (board.size.radius - board.size.innerRadius) + radiusOffset + innerRadius * opts.cellSize;

  const canvasSize = radius * 2 + opts.lineWidth + opts.cellSize*2;
  const center = canvasSize / 2;

  let rows = getRows(board);
  let paths: Record<string, string> = {};
  let walls = '';

  for (let r = innerRadius; r < rows.length + innerRadius; r++) {
    for (let i = 0; i < rows[r - innerRadius].length; i++) {
      const cellIndex = rows[r - innerRadius][i];
      const cell = board.cells[cellIndex];

      const pathId = findCellPathId(cellIndex, opts.paths);

      const cellArc = 2 * Math.PI / rows[r - innerRadius].length;
      const innerArcRadius = r * opts.cellSize + radiusOffset;
      const outerArcRadius = innerArcRadius + opts.cellSize;
      const theta1 = cellArc * i;
      const theta2 = theta1 + cellArc;

      const [[xi1, yi1], [xi2, yi2]] = [theta1, theta2]
        .map(t => [Math.cos(t), Math.sin(t)].map((i) => center + innerArcRadius * i));

      const [[xo1, yo1], [xo2, yo2]] = [theta1, theta2]
        .map(t => [Math.cos(t), Math.sin(t)].map((i) => center + outerArcRadius * i));

      if ((cell & Direction.BOTTOM) === 0) {
        walls += `M${xi1},${yi1}A${innerArcRadius},${innerArcRadius},0,0,1,${xi2},${yi2}`;
      }
      if ((cell & Direction.LEFT) === 0) {
        walls += `M${xi1},${yi1}L${xo1},${yo1}`;
      }
      if ((cell & Direction.RIGHT) === 0) {
        walls += `M${xi2},${yi2}L${xo2},${yo2}`;
      }
      if (r === (rows.length + innerRadius) - 1) {
        walls += `M${xo1},${yo1}A${outerArcRadius},${outerArcRadius},0,0,1,${xo2},${yo2}`
      }

      if (pathId) {
        let closedPath = `M${xi1},${yi1}A${innerArcRadius},${innerArcRadius},0,0,1,${xi2},${yi2}L${xo2},${yo2}A${outerArcRadius},${outerArcRadius},0,0,0,${xo1},${yo1}z`;
        paths[pathId] = ((paths[pathId] || '') + closedPath);
      }
    }
  }

  const h = opts.h;
  return h(
    "svg",
    {
      stroke: "currentColor",
      fill: "none",
      width: `${canvasSize}px`,
      height: `${canvasSize}px`,
      viewBox: `0 0 ${canvasSize} ${canvasSize}`
    },
    Object.entries(paths).map(([k, path]) => {
      return h('path', {d: path, fill: colors[k], key: k, strokeWidth: `0`});
    }),
    h("path", {d: walls, strokeWidth: `${opts.lineWidth}px`, strokeLinecap: "round"})
  );
}

export const _supported_boards = [BoardType.Circular];
