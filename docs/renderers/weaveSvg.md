# Weave SVG Renderer

{{ maze('weave', (10, 10), 'backtrack') }}

## Usage

Weave SVG renderer outputs a svg when called with a weave board.

```ts
import {render} from 'mazes101/renderers/weaveSvg';

let output = render(board, options);
```

By default the output will be string which contains an svg. The output can be a DOM SVGElement or a react component based on the `h` parameter you pass to options.

### Options

**`#!ts cellSize: number`**
:   The size of a single cell. 

    **Default**: `#!ts 22`

**`#!ts lineWidth: number`**
:   The width of wall line, it is shared between both cells

    **Default**: `#!ts 2`

**`#!ts shouldFillPath: boolean`**
:   The fill the path with some color. With a darker backgorund color and a filled path, visually it becomes much easier to follow the paths in weave mazes.

    **Default**: `#!ts true`

**`#!ts paths: Record<number | string, number[]>`**
:   An object that contains different paths to be rendered against their ids. A path is just an array of cell indexes.
    
    **Default**: `#!ts {}`

**`#!ts colors: Record<number | string, string>`**
:   An object that defined the colors to be used to fill paths against their ids.
    
    **Default**: `#!ts {default: 'white'}`

**`#!ts h: (tag: string, attributes: Record<string, string>, ...children: Array<any>) => T`**
:   A JSX factory function that will be used to construct the JSX. Read more [here](hfunction.md).
    
    **Default**: `#!ts mazes101.h.StrH`

#### Example

```ts
{
    cellSize: 20,
    lineWidth: 5,
    shouldFillPath: true,
    paths: {0: [10, 11, 21, 20]},
    colors: {0: '#ccc'},
    h: React.CreateElement,
}
```
