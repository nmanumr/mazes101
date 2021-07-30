# Kruskal

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/kruskal.ts)

{{ maze('rectangular', (10, 10), 'kruskal') }}

Begins by assigning each cell to a different set. Randomly links two adjacent cells, but only if they belong to
different sets. Merges the sets of the two cells. Repeats until only a single set remains.

### Typical features

Largely unbiased. Produces very regular, uniform mazes. Excels at producing mazes that are the union of disjoint
subsets, where the grid is prepopulated with some cells already connected in different areas.


## Usage

```js
import {generate} from 'mazes101/generators/kruskal';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
  The function should return a board with walls between both cells removed.
