# Rectangular Board

{{ maze('rectangular', (10, 10), 'kruskal') }}

## Usage

### New Board

```js
import {newBoard} from 'mazes101/boards/rectangular';

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
  <text x="625" y="358" fill="currentcolor" class="mono" style="font-size: 24px;">0 0 0 0 &nbsp;0 1 1 1</text>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M176 101h-60v60m60-60v30h30m-30-30h60m0 0v30m0-30h30m0 0v30m0-30h30m0 0v30m0-30h60m0 0v90h-30v-60m30-30h60v30m0 0h-30m30 0v30m-270-30v30m0 0h-30m30 0h30m-30 0v30h30v30m-60-60v60m120-60h-30v60m210-60h-30v60m30-60v240h-30M266 161v60m30-60v120m-180-60h30v30m-30-30v120m60-120h30m-30 0v60h-30m60-60h30m-30 0v30m30-60v30m0 0h30m-30 0v30m30-30v30m120-30h-60v30m60-30v90m-60-60h30m-30 0v30h-30m-60 0h-30v30m90-30h-30m30 0v30h-30v60h30v-30m-150-30h30m0 0h30m-30 0v60m30-60h30m-30 0v30m150-60v30m0 0h-30m30 0v30m-240 0h30m-30 0v30m240-30h30m-30 0v30h-30m-210 0h60m-60 0v30h120m-60-30h30m30-30v60m90-60v30m0 0v30m-90 0h90m0 0h60m0-30v30"/>
  <path stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M86 102v127m0 171V271.5M76 101h21M74 400h21M117 72h126m172 0H287M116 82V61m299 23V63"/>
  <text x="247" y="78" fill="currentColor" class="mono" style="font-size: 15px;">W:10</text>
  <text x="77" y="266" transform="rotate(-90,100,100) translate(-145 -174)" fill="currentColor" class="mono" style="font-size: 15px;">H:10</text>
  <circle cx="373" cy="147" r="24" stroke="#7D7D7D" stroke-width="4"/>
  <path stroke="#AB47BC" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M678 101h120"/>
  <path stroke="#66BB6A" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M678 221h120"/>
  <path stroke="#FFA726" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M798 221V101"/>
  <path stroke="#42A5F5" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M678 221V101"/>
  <text x="718" y="157" fill="#7d7d7d" class="mono">X:</text>
  <text x="718" y="180" fill="#7d7d7d" class="mono">Y:</text>
  <text x="747" y="157" fill="currentColor" class="mono">8</text>
  <text x="747" y="180" fill="currentColor" class="mono">1</text>
  <path stroke="#7D7D7D" stroke-linecap="round" stroke-width="4" d="M373 123l305-22M373 171l305.5 50"/>
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
