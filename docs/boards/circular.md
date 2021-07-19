# Circular Board

{{ maze('circular', 10, 'kruskal') }}

## Usage


=== "New Board"

    ```js
    import {newBoard} from 'mazes101/boards/circular';
    
    let board = newBoard({radius: 7});
    ```

=== "From existing base board"

    ```js
    import {newFromBaseBoard} from 'mazes101/boards/circular';
    
    let board = newFromBaseBoard(baseBoard, {radius: 7});
    ```

## Anatomy

### Size Parameters

A rectangular board has two size parameters:

1. `radius`: 
2. `innerRadius`

### Position

Position of each cell is represented by polar coordinates where:

* `r` is rth row from center, starts from first visible row
* `t` is nth cell in rth row

### Directions

Each cell in a rectangular board utilizes 4 directions as following:

1. Top clockwise (mask: `0b00001` or `1`)
2. Top counter-clockwise (mask: `0b00010` or `2`)
3. Right (mask: `0b00100` or `4`)
4. Bottom (mask: `0b01000` or `8`)
5. Left (mask: `0b10000` or `16`)

If there is only one top cell it will be considered in top clockwise direction.
