# BackTrack

[:octicons-file-code-24: Source](https://github.com/nmanumr/mazes101/blob/master/src/generators/backtrack.ts)

{{ maze('rectangular', (10, 10), 'backtrack') }}

## Usage

```js
import {generate} from 'mazes101/generators/backtrack';

board = generate(board, {getNextRowNeighbours, removeInterWall});
```

### Required Functions

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
  The function should return a board with walls between both cells removed.
