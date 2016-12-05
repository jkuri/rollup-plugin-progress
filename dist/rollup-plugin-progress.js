'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = _interopDefault(require('path'));
var chalk = _interopDefault(require('chalk'));
var rollupPluginutils = require('rollup-pluginutils');

function normalizePath(id) {
	return path.relative(process.cwd(), id).split(path.sep).join('/');
}

function progress(options) {
  if ( options === void 0 ) options = {};

  if (typeof options.clearLine === 'undefined') {
    options.clearLine = true;
  }

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);
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

      if (options.clearLine) {
        if (typeof process.stdout.clearLine === 'function') {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
        }
        process.stdout.write(("Building (" + (chalk.red(progress.loaded)) + "): " + (chalk.blue(file))));
      } else {
        console.log(("Building (" + (chalk.red(progress.loaded)) + "): " + (chalk.blue(file))));
      }
    },
    ongenerate: function ongenerate() {
      if (options.clearLine) {
        if (typeof process.stdout.clearLine === 'function') {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
        }
      }
    }
  };
}

module.exports = progress;
