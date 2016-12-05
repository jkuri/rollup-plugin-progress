## rollup-plugin-progress

Show current module being transpiled by the rollup bundler.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1796022/20892259/ba1cf87a-bb0d-11e6-9e09-fb680a3a392d.gif">
</p>

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
