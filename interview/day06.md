### Array.from
第二个参数为，元素的回调函数
### webpack entry
webpack入口可以设置成字符串，数组和对象（多入口）。如果较复杂时，可以写成函数形式。
### clean-webpack-plugin
用来清除旧的打包文件
### html-webpack-plugin
html-webpack-plugin 的作用是：当使用 webpack打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
### 复制函数
https://juejin.im/post/5dce5a7cf265da0be53e9ec4
### v8gc
https://juejin.im/post/5e6afc58e51d452715157434
### https原理
https://juejin.im/post/5e4bab31f265da5740641983
### webpack配置的resolve有哪些功能？
举例：
- alias  配置项通过别名来把原导入路径映射成一个新的导入路径
- extensions 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
```js
extensions: ['.js', '.json']
```
### optimization参数
```js
optimization: {
    splitChunks: { 
      chunks: "initial",         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载） 
      minSize: 0,                // 最小尺寸，默认0
      minChunks: 1,              // 最小 chunk ，默认1
      maxAsyncRequests: 1,       // 最大异步请求数， 默认1
      maxInitialRequests: 1,     // 最大初始化请求书，默认1
      name: () => {},            // 名称，此选项课接收 function
      cacheGroups: {                // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
        priority: "0",              // 缓存组优先级 false | object |
        vendor: {                   // key 为entry中定义的 入口名称
          chunks: "initial",        // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
          test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
          name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
          minSize: 0,
          minChunks: 1,
          enforce: true,
          reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
        }
      }
    }
  }

```
```js
// webpack.config.js (for webpack 4)
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
};
```
This option enables smart code splitting. With it, webpack would extract the vendor code if it gets larger than 30 kB (before minification and gzip). It would also extract the common code – this is useful if your build produces several bundles (e.g. if you split your app into routes).

将项目中重复引入的以来单独打包，进行优化。

```js
// webpack.config.js (for webpack 4)
module.exports = {
  optimization: {
    runtimeChunk: true,
  },
};
```
webpack有一个vendor.\[hash\].js管理chunk和文件的对应关系，如果不蛇者runtimeChunk的话，每一个模块变动都会使vendor这文件改变，设置这个就是为了缓存此文件，单独打包。
https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching
https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
### sourceMap
我们在项目进行打包后，会将开发中的多个文件代码打包到一个文件中，并且经过压缩，去掉多余的空格，且babel编译化后，最终会用于线上环境，那么这样处理后的代码和源代码会有很大的差别，当有bug的时候，我们只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，对于开发不好调式，因此sourceMap出现了，它就是为了解决不好调式代码问题的。
有7种模式比较复杂，总结前人的使用经验：
```js
// dev
module.exports = {
  devtool: 'cheap-module-eval-source-map'
}
```
```js
// prod
module.exports = { 
  devtool: 'cheap-module-source-map';
}
```
### tree-shaking原理

### dns查询过程
dns 是domain name system是分布式系统，以UDP报文进行通信（为了减少开销）。查询过程是采用递归查询，主机先向本地域名服务器例如(google的8.8.8.8)查询，下一步是根域名服务器，一般根域名服务器会告诉本地域名服务器下一步要查询的顶级域名系统。
顶级域名系统告诉本地域名系统下一步要查询的权限域名系统。权限域名系统告诉告诉本地域名要查询的IP地址。最后本地域名系统告诉主机IP地址。为了提高DNS查询效率，域名服务器广泛采用了高速缓存。
https://howdns.works/