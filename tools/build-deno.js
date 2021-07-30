import glob from 'glob';
import ts from "typescript";
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from 'path';
import keyTransformer from "./keys-transformer.js";

let files = glob.sync('./src/**/!(docs).ts');
const program = ts.createProgram(files, {});

function processSource(source) {
  let result = ts.transform(source, [keyTransformer(program)]);
  return result.transformed[0];
}

function print(source) {
  const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed, removeComments: true});
  return printer.printNode(ts.EmitHint.Unspecified, source);
}

function writeFile(text, i) {
  let filepath = files[i].replace('./src/', './dist/deno/');

  fsExtra.ensureDirSync(path.dirname(filepath));
  fs.writeFileSync(filepath, text, "utf8");
}

files
    .map((file) => program.getSourceFile(file))
    .map(processSource)
    .map(print)
    .map(writeFile);
