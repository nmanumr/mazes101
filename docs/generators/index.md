# Generators

Generators are some algorithms that can be applied to some generic board, and they return a maze generated in that board.
Not all the algorithms are equal, every algorithm have some pros and cons. Some have some specific features others
are good in some specific situation.

Following are some generators built-in mazes101:

* [Aldous Broder](aldousBroder.md)
* [Eller](eller.md)
* [Kruskal](kruskal.md)
* [Prim](prim.md)
* [Sidewinder](sidewinder.md)

From all these algorithms [Kruskal](kruskal.md), [Prim](prim.md), and Backtrack are the ones that I personally like.

## References

Each generator generally exports following two members:

**`#!ts _required_fns: string[]`**
:   A list of all the function required by the algorithms.

**`#!ts generate(board: Board, fns: RequiredFunctions): Board`**
:   A function which, when called with board and required function will return a board with maze generated in it.


### Common required functions

Typically, each function required following few functions only. So, I you are implementing a custom board you basically,
need to implement these functions only.

**`#!ts getRows(board: Board): number[][]`**
:   Returns array of set of cell indexes in a row. This should also not include disabled cells.

**`#!ts getNeighbours(index: number, board: Board): number[]`**
:   Get indexes of cells neighbour to the given `index`. This shouldn't include disabled cells. 

**`#!ts removeInterWall(index1: number, index2: number, board: Board): Board`**
:   Remove wall between given two cells `index1` and `index2`.
    The function should return a board with walls between both cells removed.
