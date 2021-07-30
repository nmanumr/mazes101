# Aldous Broder

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/aldousBroder.ts)

{{ maze('rectangular', (10, 10), 'aldousBroder') }}

!!! warning
    Aldous Broder's algorithm guarantees to generate unbiased mazes but there is no guarantee that this algorithm
    will not be stuck in an infinite loop. So its recommended not to use this algorithm unless you really known what
    you are really doing.

Starts at an arbitrary location in the grid, move randomly from cell to cell. If moving to a previously unvisited
cell, carve a passage to it. End when all cells have been visited.

### Typical features

Starts quickly but can take a very long time to finish. Significantly, it is unbiased, meaning it is guaranteed to
generate mazes perfectly randomly, without preference to any particular texture or feature.

## Usage

```js
import {generate} from 'mazes101/generators/aldousBroder';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
    The function should return a board with walls between both cells removed.
