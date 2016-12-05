## rollup-plugin-progress

Show current module being transpiled by the rollup bundler.

### Installation

```sh
npm i rollup-plugin-progress --save-dev
```

### Usage

Include the following in the rollup config

```js
import { rollup } from 'rollup';
import progress from 'rollup-plugin-progress';

rollup({
  entry: 'main.js',
  plugins: [
    progress({
      clearLine: false // default: true
    })
  ]
}).then( bundle => bundle.write({ dest: 'bundle.js', format: 'iife' }) );
```
