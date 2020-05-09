### http2.0
多路复用（即一个tcp/ip连接可以请求多个资源）


首部压缩（http头部压缩，减少体积）


二进制分帧（在应用层跟传送层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）


服务器端推送（服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端）


请求优先级（如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求。）

### 'uncaughtException' 事件
当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件。 默认情况下，Node.js 通过将堆栈跟踪打印到 stderr 并使用退出码 1 来处理此类异常，从而覆盖任何先前设置的 process.exitCode。 为 'uncaughtException' 事件添加处理程序会覆盖此默认行为。 或者，更改 'uncaughtException' 处理程序中的 process.exitCode，这将导致进程退出并提供退出码。 否则，在存在这样的处理程序的情况下，进程将以 0 退出。

### try catch不能捕获非阻塞或者异步函数里面的异常。
```js
try {
  process.nextTick(function(){
     let x=x; //第二个x在使用前未定义，会抛出异常
  },0);
} catch (e) {
  console.log('该异常已经被捕获');
  console.log(e);
}
process.on('uncaughtException',function(err){console.log(err)})
```

### node中的domains
node中domain模块能被用来集中地处理多个异常操作，通过node的domain模块可以捕获非阻塞函数内的异常。
但现在已经被弃用

### css实现定宽高比的原理：padding的百分比是相对于其包含块的宽度，而不是高度

### css gif学习
https://juejin.im/post/5d3eca78e51d4561cb5dde12
https://juejin.im/post/5d9ec8b0518825651b1dffa3

### 讲基础库代码打包合并
为了更好利用缓存，我们一般会把不容易变化的部分单独抽取出来。例如一个 React 技术栈的项目，可能会将 React、Redux、React-Router 这类基础库单独打包出一个文件。

这样做的优点在于，由于基础库被单独打包在一起了，即使业务代码经常变动，也不会导致整个缓存失效。基础框架/库、项目中的 common、util 仍然可以利用缓存，不会每次发布新版都会让用户花费不必要的带宽重新下载基础库。

所以一种常见的策略就是将基础库这种 Cache 周期较长的内容单独打包在一起，利用缓存减少新版本发布后用户的访问速度。这种方法本质上是将缓存周期不同的内容分离了，隔离了变化。

webpack 在 v3.x 以及之前，可以通过 CommonChunkPlugin 来分离一些公共库。而升级到 v4.x 之后有了一个新的配置项 optimization.splitChunks:
```js
// webpack.config.js
module.exports = {
    //...
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            cacheGroups: {
                commons: {
                    minChunks: 1,
                    automaticNamePrefix: 'commons',
                    test: /[\\/]node_modules[\\/]react|redux|react-redux/,
                    chunks: 'all'
                }
            }
        }
    }
}
```
### 输出两个数组不同的部分
```js
[1, 2, 3, 5, 4], [2, 4, 7] => [1, 3, 5, 7]
```
```js
function diff(a, b) {
  if (!a.length) return b.slice()
  if (!b.length) return a.slice()
  let r =  []
  // 改进，sort + 二分查找
  a.reduce((acc, cur) => {
    if (b.indexOf(cur) === -1) {
      acc.push(cur)
    }
    return acc
  }, r)
  b.reduce((acc, cur) => {
    if (a.indexOf(cur) === -1) {
      acc.push(cur)
    }
    return acc
  }, r)
  return r
}
diff([1, 2, 3, 5, 4], [2, 4, 7])
```

### 跨标签通信
- localstorage
- sharedWorker
```js
// sharedWorker所要用到的js文件，不必打包到项目中，直接放到服务器即可
let data = ''
onconnect = function (e) {
  let port = e.ports[0]

  port.onmessage = function (e) {
    if (e.data === 'get') {
      port.postMessage(data)
    } else {
      data = e.data
    }
  }
}

```

### 绝对定位
绝对定位中子元素相对于父元素左上角的padding

### keep-alive
https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8Akeep-alive%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%85%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.MarkDown
```js
render () {
    /* 得到slot插槽中的第一个组件 */
    const vnode: VNode = getFirstComponentChild(this.$slots.default)

    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
        // check pattern
        /* 获取组件名称，优先获取组件的name字段，否则是组件的tag */
        const name: ?string = getComponentName(componentOptions)
        /* name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） */
        if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
        )) {
            return vnode
        }
        const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
        /* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */
        if (this.cache[key]) {
            vnode.componentInstance = this.cache[key].componentInstance
        } else {
            this.cache[key] = vnode
        }
        /* keepAlive标记位 */
        vnode.data.keepAlive = true
    }
    return vnode
}
```
### react fiber
Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。

### MutationObserver
监视dom元素的变化触发回调, 可监视的变化有:属性(attribute) / 文本(characterData), 同时支持监视子孙节点(childList/subtree)

### Node.contains
Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

### js最新类型
Six Data Types that are primitives, checked by typeof operator:
undefined : typeof instance === "undefined"
Boolean : typeof instance === "boolean"
Number : typeof instance === "number"
String : typeof instance === "string"
BigInt : typeof instance === "bigint"
Symbol : typeof instance === "symbol"
null : typeof instance === "object". Special primitive type having additional usage for it's value: if object is not inherited null is shown at the end of Prototype Chain;
Object : typeof instance === "object". Special non data but Structural type for any constructed instance instance also used as data structures: new Object, new Array, new Map, new Set, new WeakMap, new WeakSet, new Date and almost everything made with new keyword;
Function non data structure, though it also answers for typeof operator: typeof instance === "function". This answer is done as a special shorthand for Functions, though every Function constructor is derived from Object constructor.

### 正则去除相邻字母
```js
'aaabbbcdfgghhjjkkk'.replace(/([A-Za-z]{1})(\1)+/g, '$1');
```

### Symbol.hasInstance
Symbol.hasInstance用于判断某对象是否为某构造器的实例。因此你可以用它自定义 instanceof 操作符在某个类上的行为。

### forEach中return有效果吗？如何中断forEach循环？
在forEach中用return不会返回，函数会继续执行。
- 使用try监视代码块，在需要中断的地方抛出异常。
- 用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环

### myRevrse
```js
const myReverse = arr => {
  let left = 0, right = arr.length - 1
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]
    left++
    right--
  }
  return arr
}
```