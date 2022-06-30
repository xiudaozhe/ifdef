## Getting started

```sh
$ npm install cuiplus-ifdef
```

## Usage
```js
import { defineConfig, loadEnv } from 'vite'
import conditionalCompile from "cuiplus-ifdef";
export default defineConfig(({ command, mode }) => ({
    plugins: [
        conditionalCompile(loadEnv(mode, process.cwd()).VITE_PROJECT_TYPE),
        vue(),
    ],
}))
```
