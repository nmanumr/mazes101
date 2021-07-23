import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
// import dts from "rollup-plugin-dts";

const keysTransformer = require('ts-transformer-keys/transformer').default;

const packageName = 'mazes101';

const transformer = (service) => {
  return {
    before: [keysTransformer(service.getProgram())],
    after: []
  }
};

function pluginsConfig(minify = false, declaration = false) {
  let plugins = [
    typescript({
      transformers: [transformer],
      tsconfigOverride: {
        compilerOptions: {declaration}
      }
    }),
  ];

  if (minify) plugins.push(terser());

  return {plugins}
}


export default [
  {
    input: 'src/docs.ts',
    ...pluginsConfig(true),
    output: {
      file: 'docs/javascript/index.js',
      format: 'iife',
      name: 'mazes101',
      esModule: false
    }
  },
  {
    input: 'src/index.ts',
    ...pluginsConfig(false, false),
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: packageName,
    }
  },
]
