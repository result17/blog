### 从chrome performer看页面解析
![img](https://github.com/result17/blog/blob/master/imgs/DCLAndL.png?raw=true)
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表。也被称作DOM.onReady

### raster 光栅化
raster操作会放在gpu进程，生成的位图放在gpu内存里。浏览器需要从gpu内存里取出位图，所以必不可少的涉及到进程通信。

### GPU
https://juejin.im/post/5e79cd65f265da5720181440#comment
此文作者讲的比较乱，更加重要的是要查看此文的参考。
Render

涉及多个线程

Compositor Thread
Main Thread
Raster Threads(Compositor Tile Workers) 这是一个线程池
GPU

有一个很特别的地方，Compositor Thread在一帧时间内可以接受多次输入，但只上报给Main Thread一次，也就是说，像mousemove这样的东西，根本不需要进行raf节流，它绝对跟raf触发时间一致

### 禁止使用内嵌CSS属性
应尽量避免在 HTML 元素（例如 p style=...）中内嵌 CSS 属性，因为这经常会导致不必要的代码重复。此外，在默认情况下，内容安全政策 (CSP) 会阻止在 HTML 元素中内嵌 CSS。

### 令人讨厌的居中
https://juejin.im/post/5bc3eb8bf265da0a8a6ad1ce

### 练习
能实现一个节流函数吗？ (很快写完了 定时器版) 面试官改进一下要求滚动第一次就触发，于是改成时间戳版。 再改进一下，最后一次的延迟也要触发
防抖一定是延迟触发函数，fn要在setTimeout里面执行
```js
function debounce(fn, deplay, immediate) {
  let timerId = null
  return function(...args) {
    const context = this
    if (timerId) {
      clearTimeout(timerId)
    } 
    if (immediate && !timerId) {
      fn.apply(context, args)
    }
    timerId = setTimeout(() => {
      fn.apply(context, args)
    }, deplay)
  }
}
```

### 洗牌算法
```js
function shuffle(ary) {
  for (let i = ary.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    [ary[i - 1], ary[j]] = [ary[j], ary[i - 1]]
  }
}
```

### common.js 和 es6 中模块引入的区别？
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJs 是单个值导出，ES6 Module可以导出多个
CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

### 了解v8引擎吗？
在执行一段代码时，JS 引擎会首先创建一个执行栈
然后JS引擎会创建一个全局执行上下文，并push到执行栈中, 这个过程JS引擎会为这段代码中所有变量分配内存并赋一个初始值（undefined），在创建完成后，JS引擎会进入执行阶段，这个过程JS引擎会逐行的执行代码，即为之前分配好内存的变量逐个赋值(真实值)。
如果这段代码中存在function的声明和调用，那么JS引擎会创建一个函数执行上下文，并push到执行栈中，其创建和执行过程跟全局执行上下文一样。但有特殊情况，即当函数中存在对其它函数的调用时，JS引擎会在父函数执行的过程中，将子函数的全局执行上下文push到执行栈，这也是为什么子函数能够访问到父函数内所声明的变量。
还有一种特殊情况是，在子函数执行的过程中，父函数已经return了，这种情况下，JS引擎会将父函数的上下文从执行栈中移除，与此同时，JS引擎会为还在执行的子函数上下文创建一个闭包，这个闭包里保存了父函数内声明的变量及其赋值，子函数仍然能够在其上下文中访问并使用这边变量/常量。当子函数执行完毕，JS引擎才会将子函数的上下文及闭包一并从执行栈中移除。
最后，JS引擎是单线程的，那么它是如何处理高并发的呢？即当代码中存在异步调用时JS是如何执行的。比如setTimeout或fetch请求都是non-blocking的，当异步调用代码触发时，JS引擎会将需要异步执行的代码移出调用栈，直到等待到返回结果，JS引擎会立即将与之对应的回调函数push进任务队列中等待被调用，当调用(执行)栈中已经没有需要被执行的代码时，JS引擎会立刻将任务队列中的回调函数逐个push进调用栈并执行。这个过程我们也称之为事件循环。

作者：冴羽
原文链接：https://juejin.im/post/5e7426d15188254967069c00

https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/?spm=ata.13261165.0.0.2d8e16798YR8lw

### 复习day01的deepClone
```js
function deepClone(target, map = new WeakMap()) {
  const typeChecker = tar => Object.prototype.toString.call(tar)
  let result = null
  const type = typeChecker(target)
  if (type === '[object Object]') {
    result = {}
  } else if (type === '[object Array]') {
    result = []
  } else {
    return target 
  }
  if (map.has(target)) {
    return map.get(target)
  }
  // 这里只保存引用，后续属性会添加进result
  map.set(target, result)
  const forEach = (ary, iteratee) => {
    const len = ary.length
    let i = -1
    while (++i < len) {
      iteratee(ary[i])
    }
    return ary
  }
  const keys = Object.keys(target)
  forEach(keys, key => {
    result[key] = deepClone(key, map)
  })
  return result
}
```
### 对象扁平化
```js
{
  "a": {
    "b": {
      "c": {
        "d": 1
      }
    }
  },
  "aa": 2,
  "c": [
    1,
    2
  ]
} =>
{ 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
```
```js
const typeChecker = tar => Object.prototype.toString.call(tar)
function objFlat(target, fix = '') {
  if (typeof target === 'object' && target !== null) {
    let result = {}
    for (const e of Object.keys(target)) {
      if (typeChecker(target[e]) === '[object Object]') {
        result = { ...objFlat(target[e], fix + e + '.'), ...result}
      } else if (typeChecker(target[e]) === '[object Array]') {
        for (const i of Object.keys(target[e])) {
          result[`${e}[${i}]`] = objFlat(target[e][i])
        }
      } else {
        // 基本类型
        result[fix + e] = target[e]
      }
    }
    return result
  }
  return target
}
```
写的太慢了，而且很丑，高手4分钟搞掂的事情，我花了10倍时间，问题出在对js众多循环不太熟悉
再写一版
```js
function objFlat(target, fix = '') {
  if (typeof target === 'object' && target !== null) {
    let result = {}
    for (const e of Object.keys(target)) {
      if (Array.isArray(target[e])) {
        target[e].reduce((acc, cur, idx) => {
          acc[`${e}[${idx}]`] = objFlat(target[e][idx])
          return acc
        }, result)
      } else if (typeof target[e] === 'object') {
        result = {...objFlat(target[e], `${fix}${e}.`), ...result}
      } else {
        // 基本类型
        result[fix + e] = target[e]
      }
    }
    return result
  }
  return target
}
```

### setTimeout执行顺序
```js
const sleep = seconds => {
  const start = Date.now()
  while(Date.now() - start < seconds * 1000) {}
}

function main() {
  setTimeout(() => {
    console.log('3 seconds task')
  }, 3000)
  sleep(2)
  setTimeout(() => {
    console.log('1 seconds task')
  }, 1000)
}
main()
```
sleep(2),sleep(4)分别是什么

### type和interface的不同点
https://juejin.im/post/5c2723635188252d1d34dc7d