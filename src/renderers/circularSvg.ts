import {CircularBoard, Direction, getRows} from "../boards/circular";
import {hasCellWall} from "../base";

interface RendererOptions {
  cellSize: number;
  lineWidth: number;
}

const defaultOptions: RendererOptions = {
  cellSize: 30,
  lineWidth: 2,
}

export function render(board: CircularBoard, options: Partial<RendererOptions> = {}) {
  options = {...defaultOptions, ...options};
  const innerRadius = board.size.innerRadius;
  const radiusOffset = (1 - innerRadius) * options.cellSize * 0.75;
  const radius = options.cellSize * (board.size.radius + innerRadius) * 2 + options.lineWidth + radiusOffset;
  const canvasSize = radius + (board.size.radius + innerRadius) * 2;
  const center = canvasSize / 2;

  let rows = getRows(board);
  let path = '';

  for (let r = innerRadius; r < rows.length + innerRadius; r++) {
    for (let i = 0; i < rows[r - innerRadius].length; i++) {
      const cell = board.cells[rows[r - innerRadius][i]];

      const cellArc = 2 * Math.PI / rows[r - innerRadius].length;
      const innerArcRadius = r * options.cellSize + radiusOffset;
      const outerArcRadius = innerArcRadius + options.cellSize;
      const theta1 = cellArc * i;
      const theta2 = theta1 + cellArc;

      const [[xi1, yi1], [xi2, yi2]] = [theta1, theta2]
        .map(t => [Math.cos(t), Math.sin(t)].map((i) => center + innerArcRadius * i));

      const [[xo1, yo1], [xo2, yo2]] = [theta1, theta2]
        .map(t => [Math.cos(t), Math.sin(t)].map((i) => center + outerArcRadius * i));

      if ((cell & Direction.BOTTOM) === 0) {
        path += `M${xi1},${yi1}A${innerArcRadius},${innerArcRadius},0,0,1,${xi2},${yi2}`;
      }
      if ((cell & Direction.LEFT) === 0) {
        path += `M${xi1},${yi1}L${xo1},${yo1}`;
      }
      if ((cell & Direction.RIGHT) === 0) {
        path += `M${xi2},${yi2}L${xo2},${yo2}`;
      }

      if (r === (rows.length + innerRadius) - 1) {
        path += `M${xo1},${yo1}A${outerArcRadius},${outerArcRadius},0,0,1,${xo2},${yo2}`
      }
    }
  }

  return `<svg stroke="currentColor" fill="none" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
    <path d="${path}" stroke-width="${options.lineWidth}" stroke-linecap="round"/>
  </svg>`;
}
