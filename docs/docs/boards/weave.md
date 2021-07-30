# Weave Board

Weave boards are extended from rectangular board with only one function overridden `getNeighbours` which can look for next neighbour if immediate neighbour is a passage. The only limitation is that it can only look fore one next neighbour not multiples.

{{ maze('weave', [10, 10], 'backtrack') }}


## Usage

### New Board

```js
import {newBoard} from 'mazes101/boards/weave';

let board = newBoard({height: 20, width: 20});
```

`newBoard` method takes only one argument:

* [`size`](#size-parameters): size of the board

## Anatomy

<svg fill="none" viewBox="0 0 937 462">
  <text x="540" y="396" fill="#7d7d7d" class="mono" style="font-size: 24px;">Bits: &nbsp; 2 3 4</text>
  <text x="624" y="396" fill="#EF5350" class="mono" style="font-size: 24px;">1</text>
  <text x="754" y="396" fill="#42A5F5" class="mono" style="font-size: 24px;">5</text>
  <text x="783" y="396" fill="#66BB6A" class="mono" style="font-size: 24px;">6</text>
  <text x="812" y="396" fill="#FFA726" class="mono" style="font-size: 24px;">7</text>
  <text x="841" y="396" fill="#AB47BC" class="mono" style="font-size: 24px;">8</text>
  <text x="538" y="358" fill="#7d7d7d" class="mono" style="font-size: 24px;">Val: </text>
  <text x="625" y="358" fill="currentcolor" class="mono" style="font-size: 24px;">0 0 0 0 &nbsp;0 1 1 0</text>
  <text x="247" y="78" fill="currentColor" class="mono" style="font-size: 15px;">W:10</text>
  <text x="77" y="266" transform="rotate(-90,100,100) translate(-145 -174)" fill="currentColor" class="mono" style="font-size: 15px;">H:10</text>
  <text x="692" y="183" fill="#7d7d7d" class="mono">X:</text>
  <text x="692" y="206" fill="#7d7d7d" class="mono">Y:</text>
  <text x="721" y="183" fill="currentColor" class="mono">8</text>
  <text x="721" y="206" fill="currentColor" class="mono">1</text>
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M391 365v8M121 103h30-30zm0 22h30-30zm0-22v22-22zm22 0h38-38zm30 22v8-8zm0 0h8-8zm-30 0h8-8zm8 0v8-8zm22-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h30-30zm30 0v22-22zm-30 22h30-30zm38-22h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm-270 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm30-22h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm-248 38h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm52-30v38-38zm-22 0v38-38zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v30-30zm-22 30h22-22zm0-30v30-30zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm52-8v38-38zm-22 0v38-38zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm-270 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v38-38zm-30 30h8-8zm8-30v8-8zm0 30v8-8zm52-30v38-38zm-22 0v38-38zm52 8h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm30-22h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v38-38zm-22 0v38-38zm-248 30v38-38zm-22 0v38-38zm52 0v30-30zm-22 30h22-22zm0-30v30-30zm52 8h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm52-30v38-38zm-22 0v38-38zm52 0v38-38zm-22 0v38-38zm30 8h30-30zm0 22h30-30zm0-22v22-22zm52-8v38-38zm-22 0v38-38zm22 8h38-38zm30 22v8-8zm0 0h8-8zm-30 0h8-8zm8 0v8-8zm22-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm-248 38h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm30-22h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v38-38zm-22 0v38-38zm52 0v38-38zm-22 0v38-38zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 8h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm-270 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 8h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm52-22h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v38-38zm-22 0v38-38zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm-248 30v38-38zm-22 0v38-38zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h38-38zm30 22v8-8zm0 0h8-8zm-30 0h8-8zm8 0v8-8zm22-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v30-30zm-22 30h22-22zm0-30v30-30zm30 8h30-30zm22 22v8-8zm0 0h8-8zm-22-22v30-30zm22 0h30-30zm30 0v30-30zm-30 22h8-8zm8 0v8-8zm-248 8h8-8zm0-8v8-8zm0 30v8-8zm0 0h8-8zm-22-30v38-38zm22 8h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm30 8h30-30zm0 22h30-30zm0-22v22-22zm22 0h38-38zm30 22v8-8zm0 0h8-8zm-30 0h8-8zm8 0v8-8zm22-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v38-38zm-22 0v38-38zm-248 38h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30zm8-30v8-8zm52 0v30-30zm-22 30h22-22zm0-30v30-30zm52 8h8-8zm0-8v8-8zm-22 30h30-30zm0-30v30-30zm22 8h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h38-38zm0 22h38-38zm30-22h8-8zm30-8v30-30zm-30 30h30-30z"/>
  <path stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M415 84V63M86 102v127-127zm0 298V271.5 400zM76 101h21-21zm-2 299h21-21zm43-328h126-126zm298 0H287h128zM116 82V61v21z"/>
  <path stroke="#7D7D7D" stroke-width="4" d="M344 202c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24z"/>
  <path stroke="#AB47BC" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M649 132h120"/>
  <path stroke="#7D7D7D" stroke-linecap="round" stroke-width="4" d="M344 202l305.5 50M344 154l305-22-305 22z"/>
  <path stroke="#42A5F5" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M649 252V132"/>
  <path stroke="#66BB6A" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M649 252h120"/>
  <path stroke="#FFA726" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M769 252V132"/>
</svg>

In the figure above we have a rectangular board with:

* [size parameters](#size-parameters) `#!js {width: 10, height: 10}`,
* a highlighted cell at [position](#position) `#!js {x: 8, y:1}`
* the highlighted cell has value `0000 0111` which means its enabled (hence 0 at 1st bit) and
  has 3 walls removed top, right, bottom (hence 1 at 6, 7 and 8th bits).

### Size Parameters

[:octicons-file-code-24: Source][1]

A rectangular board has two size parameters:

1. `width`: width of board as number of cells
2. `height`: height of board as number of cells

### Position
[:octicons-file-code-24: Source][2]

Position of each cell is represented by cartesian coordinates (`X` and `Y` values).

### Directions

[:octicons-file-code-24: Source][3]

Each cell in a rectangular board utilizes 4 directions as following:

1. Top (mask: `0b0001` or `1`)
2. Right (mask: `0b0010` or `2`)
3. Bottom (mask: `0b0100` or `4`)
4. Left (mask: `0b1000` or `8`)


[1]: https://github.com/nmanumr/mazes101/blob/master/src/boards/rectangular.ts#L16
[2]: https://github.com/nmanumr/mazes101/blob/master/src/boards/rectangular.ts#L21
[3]: https://github.com/nmanumr/mazes101/blob/master/src/boards/rectangular.ts#L9
