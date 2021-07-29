# Boards

At the very core each board is just a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
where each element represents a cell. A single cell has information weather it is enabled or not and wall in different
directions.

A board in just a view on top if this `Uint8Array` which basically just defines the neighbourhood of each cell.
Each board needs to have following 3 functions:

1. `getNeighbours`: get neighbour cell indexes at given index.
2. `removeInterWall`: remove wall between two cell indexes
3. `getRows`: get array of rows of cell indexes

## Built-in Boards

Mazes101 comes with following builtin boards:

* [Rectangular Board](rectangular.md)
* [Weave Board](weave.md)
* [Circular Board](circular.md)
* Hexagonal Board (_coming soon..._)
* Triangular Board (_coming soon..._)

## Custom Boards

Adding a support for any other board type is also not that difficult. See [Custom Boards](#test) fore more details.
