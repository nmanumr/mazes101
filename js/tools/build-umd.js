import rollupBundle from './rollup.js'
import * as fs from "fs-extra";

fs.ensureDirSync('dist');

rollupBundle({
  input: './src/index.ts',
  dest: '../dist/index.umd.js',
  format: 'iife',
  declaration: false,
});
