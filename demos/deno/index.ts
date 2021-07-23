import * as Rectangular  from "mazes101/boards/rectangular.ts";
import {generate} from 'mazes101/generators/backtrack.ts';
import {render} from 'mazes101/renderers/rectangularSvg.ts';

let board = Rectangular.newBoard({height: 7, width: 7});
board = generate(board, Rectangular);

let svg = render(board);

console.log(svg);
