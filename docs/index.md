# Home

This project provides set of utilities to generate, render, and other kind of stuff with mazes. Following are some mazes generated:

<div style="display: flex; flex-wrap: wrap; align-items: center;">
    {{ maze('rectangular', (10, 10), 'kruskal') }}
    {{ maze('weave', (10, 10), 'backtrack') }}
    {{ maze('circular', (8, 3), 'backtrack') }}
</div>


## Usage

As mentioned early, these are just some set of utilizes which means that they can be hacked to do anything you like.
The typical flow of generating a maze looks something as following:


### Javascript

First, you need to install the `mazes101` package using npm, yarn or alternatively you can also load umd modules from CDN:

=== "NPM"

    ```sh
    npm i mazes101 --save
    ```

=== "Yarn"

    ``` sh
    yarn add mazes101
    ```

=== "CDN"
    ```html
    <!--
        DON'T FORGET to replace x.x.x we appropriate version
        Check all the release here: https://github.com/nmanumr/mazes101/releases
    -->
    <script src="https://cdn.jsdelivr.net/npm/mazes101@x.x.x/index.umd.js"></script>
    <script>
    // here mazes101 is available in global scope
    </script>
    ```


Then, the package can be used to generate the mazes as following:

```ts linenums="1"
import * as Rectangular from 'mazes101/boards/rectangular';
import {generate} from 'mazes101/generators/backtrack';
import {render} from 'mazes101/renderers/rectangularSvg';
    
let board = Rectangular.newBoard({height: 20, width: 20});
board = generate(board, Rectangular);
const svgString = render(board);
```

!!! note
    The `generate` method returns a new board instead of altering the provided board so, it is important to assign that
    board somewhere. This is true for all the functions in Mazes101, they don't have side effects instead they return the
    changed value.

### Deno

The deno package is not yet published to [deno.land/x](https://deno.land/x) but you can use `import_map.json` file to map `mazes101` package name to github.

=== "index.ts"

    ``` ts
    import mazes101 from 'mazes101';
    ```

=== "import_map.json"

    ```json
    {
        "imports": {
            "mazes101/": "https://raw.githubusercontent.com/nmanumr/mazes101/deno/"
        }
    }
    ```

To run the script use:

```sh
deno run --import-map=import_map.json index.ts
```


## Status

The project is still under development and therefore contributions are welcomed here is the Status of the project:

- [ ] Boards
    * [x] Rectangular Board
    * [x] Weave Board
    * [x] Circular Board
    * [ ] Trinagular Board
    * [ ] Hexagonal Board
- [x] Generators
    * [x] Aldous Broder
    * [x] Backtrack
    * [x] Eller
    * [x] Kruskal
    * [x] Prim
    * [x] Sidewinder
    * [x] Wilson
- [x] Renderers
    * [x] SVG
    * [x] Canvas 

I'm also thinking to port the code base to other languages, current Python & Dart are in my wishlist so any contributions on porting are also welcomed.
