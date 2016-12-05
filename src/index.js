import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';
import { createFilter } from 'rollup-pluginutils';

function normalizePath(id) {
	return path.relative(process.cwd(), id).split(path.sep).join('/');
}

export default function progress(options = {}) {
  if (typeof options.clearLine === 'undefined') {
    options.clearLine = true;
  }

  const filter = createFilter(options.include, options.exclude);
  let progress = {
    loaded: 0
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return {
    name: 'progress',
    load(id) {
      const file = normalizePath(id);
      progress.loaded += 1;
    },
    transform(code, id) {
      const file = normalizePath(id);
      if (file.includes(':')) {
        return;
      }

      if (options.clearLine && process.stdin.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        let output = `(${chalk.red(progress.loaded)}): ${chalk.yellow(file)}`;
        if (output.length < process.stdout.columns) { 
          process.stdout.write(output);
        } else {
          process.stdout.write(output.substring(0, process.stdout.columns - 1));
        }
      } else {
        console.log(`(${chalk.red(progress.loaded)}): ${chalk.yellow(file)}`);
      }
    },
    ongenerate() {
      if (options.clearLine) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
      }
    }
  };
}
