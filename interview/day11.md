### v8 hidden class

https://engineering.linecorp.com/en/blog/v8-hidden-class/

### v8运行时(JIT)编译器

http://xunli.xyz/2017/05/13/the-story-behind-v8/
“完全”编译器（unoptimized）。一开始，所有的V8代码都运行在unoptimized状态。它的好处是编译速度非常快，它使代码初次执行速度非常快。
“优化”编译器（optimized）。当V8发现某段代码执行非常频繁时，它会根据通常的执行路径进行代码优化，生成optimized代码。优化代码的执行速度非常快。 编译器有可能从“优化”状态退回到“完全”状态， 这就是deoptimized。这是很不幸的过程，优化后的代码没法正确执行，不得不退回到unoptimized版本。

### 对象中的属性Property 与 Element
```js
var a = { 1: "a", 2: "b", "first": 1, 3: "c", "second": 2 }

var b = { "second": 2, 1: "a", 3: "c", 2: "b", "first": 1 }

console.log(a) 
// { 1: "a", 2: "b", 3: "c", first: 1, second: 2 }

console.log(b)
// { 1: "a", 2: "b", 3: "c", second: 2, first: 1 }
```

a 和 b 的区别在于 a 以一个可索引属性开头，b 以一个命名属性开头。在 a 中，可索引属性升序排列，命名属性先有 first 后有 second。在 b 中，可索引属性乱序排列，命名属性先有 second 后有 first。
可以看到

索引的属性按照索引值大小升序排列，而命名属性根据创建的顺序升序排列。
在同时使用可索引属性和命名属性的情况下，控制台打印的结果中，两种不同属性之间存在的明显分隔。
无论是可索引属性还是命名属性先声明，在控制台中总是以相同的顺序出现（在我的浏览器中，可索引属性总是先出现）。

https://juejin.im/post/5cc7dc5af265da038d0b514d

### 快速幂运算在动态规划中的应用

需要线性代数的矩阵知识
https://mp.weixin.qq.com/s/rK0rcLJdbjwmRi5KG39-JQ

### v8属性不同存储方式
对象内属性（in-object）、快属性（fast）和慢属性（slow）。

### v8内存监控
–trace-opt, –trace-deopt， –prof命令选项，及mac-tick-processor等工具。 值得注意的是node.js里直接使用mac-tick-processor或linux-tick-processor是解不出javascript段执行结果的，可以使用node-tick-processor这个工具

### timer内存泄漏
```js
var myObj = {
    callMeMaybe: function () {
        var myRef = this;
        var val = setTimeout(function () { 
            console.log('Time is running out!'); 
            myRef.callMeMaybe();
        }, 1000);
    }
};
```

### 动态规划-挖金矿
https://juejin.im/post/5a29d52cf265da43333e4da7#comment

### cuda入门教程
深度学习相关
https://zhuanlan.zhihu.com/p/34587739

### v8 decelopers
https://stackoverflow.com/users/6036428/jmrk
https://stackoverflow.com/users/96656/mathias-bynens

### 反转字符串的大坑
http://stlighter.github.io/2018/05/04/JavaScript%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8F%8D%E8%BD%AC/
https://github.com/mathiasbynens/esrever
ES6对字符串添加了迭代器, 并且这个迭代器可以识别四字节字符. 可以用...将字符串切成数组, 这样可以保证四字节字符不会被分成两个。

### v8 inline cache
https://medium.com/@yashschandra/hidden-v8-optimizations-hidden-classes-and-inline-caching-736a09c2e9eb

### v8 GC
v8的垃圾回收主要有三个阶段：标记，清除和整理
v8的垃圾回收基于世代假说
https://github.com/ThornWu/blog/issues/5
新生代内部进一步细分为 Nursery 和 Intermediate 子世代（划分只是逻辑上的）。新生对象会被分配到新生代的 Nursery 子世代。若对象在第一次垃圾回收中存活，它的标志位将发生改变，进入逻辑上的 Intermediate 子世代，在物理存储上仍存在于新生代中。如果对象在下一次垃圾回收中再次存活，就会进入老生代。对象从新生代进入到老生代的过程叫做晋升（promotion）。
新生代：parallel scavenge算法
老生代：标记清除，标记整理算法

### 默认iterator接口
ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”

Symbol.iterator是一个函数

原生具备 Iterator 接口的数据结构如下。

Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象

### commonjs 和 es6差异
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```
这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

### ordinary or exotic
ECMAScript objects can be either ordinary or exotic. 
The most well-known exotic object is the Array, since its length property behaves in a non-default way: setting the length property can remove elements from the Array.

### Asynchronous stack traces: why await beats Promise#then()

https://mathiasbynens.be/
```js
const a = () => {
	b().then(() => c());
};
```

promise在v8需要保存promise的调用链。
Capturing the stack trace takes time (i.e. degrades performance); storing these stack traces requires memory.

```js
const a = async () => {
	await b();
	c();
};
```
If b throws an exception, the stack trace can be reconstructed on-demand in this manner. If c throws an exception, the stack trace can be constructed just like it would be for a synchronous function, because we’re still within a when that happens.

### a tour of v8

https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection

### react fiber思想

React Fiber 的思想和协程的概念是契合的: 🔴React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

```js
class A {
    constructor(n) {
        this.n = n
    }
    log() {
        console.log(this.n)
    }
}
```

### profiler 
Profiler API
用于测量react性能

### react 16 context

The New Context API is able to optimize your updates for a context value, in order to do this, you have to specify changedBits and observedBits.

React Fiber’s side effects also are represented by bits, which is possible to mask the effects by bitmasks (See the HostEffectMask).
```js
export const NoEffect = /*              */ 0b000000000000;
export const PerformedWork = /*         */ 0b000000000001;
// You can change the rest (and add more).
export const Placement = /*             */ 0b000000000010;
export const Update = /*                */ 0b000000000100;
export const PlacementAndUpdate = /*    */ 0b000000000110;
export const Deletion = /*              */ 0b000000001000;
export const ContentReset = /*          */ 0b000000010000;
export const Callback = /*              */ 0b000000100000;
export const DidCapture = /*            */ 0b000001000000;
export const Ref = /*                   */ 0b000010000000;
export const ErrLog = /*                */ 0b000100000000;
export const Snapshot = /*              */ 0b100000000000;
// Union of all host effects
export const HostEffectMask = /*        */ 0b100111111111;
export const Incomplete = /*            */ 0b001000000000;
export const ShouldCapture = /*         */ 0b010000000000;
```
https://medium.com/@koba04/a-secret-parts-of-react-new-context-api-e9506a4578aa

### react fiber

说到底是react的时间切片，内部确认任务的优先级，优先运作优先级高的任务，但v-dom原先的tree
不利于

### 0.1 + 0.2 !== 0.3
https://zhuanlan.zhihu.com/p/30703042

### 多维数组的循环问题
csapp的第五章外层循环