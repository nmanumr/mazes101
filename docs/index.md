# Home

This project provides set of utilities to generate, render, and other kind of stuff with mazes. For now only Circular,
and Rectangular maze boards are supported but support for any other board can be added easily.

## Installation

### via package manager

The package provided is completely tree shakeable which means that only the code you will be using will be bundled.
The output bundle for basic rectangular maze is normally upto 3KBs. 

=== "NPM"

    ```sh
    npm i mazes101 --save
    ```

=== "Yarn"

    ``` sh
    yarn add mazes101
    ```

### via CDN

Coming Soon...


## Usage

As mentioned early, these are just some set of utilizes which means that they can be hacked to do anything you like.
The typical flow of generating a maze looks something as following:

### Step 1: Create an empty board

First, chose a type of board you can create then create an empty board of that type. For example for a rectangular board
you can import it from `boards/rectangular` and use it like:

```js linenums="1"
import {newBoard} from 'mazes101/boards/rectangular';

let board = newBoard({height: 20, width: 20});
```

Before generating a maze in this board, you can also do some preprocessing on this board, like
disabling some cells etc.

### Step 2: Generate maze

Next, step could be to generate a maze in this board, for this you need a maze generation algorithm. Mazes101 comes with
some built-in algorithms for example let your Kruskals's minimum spanning tree algorithm:

```js linenums="4"
import {generate} from 'mazes101/generators/kruskal';

// import required functions from the board you selected in step 1
import {
  getRows,
  getNextRowNeighbours,
  removeInterWall
} from 'mazes101/boards/rectangular';

board = generate(board, {getRows, getNextRowNeighbours, removeInterWall});
```

!!! note
    The `generate` method returns a new board instead of altering the provided board so, it is important to assign that
    board somewhere. This is true for all the functions in Mazes101, they don't have side effects instead they return the
    changed value.

### Step 3: Render the board

The last step would be to render the board, Mazes101 comes with some built-in renderers too. For example,
`renderers/rectangularSvg` this renderer renders rectangular boards to svg string.

```js linenums="14"
import {render} from 'mazes101/renderers/rectangularSvg';

const svgString = render(board);
```

Now, you can either render this svg string to DOM, save it to a file or send it to client via http.
