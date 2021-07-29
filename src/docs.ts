/**
 * A helper to render mazes in docs
 */

import * as rectangular from './boards/rectangular';
import * as weave from './boards/weave';
import * as circular from './boards/circular';
import generators from './generators';
import renderers from './renderers';
import {DomH} from "./h/dom";

let mazeEls = Array.from(document.querySelectorAll<HTMLDivElement>('[data-maze]'));

for (let mazeEl of mazeEls) {
  let data = JSON.parse(mazeEl.dataset.maze || '{}');

  if (data.board === "rectangular") {
    let board = rectangular.newBoard({width: data.size[0], height: data.size[1]});

    if (data.generator && generators[data.generator]) {
      board = generators[data.generator].generate(board, rectangular);
    }

    let el = renderers.rectangularSvg.render<SVGElement>(board, {...data, h: DomH});
    mazeEl.appendChild(el);
  }

  else if (data.board === "weave") {
    let board = weave.newBoard({width: data.size[0], height: data.size[1]});

    if (data.generator && generators[data.generator]) {
      board = generators[data.generator].generate(board, weave);
    }

    let el = renderers.weaveSvg.render<SVGElement>(board, {...data, shouldFillPath: false, h: DomH});
    mazeEl.appendChild(el);
  }

  else if (data.board === 'circular') {
    let board = circular.newBoard({radius: data.size[0], innerRadius: data.size[1]});

    if (data.generator && generators[data.generator]) {
      board = generators[data.generator].generate(board, circular);

      let el = renderers.circularSvg.render<SVGElement>(board, {...data, h: DomH});
      mazeEl.appendChild(el);
    }
  }

  mazeEl.style.removeProperty('height');
  mazeEl.style.marginLeft = 'auto';
  mazeEl.style.marginRight = 'auto';
}
