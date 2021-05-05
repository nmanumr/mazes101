# Rectangular Board

## Usage


=== "New Board"

    ```js
    import {newBoard} from 'mazes101/boards/circular';
    
    let board = newBoard({height: 20, width: 20});
    ```

=== "From existing base board"

    ```js
    import {newFromBaseBoard} from 'mazes101/boards/circular';
    
    let board = newFromBaseBoard(baseBoard, {height: 20, width: 20});
    ```

## Anatomy

### Size Parameters

A rectangular board has two size parameters:

1. Width
2. Height

### Position

Position of each cell is represented by cartesian coordinates (`X` and `Y` values)

### Directions

Each cell in a rectangular board utilizes 4 directions as following:

1. Top (mask: `0b0001` or `1`)
2. Right (mask: `0b0010` or `2`)
3. Bottom (mask: `0b0100` or `4`)
4. Left (mask: `0b1000` or `8`)
