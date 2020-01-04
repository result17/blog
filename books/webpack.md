## webpack
Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。
Webpack的缺点是只能用于采用模块化开发的项目.
## loader
要支持非 JavaScript 类型的文件，需要使用 Webpack 的 Loader 机制。
```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```
use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的。
重要的事情再说一次由后到前。\
warning: css-loader1.0以后，不能再使用minimize。应该改用uglifyjs-webpack-plugin。
## Plugin
```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```
使用此plugin单独提取css，注意此有个大坑，要安装extract-text-webpack-plugin v4.00beta版本才可以使用
```js
npm i -D extract-text-webpack-plugin@next
```
## 使用 DevServer
- 提供 HTTP 服务而不是使用本地文件预览；
监听文件的变化并自动刷新网页，做到实时预览；
支持 Source Map，以方便调试

## webpack核心概念
- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
## entry
entry是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

entry 配置是必填的，若不填则将导致 Webpack 报错退出。
## context
Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。
注意的是，context一定是绝对路径。
```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}
```
默认是，webpack工作目录。
## entry类型
- string
- array
- object
## chunk名称
- 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
- 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。
## 动态Entry
假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：
```js
// 同步函数
entry: () => {
  return {
    a:'./pages/a',
    b:'./pages/b',
  }
};
// 异步函数
entry: () => {
  return new Promise((resolve)=>{
    resolve({
       a:'./pages/a',
       b:'./pages/b',
    });
  });
};
```
## output
output 配置如何输出最终想要的代码。它是一个object
## filename
output.filename 配置输出文件的名称，为string 类型。
```js
// 静态
filename: 'bundle.js'
// 动态
filename: '[name].js'
```
动态命名时会使用内部变量name去进行替换。内部变量还有id，hash和chunkhash。
## chunkFilename
output.chunkFilename 配置无入口的 Chunk 在输出时的文件名称。
## path
path为配置输出文件存在本地的目录。
```js
path:  path.resolve(__dirname, 'dist_[hash]')
```
## publicPath
常用于CDN服务器的资源文件
```js
filename:'[name]_[chunkhash:8].js'
publicPath: 'https://cdn.example.com/assets/'
```
引用文件时
```js
<script src='https://cdn.example.com/assets/a_12345678.js'></script>
```
## crossOriginLoading
用来设置script标签的crossorigin属性，详细的去看MDN文档。