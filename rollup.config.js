import buble from 'rollup-plugin-buble';

const external = Object.keys(require('./package.json').dependencies).concat(['fs', 'path', 'readline']);

export default {
  entry: 'src/index.js',
  plugins: [ buble() ],
  external: external,
  targets: [
    { dest: 'dist/rollup-plugin-progress.js', format: 'cjs' },
    { dest: 'dist/rollup-plugin-progress.esm.js', format: 'es' }
  ]
};
