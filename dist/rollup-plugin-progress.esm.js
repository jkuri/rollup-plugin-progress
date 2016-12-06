import 'fs';
import path from 'path';
import chalk from 'chalk';
import 'readline';
import { createFilter } from 'rollup-pluginutils';

function normalizePath(id) {
	return path.relative(process.cwd(), id).split(path.sep).join('/');
}

function progress(options) {
  if ( options === void 0 ) options = {};

  if (typeof options.clearLine === 'undefined') {
    options.clearLine = true;
  }

  var filter = createFilter(options.include, options.exclude);
  var progress = {
    loaded: 0
  };

  return {
    name: 'progress',
    load: function load(id) {
      var file = normalizePath(id);
      progress.loaded += 1;
    },
    transform: function transform(code, id) {
      var file = normalizePath(id);
      if (file.includes(':')) {
        return;
      }

      if (options.clearLine && process.stdin.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        var output = "(" + (chalk.red(progress.loaded)) + "): " + (chalk.yellow(file));
        if (output.length < process.stdout.columns) { 
          process.stdout.write(output);
        } else {
          process.stdout.write(output.substring(0, process.stdout.columns - 1));
        }
      } else {
        console.log(("(" + (chalk.red(progress.loaded)) + "): " + (chalk.yellow(file))));
      }
    },
    ongenerate: function ongenerate() {
      if (options.clearLine) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
      }
    }
  };
}

export default progress;
