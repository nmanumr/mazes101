import {BaseBoard, disableCell} from "../base.js";

/*--------------
 * Types
 *-------------- */

type FontData = Record<string, Array<Array<number>>>;

interface MaskOptions {
  fontData: FontData;

  letterSpacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

let defaultOptions: Partial<MaskOptions> = {
  letterSpacing: 2,
  paddingTop: 8,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 1,
}

/*--------------
 * Utilities
 *-------------- */

/**
 * Disables all the cell where there is a 1 in the mask array
 */
export function applyMask<Board extends BaseBoard>(board: Board, mask: Array<Array<number>>) {
  mask.flat().map((e, i) => {
    if (e) {
      board = disableCell(i, board);
    }
  });

  return board;
}

/**
 * Create a mask for rectangular maze which has given text rendered
 */
export function maskFromText(text: string, opt: Partial<MaskOptions> = {}) {
  opt = {...defaultOptions, ...opt};

  let board = [];
  for (let char of text.split('')) {
    board.push(opt.fontData[char.charCodeAt(0)] || opt.fontData[0]);
  }

  board = board
    .reduce((acc, char) => {
      for (let i = 0; i < char.length; i++) {
        let row = char[i];
        if (!acc[i]) acc[i] = [];

        acc[i] = [...acc[i], ...Array(opt.letterSpacing).fill(0), ...row];
      }

      return acc;
    }, [])
    .filter((r) => !r.every((e) => e === 0))
    .map((r) => [...Array(opt.paddingLeft).fill(0), ...r.slice(1), ...Array(opt.paddingRight).fill(0)]);

  return [
    ...Array(opt.paddingTop).fill(Array(board[0].length).fill(0)),
    ...board,
    ...Array(opt.paddingBottom).fill(Array(board[0].length).fill(0)),
  ];
}

/**
 * translates a hex font map to binary bitmap font map
 *
 * For example:
 * {48: 'F0'} -> {48: [[1,1,1,1, 0,0,0,0]]}
 */
export function loadHexFontData(data: Record<string, string>, trimX = false, trimY = false): FontData {
  return Object.fromEntries(Object.entries(data).map(([key, val]) => {
    return [key, hexToBitMap(val, trimX, trimY)];
  }));
}

/**
 * translates hex values to binary bitmap.
 *
 * For example:
 * ```
 * F090 -> [[1,1,1,1, 0,0,0,0], [1,0,0,1, 0,0,0,0]]
 * ```
 *
 * Optionally, also trims empty area from the bitmap. for example:
 *
 * ```
 * F09000
 *   -> [[1,1,1,1, 0,0,0,0], [1,0,0,1, 0,0,0,0], [0,0,0,0, 0,0,0,0]]
 *   -> [[1,1,1,1], [1,0,0,1]]
 * ```
 */
export function hexToBitMap(hex: string, trimX = false, trimY = false): Array<Array<number>> {
  let bitmap = hex.match(/.{1,2}/g)
    .map((chunk) => {
      return parseInt(chunk, 16)
        .toString(2)
        .padStart(8, '0')
        .split('')
        .map((c) => +c);
    });

  if (trimX) bitmap = trimBitmap(bitmap);
  if (trimY) bitmap = bitmap.filter((r) => !r.every((e) => e === 0));

  return bitmap;
}

/**
 * trim bitmap array to only used area
 *
 * For example:
 * ```
 * [[1,1,1,1, 0,0,0,0], [1,0,0,1, 0,0,0,0], [0,0,0,0, 0,0,0,0]]
 *  -> [[1,1,1,1], [1,0,0,1], [0,0,0,0]]
 * ```
 */
export function trimBitmap(bitmap: Array<Array<number>>) {
  let startX = Number.MAX_VALUE, endX = Number.MIN_VALUE;

  for (let row of bitmap) {
    let rowStr = row.join('');
    let startM = rowStr.match(/^0*/);
    let endM = rowStr.match(/0*$/);

    startX = Math.min(startM[0].length, startX);
    endX = Math.max(rowStr.length - endM[0].length, endX);
  }

  return bitmap.map((r) => r.slice(startX, endX));
}

/*----------------------------------------
 * Experimental fonts from DOS code pages
 *----------------------------------------*/

let fonts = <const>[
  'cga_08', 'cgathin_08', 'freedos_08', 'freedos_14', 'freedos_16', 'mda_14', 'olivetti_16',
  'tandy1_08', 'tandy2_08', 'unifont_16', 'univga_16', 'vga_08', 'vga_14', 'vga_16'
];

export async function loadFont(fontName: typeof fonts[number]): Promise<FontData> {
  let baseUrl = 'https://raw.githubusercontent.com/robhagemans/pcbasic/master/pcbasic/data/fonts/';
  let fontData: Record<number, Array<Array<number>>> = {};

  if (fetch) {
    let res = await fetch(baseUrl + fontName + '.hex');
    let raw = await res.text();

    for (let line of raw.split('\n')) {
      if (line.indexOf(':') === -1) continue;

      let [code, data] = line.split(":");
      let bitmap = data
        .match(/.{1,2}/g)
        .map((chunk) => {
          return parseInt(chunk, 16)
            .toString(2)
            .padStart(8, '0')
            .split('')
            .map((c) => +c);
        })

      fontData[parseInt(code, 16)] = bitmap;
    }
  }

  return fontData;
}
