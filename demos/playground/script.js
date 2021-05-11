import Maze from '../../dist/index.js';

const {Boards, Generators, Renderers, RectangularMask} = Maze;
const boardEl = document.querySelector('#board');
const boardTypeEl = document.querySelector('#board-type');
const generatorEl = document.querySelector('#generator');
const rendererEl = document.querySelector('#renderer');
const regenerateEl = document.querySelector('#regenerate');

// let fontData = {
//   48: 'F09090909090F000',
//   52: '909090F010101000',
//   53: 'F08080F01010F000',
// }
//
// let mask = RectangularMask.maskFromText('404', {fontData: RectangularMask.loadHexFontData(fontData, true, true)});
// let board = Boards.rectangular.newBoard({height: mask.length, width: mask[0].length});
// board = RectangularMask.applyMask(board, mask);
// board = Generators.kruskal.generate(board, {...Boards.rectangular});
// boardEl.innerHTML = Renderers.rectangularSvg.render(board);

function removeElementChildren(element) {
  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }
}

function populateBoardTypes() {
  removeElementChildren(boardTypeEl);

  for (let board in Boards) {
    let opt = document.createElement('option');
    opt.innerHTML = board;
    boardTypeEl.appendChild(opt);
  }
}

function populateGenerators() {
  removeElementChildren(generatorEl);

  for (let generator in Generators) {
    if (generator.startsWith('_')) continue;
    if (!Generators[generator]._required_fns.every((fn) => Boards[boardTypeEl.value][fn])) continue;

    let opt = document.createElement('option');
    opt.innerHTML = generator;
    generatorEl.appendChild(opt);
  }
}

function populateRenderer() {
  removeElementChildren(rendererEl);

  for (let renderer in Renderers) {
    if (!Renderers[renderer]._supported_boards.includes(boardTypeEl.value)) continue;

    let opt = document.createElement('option');
    opt.innerHTML = renderer;
    rendererEl.appendChild(opt);
  }
}

function render() {
  let board = Boards[boardTypeEl.value].newBoard({height: 10, width: 10, radius: 10});

  // board = Maze.baseBoard.disableCell(6, board);
  // board = Maze.baseBoard.disableCell(11, board);

  let fns = Generators[generatorEl.value]._required_fns.reduce((acc, fn) => {
    acc[fn] = Boards[boardTypeEl.value][fn];
    return acc;
  }, {});
  board = Generators[generatorEl.value].generate(board, fns);

  boardEl.innerHTML = Renderers[rendererEl.value].render(board);
}

populateBoardTypes();
populateGenerators();
populateRenderer();

boardTypeEl.addEventListener('change', () => {
  populateGenerators();
  populateRenderer();

  render();
});

generatorEl.addEventListener('change', render);
rendererEl.addEventListener('change', render);
regenerateEl.addEventListener('click', render);
