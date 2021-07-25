import React, {useEffect} from 'react'

import Header from "./Header";
import {useMaze, useMazeOptions} from "./maze";

export default function App() {
  const options = useMazeOptions();
  const {board, moves, resetBoard} = useMaze(options);

  useEffect(resetBoard, [
    options.selectedBoard, options.selectedGenerator,
    options.size.width, options.size.height,
    options.size.innerRadius, options.size.radius,
  ]);

  return (
    <div>
      <Header/>

      <div className="bg-white py-6 shadow-md-z1">
        <div className="mx-auto max-w-[1220px] px-4 flex">
          <div className="flex items-center space-x-3 w-52 justify-center">
            <button onClick={resetBoard}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-200 overflow-hidden text-opacity-90 text-black">
              <span className="material-icons">replay</span>
            </button>
            <button
              className="flex items-center justify-center h-14 w-14 bg-primary-fg-dark text-opacity-95 text-white rounded-full overflow-hidden">
              <span className="material-icons text-3xl">play_arrow</span>
            </button>
            <button
              className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-200 overflow-hidden text-opacity-90 text-black">
              <span className="material-icons">skip_next</span>
            </button>
          </div>

          <div className="ml-4 min-w-[8rem]">
            <div className="text-sm text-gray-600 mb-1.5 font-medium">Steps</div>
            <div className="text-2xl text-black text-opacity-80">0/{moves.length}</div>
          </div>

          <div className="ml-4 min-w-[9rem]">
            <label className="text-sm text-gray-600 mb-1.5 font-medium" htmlFor="generator">Generator</label>
            <select className="text-sm" {...options.generator.field}>
              {options.generator.options.map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
            </select>
          </div>

          <div className="flex-grow"/>

          {/*<div className="flex items-center">*/}
          {/*  <button>*/}
          {/*    <span className="material-icons">code</span>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>

      <div className="max-w-[1220px] px-4 mx-auto flex mt-6">
        <div className="w-52 space-y-4 flex-shrink-0">
          <div>
            <label className="text-sm text-gray-600 mb-1.5 font-medium" htmlFor="board">Board Type</label>
            <select className="text-sm" {...options.board.field}>
              {options.board.options.map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
            </select>
          </div>

          <div className="flex space-x-4">
            {options.boardOptions.map((field) => (
              <div key={field.id}>
                <label className="text-sm text-gray-600 mb-1.5 font-medium capitalize"
                       htmlFor={field.id}>{field.text}</label>
                <input className="text-sm" {...field.field} />
              </div>
            ))}
          </div>
        </div>

        <div className="ml-4 flex-grow overflow-auto">
          <div className="mx-auto w-min">
            {board}
          </div>
        </div>
      </div>
    </div>
  )
}
