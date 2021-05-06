# Prim

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/prim.ts)

Initializes a set with an arbitrary cell. Randomly chooses a cell from the set. If it has no unvisited neighbors,
removes it from the set. Otherwise, chooses one of the cell’s unvisited neighbors, links the two together,
and adds the neighbor to the set. Repeats until the set is not empty.

### Typical features

A strong radial texture centered on the starting cell. Mazes tend to have more dead ends than other algorithms,
and shorter paths.

## Usage

```js
import {generate} from 'mazes101/generators/prim';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
  The function should return a board with walls between both cells removed.
