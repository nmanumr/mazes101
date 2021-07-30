import rollupBundle from './rollup.js'
import * as fs from "fs-extra";

fs.ensureDirSync('dist');

rollupBundle({
  input: 'src/docs.ts',
  dest: 'docs/docs/javascript/index.js',
  declaration: false,
});
