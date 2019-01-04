import buble from 'rollup-plugin-buble';

const external = Object.keys(require('./package.json').dependencies).concat(['fs', 'path', 'readline']);

export default {
  input: 'src/index.js',
  plugins: [ buble() ],
  external: external,
  output: [
    { file: 'dist/rollup-plugin-progress.js', format: 'cjs' },
    { file: 'dist/rollup-plugin-progress.esm.js', format: 'es' }
  ]
};
