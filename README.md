# Mazes101

Utilities to generate, render and hack with any sort of mazes.

[See Docs](https://nmanumr.github.io/mazes101/)

## Installation

```sh
npm i mazes101 --save
```

## Usage

### For commonjs modules (nodejs)

```js
let maze = require('mazes101');

// 1. create an empty board
let {newBoard} = maze.Boards.rectangular;
let board = newBoard({height: 20, width: 20});

// 2. generate maze in that board
let {getRows, getNeighbours, removeInterWall} = maze.Boards.rectangular;
let {generate} = maze.Generators.kruskal;
board = generate(board, {getRows, getNextRowNeighbours, removeInterWall});

// 3. render the board
let {render} = maze.Renderers.rectangularSvg;
const svgString = render(board);
```

### For ecmascript modules

```js
// 1. create an empty board
import {newBoard} from 'mazes101/boards/rectangular';
let board = newBoard({height: 20, width: 20});

// 2. generate maze in that board
import {getRows, getNeighbours, removeInterWall} from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/eller';
board = generate(board, {getRows, getNeighbours, removeInterWall});

// 3. render the board
import {render} from 'mazes101/renderers/rectangularSvg';
const svgString = render(board);
```

Code in completely purgeable so only the bits that your are using will be bundled. For example, the following code
bundles to only 3KBs.

## Contributions
If you feel something is missing or something can be done better
feel free to open an issue or direct create a PR for that. Following
this a basic overview of progress on this project. We can also pickup
anything that is not implemented yet. 

## For development

```sh
# to build mazes101 in watch mode
npm run watch

# to serve documentation
pipenv run mkdocs serve

# to build documentation
pipenv run mkdocs build
```
