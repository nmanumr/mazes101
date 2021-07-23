import * as rollup from 'rollup';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import * as fs from 'fs';
import * as path from 'path';

import {default as keysTransformer} from 'ts-transformer-keys/transformer.js';

const transformer = (service) => {
  return {
    before: [keysTransformer.default(service.getProgram())],
    after: []
  }
};

export default function rollupBundle({dest, input, format = 'umd', minify = true, declaration = true}) {
  let sourcemapFullFile = dest + '.map';

  let plugins = [
    typescript({
      transformers: [transformer],
      tsconfigOverride: {
        compilerOptions: {declaration}
      }
    }),
  ];

  if (minify) plugins.push(terser());

  rollup.rollup({
    input: input,
    plugins,
  }).then(function (bundle) {
    return bundle.generate({
      format,
      name: 'mazes101',
      sourcemap: true,
    });
  }).then(function (result) {
    // rollup doesn't add a sourceMappingURL
    // https://github.com/rollup/rollup/issues/121
    result.code = result.code + '\n//# sourceMappingURL=' + path.basename(sourcemapFullFile);

    fs.writeFileSync(dest, result.code);
    fs.writeFileSync(sourcemapFullFile, JSON.stringify(result.map) || '');
  }).catch(function (err) {
    console.error(err);
    process.exit(1);
  });
};
