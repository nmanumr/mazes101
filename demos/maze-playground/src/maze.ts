import React, {useEffect, useState} from "react";

import Boards from 'mazes101/boards';
import Generators from 'mazes101/generators';
import Renderers from 'mazes101/renderers';

import * as MovesRegister from 'mazes101/movesRegister';

let fieldOptions = {
  board: {
    text: 'Board Type',
    type: 'select',
    options: [
      {value: 'circular', text: 'Circular'},
      {value: 'rectangular', text: 'Rectangular'},
    ],
    default: 'rectangular',
  },
  radius: {
    type: 'number',
    default: 10,
  },
  innerRadius: {
    type: 'number',
    text: 'Inner Radius',
    default: 3,
  },
  width: {
    type: 'number',
    default: 15,
  },
  height: {
    type: 'number',
    default: 15,
  },
  generator: {
    type: 'select',
    options: [
      {value: 'aldousBroder', text: 'Aldous Broder'},
      {value: 'backtrack', text: 'Backtrack'},
      {value: 'eller', text: 'Eller'},
      {value: 'kruskal', text: 'Kruskal'},
      {value: 'prim', text: 'Prim'},
      {value: 'sidewinder', text: 'Sidewinder'},
    ],
    default: 'backtrack',
  }
}

interface UseNumberFieldOptions {
  id: string;
  type: string;
  default?: number | string;
}

export function useField(
  {id, type, default: defaultVal}: UseNumberFieldOptions
) {
  let [state, setState] = useState(defaultVal);

  return {
    id, type, value: state,
    onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setState(e.target.value);
    }
  }
}

export function useMazeOptions() {
  let fields: Partial<Record<keyof typeof fieldOptions, ReturnType<typeof useField>>> = {};
  let boardOptions: any[] = [];
  let selectedRenderer = '';

  for (let id of Object.keys(fieldOptions)) {
    fields[id] = useField({id, type: fieldOptions[id].type, default: fieldOptions[id].default});
  }

  if (fields.board?.value === 'circular') {
    boardOptions = ['radius', 'innerRadius']
    selectedRenderer = 'circularSvg';
  } else if (fields.board?.value === 'rectangular') {
    boardOptions = ['width', 'height']
    selectedRenderer = 'rectangularSvg';
  }

  boardOptions = boardOptions.map((i) => ({
    ...(fieldOptions as any)[i],
    id: i,
    text: (fieldOptions as any)[i].text || i,
    field: (fields as any)[i]
  }));

  return {
    selectedBoard: fields.board?.value as string,
    selectedGenerator: fields.generator?.value as string,
    selectedRenderer,
    size: {
      width: fields.width?.value as number,
      height: fields.height?.value as number,
      radius: fields.radius?.value as number,
      innerRadius: fields.innerRadius?.value as number,
    },
    board: {
      ...fieldOptions.board,
      field: fields.board,
    },
    boardOptions,
    generator: {
      ...fieldOptions.generator,
      field: fields.generator,
    }
  }
}

interface UseMazeOptions {
  selectedBoard: string;
  selectedGenerator: string;
  selectedRenderer: string;
  size: {width: number, height: number} | {radius: number, innerRadius: number},
  [key: string]: any;
}

export function useMaze({selectedBoard, selectedGenerator, selectedRenderer, size}: UseMazeOptions) {
  const [board, setBoard] = useState();
  const [moves, setMoves] = useState<typeof MovesRegister.moves>([]);

  function resetBoard() {
    let BoardModule = (Boards as any)[selectedBoard];
    let board = BoardModule.newBoard(size);
    board = (Generators as any)[selectedGenerator].generate(board, BoardModule, MovesRegister);
    board = (Renderers as any)[selectedRenderer].render(board, {h: React.createElement});
    setBoard(board);
    setMoves(MovesRegister.moves);
  }

  useEffect(resetBoard, []);
  return {board, moves, resetBoard};
}
