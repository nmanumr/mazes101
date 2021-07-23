// to run: deno run --import-map=demos/deno/import_map.json demos/deno/index.ts

import * as Rectangular  from "mazes101/boards/rectangular.ts";
import {generate} from 'mazes101/generators/backtrack.ts';
import {render} from 'mazes101/renderers/rectangularSvg.ts';

let board = Rectangular.newBoard({height: 10, width: 10});
board = generate(board, Rectangular);

let svg = render(board);

console.log(svg);
