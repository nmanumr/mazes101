# `h` function

`h` function is a JSX factory function that can be used to control output of the SVG renderers. By default mazes101 uses [`mazes101.h.StrH`][1] function that outputs string.

##  Built-in `h` functions

### `mazes101.h.StrH`

[:octicons-file-code-24: Source][1]

This function is the default function being used by the renderes. It renders the provided element in string. This is specially useful on serverside mazes generation or when you want to store it a SVG file.

```ts
import * as Rectangular from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/backtrack';
import {render} from 'mazes101/renderers/rectangularSvg';

import {StrH} from 'mazes101/h';
    
let board = Rectangular.newBoard({height: 20, width: 20});
board = generate(board, Rectangular);

const output = render(board, {
   h: StrH 
});

// now output will be a strig
// like: '<svg stroke="currentColor" ...'
```

### `mazes101.h.dom.DomH`

[:octicons-file-code-24: Source][2]

It renders the provided element as DOM SVGElement and thus requires `document` object to be globally available. This is specially useful on clientside where you want to directly append the maze to a document node.


```ts
import * as Rectangular from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/backtrack';
import {render} from 'mazes101/renderers/rectangularSvg';

import {DomH} from 'mazes101/h/dom';
    
let board = Rectangular.newBoard({height: 20, width: 20});
board = generate(board, Rectangular);

const output = render(board, {
   h: DomH 
});

// now output will be a SVGElement
// which you can easily append to any document node
// like:
let containerEl = document.querySelector('#MazeConatiner');
containerEl.appendChild(output);
```

[1]: https://github.com/nmanumr/mazes101/blob/master/src/h/index.ts#L25
[2]: https://github.com/nmanumr/mazes101/blob/master/src/h/dom.ts#L41


##  Usage with Frameworks

### React

In react you can simply use `React.createElement` as h function to get react component as output which you can directly put in some other react component. 

```js
import React, {useEffect, useState} from 'react'

import * as Rectangular from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/backtrack';
import {render} from 'mazes101/renderers/rectangularSvg';
    

export default function Maze() {
    let [board, setBoard] = useState();

    useEffect(() => {
        let board = Rectangular.newBoard({height: 20, width: 20});
        board = generate(board, Rectangular);
        setBoard(board);
    }, []);

    return (
        <div>
            {board && render(board, {h: React.createElement })}
        </div>
    )
}
```
