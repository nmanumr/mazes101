import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const keysTransformer = require('ts-transformer-keys/transformer').default;

const transformer = (service) => {
  return {
    before: [keysTransformer(service.getProgram())],
    after: []
  }
};

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        transformers: [transformer],
        tsconfigOverride: {
          compilerOptions: { declaration: true }
        }
      }),
      terser()
    ],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'mazes101',
      esModule: false
    }
  },
  {
    input: ['src/index.ts'],
    plugins: [
      typescript({
        transformers: [transformer],
        tsconfigOverride: {
          compilerOptions: {declaration: true},
        }
      })
    ],
    output: {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'auto'
    }
  }
]
