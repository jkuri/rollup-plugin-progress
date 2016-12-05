import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
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

      if (options.clearLine) {
        if (typeof process.stdout.clearLine === 'function') {
          process.stdout.clearLine();
          process.stdout.cursorTo(0)
        }
        process.stdout.write(`Building (${chalk.red(progress.loaded)}): ${chalk.blue(file)}`);
      } else {
        console.log(`Building (${chalk.red(progress.loaded)}): ${chalk.yellow(file)}`);
      }
    },
    ongenerate() {
      if (options.clearLine) {
        if (typeof process.stdout.clearLine === 'function') {
          process.stdout.clearLine();
          process.stdout.cursorTo(0)
        }
      }
    }
  };
}
