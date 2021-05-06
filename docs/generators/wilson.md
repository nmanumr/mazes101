# Wilson
[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/wilson.ts)

Chooses an arbitrary cell and adds it to the maze. Starting from any other cell, performs a loop-erased random walk
until encounters a cell belonging to the maze, and then adds the resulting walk. Repeats until all cells have been added.

### Typical Feature

Slow to start but accelerates quickly as paths are added to the maze. As with Aldous-Broder, it is unbiased,
meaning it is guaranteed to generate mazes perfectly randomly, without preference to any particular texture or feature.

## Usage

```js
import {generate} from 'mazes101/generators/wilson';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
  The function should return a board with walls between both cells removed.
