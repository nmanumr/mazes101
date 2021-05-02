# Mazes101

Utilities to generate, render and hack with any sort of mazes.

## Installation

**NOTE:** package not published yet

```sh
npm i mazes101 --save
```

## Usage

```js
// 1. create an empty board
import {rectangularBoard} from 'mazes101/boards/rectangular';
let board = rectangularBoard({height: 20, width: 20});

// 2. generate maze in that board
import {getRows, getNextRowNeighbours, removeInterWall} from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/eller';
board = generate(board, {getRows, getNextRowNeighbours, removeInterWall});

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

## Progress

* Boards
    * [x] Rectangular Board
    * [x] Circular Board
    * [ ] Triangular Board
    * [ ] Hexagonal Board
* Generators
    * [x] AldousBroder
    * [x] BackTrack
    * [x] Eller
* Renderers
    * [x] Svg
    * [ ] Canvas
