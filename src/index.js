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
  let total = 0;
  const totalFilePath = path.resolve(__dirname, "./total.txt");
  try {
    total = fs.readFileSync(totalFilePath);
  } catch (e) {
    fs.writeFileSync(totalFilePath, 0);
  }
  let progress = {
    total: total,
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

      if (options.clearLine && process.stdin.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        let output = "";
        if (progress.total > 0) {
          let percent = Math.round(100 * progress.loaded / progress.total);
          output += Math.min(100, percent) + "% ";
        }
        output += `(${chalk.red(progress.loaded)}): ${file}`;
        if (output.length < process.stdout.columns) {
          process.stdout.write(output);
        } else {
          process.stdout.write(output.substring(0, process.stdout.columns - 1));
        }
      } else {
        console.log(`(${chalk.red(progress.loaded)}): ${file}`);
      }
    },
    generateBundle() {
      fs.writeFileSync(totalFilePath, progress.loaded);
      if (options.clearLine && process.stdin.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
      }
    }
  };
}
