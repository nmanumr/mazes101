# Renderers

A renderer is a function that takes a board and renders it to some other form (maybe to svg, canvas, image or string).

Following are some renders built-in mazes101:

* **Circular Board**
    * [Circular SVG](circularSvg.md)
* **Rectangular Board**
    * [Rectangular SVG](rectangularSvg.md)

## References

Each generator generally exports following two members:

**`#!ts _supported_boards: string[]`**
:   A list different kinds of board this renderer supports.

**`#!ts render(board: Board, options: Partial<RendererOptions> = {})`**
:   A function that takes a board and some optional options and splits out a rendered version of the provided board.

