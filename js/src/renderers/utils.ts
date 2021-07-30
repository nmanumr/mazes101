const colors = [
  'hsla(231deg, 45%, 75%, 0.5)',
];

function getColor() {
  let h = Math.round(Math.random() * 60) * 6;
  let s = 45 + Math.round(Math.random() * 4) * 5;
  let l = 55 + Math.round(Math.random() * 4) * 5;

  return `hsla(${h}deg, ${s}%, ${l}%, 0.5)`;
}

export function getColors(n: number) {
  let newColors = Math.max(0, (n - colors.length));

  for (let i = 0; i < newColors; i++) {
    colors.push(getColor());
  }

  return colors;
}

export function fillColor(paths: Record<number | string, number[]>, colors: Record<number | string, string>) {
  let n = Object.keys(paths).length;
  let colorsArray = getColors(n);
  let i = 0;
  for (let pathId in paths) {
    if (!colors[pathId]) {
      colors[pathId] = colorsArray[i];
    }
    i++;
  }

  return colors;
}

export function findCellPathId(cellIdx: number, paths: Record<string | number, number[]>) {
  for (let [k, v] of Object.entries(paths)) {
    if (v.includes(cellIdx)) {
      return k;
    }
  }
}
