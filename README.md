## rollup-plugin-progress

Show current module being transpiled by the rollup bundler.

<img src="https://cloud.githubusercontent.com/assets/1796022/20893960/02d1b622-bb14-11e6-8ef5-dd5282248ecb.gif">

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
