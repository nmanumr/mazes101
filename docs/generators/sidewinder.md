# Sidewinder

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/sidewinder.ts)

{{ maze('rectangular', (10, 10), 'sidewinder') }}

Sequentially, considers a single at a time. Joins all the cells of first row.
For each other row, links random runs of adjacent cells, and then carve a next row cell from a random cell in each run.

### Typical Features

A strong vertical texture. One corridor runs the length of the northern row.
Difficult to use with masks and non-rectangular grids.

## Usage


```js
import {generate} from 'mazes101/generators/sidewinder';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getRows(board: Board): number[][]`**
:   Returns array of set of cell indexes in a row. This should also not include disabled cells.

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
  The function should return a board with walls between both cells removed.

**`#!ts getFactor?(rowIndex: number): number`** (_optional_)
:   Should return a number in range of 0 and 1 (default is 0.5). This function is called on each cell so, you can also
    return different values based on the row number this will change probability of horizontal passages on each row.
