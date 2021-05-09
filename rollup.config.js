import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import multiInput from 'rollup-plugin-multi-input';

const keysTransformer = require('ts-transformer-keys/transformer').default;

const transformer = (service) => ({
  before: [keysTransformer(service.getProgram())],
  after: []
});

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        transformers: [transformer]
      }),
      terser()
    ],
    output: {
      file: 'umd/mazes101.js',
      format: 'umd',
      name: 'mazes101',
      esModule: false
    }
  },
  {
    input: ['src/index.ts'],
    plugins: [
      multiInput(),
      typescript({
        transformers: [transformer]
      })
    ],
    output: {
      dir: 'cjs',
      format: 'cjs',
      exports: 'auto'
    }
  }
]
