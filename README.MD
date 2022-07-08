## Getting started

```sh
$ npm install cuiplus-ifdef
```

## Usage
### vite.config.js
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
### .env.development

```config
VITE_PROJECT_TYPE = PROJECT_A

```
### use
```js 

//#ifdef PROJECT_A
console.log('only show in PROJECT_A')
//#endif

//#ifndef PROJECT_A
console.log('only show not in PROJECT_A')
//#endif

```

### .env.development  (use '-' to support child)

```config
VITE_PROJECT_TYPE = PROJECT-A

```
### use
```js 

//#ifdef PROJECT-A
console.log('show this')
//#endif

//#ifdef PROJECT
console.log('allow show this')
//#endif

//#ifndef PROJECT-B
console.log('allow show this')
//#endif

//#ifndef PROJECT-A
console.log('not show')
//#endif

//#ifndef PROJECT
console.log('not show')
//#endif

//you can allow use "<!--ifdef [NAME]--> and <!--ifndef [NAME]--> in html

```
