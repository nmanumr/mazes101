# Eller

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/eller.ts)

{{ maze('rectangular', (10, 10), 'eller') }}

Sequentially, considers a single at a time. Assigns the unvisited cells in the current row to different sets.
Randomly links adjacent cells that belong to different sets, merging the sets together as it go.
For each remaining set, chooses at least one cell and carve a next row cell, adding that next row cell to the set as well.
Repeats for every row in the grid. On the final row, links all adjacent cells that belong to different sets.

### Typical features

Final row tends to have fewer walls as a result of needing to merge multiple sets together.
Difficult to use with masks and non-rectangular grids.

## Usage

```js
import {generate} from 'mazes101/generators/eller';

board = generate(board, {getRows, getNextRowNeighbours, removeInterWall});
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
