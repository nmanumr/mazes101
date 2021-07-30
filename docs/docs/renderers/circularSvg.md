# Circular SVG Renderer

{{ maze('circular', [9, 3], 'backtrack') }}

## Usage

Circular SVG renderer outputs a svg when called with a circular board.

```ts
import {render} from 'mazes101/renderers/circularSvg';

let output = render(board, options);
```

By default the output will be string which contains an svg. the out can be a DOM SVGElement or a react component based on the `h` parameter you pass to options.

### Options

**`#!ts cellSize: number`**
:   The size of a single cell. It is basically height of the cell, the width of the cell will vary based on the number of cells in a single ring and distance from center.

    **Default**: `#!ts 30`

**`#!ts lineWidth: number`**
:   The width of wall line, it is shared between both cells

    **Default**: `#!ts 2`
    
    **Default**: `#!ts mazes101.h.StrH`

**`#!ts paths: Record<number | string, number[]>`**
:   An object that contains different paths to be rendered against their ids. A path is just an array of cell indexes.
    
    **Default**: `#!ts {}`

**`#!ts colors: Record<number | string, string>`**
:   An object that defined the colors to be used to fill paths against their ids.
    
    **Default**: `#!ts {}`

**`#!ts h: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T`**
:   A JSX factory function that will be used to construct the JSX. Read more [here](hfunction.md).

#### Example

```ts
{
    cellSize: 20,
    lineWidth: 5,
    paths: {0: [10, 11, 21, 20]},
    colors: {0: '#ccc'},
    h: React.CreateElement,
}
```
