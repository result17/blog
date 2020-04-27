### 三栏布局

圣杯布局：container（父容器）padding: 0 200px;
left ,right => postion: relative;
left => marigin-left: -100%
right => margin-left: -200px;

双飞翼布局：html反直觉 .middle-container {
  marigin: 0 200px;
}

left => marigin-left: -100%
right => margin-left: -200px;

### @-css属性
@import @keyframe @media

### 解决外边距
不发生折叠的触发因素是浮动元素、inline-block 元素、绝对定位元素

### event loops
window event loop（通常我们讲的都是这个）
worker event loop（每个 worker 线程都有个与之关联的 event loop）
worklet event loop（woklet 是可以访问渲染引擎的线程，我们一般用不到）

### destructuringArray
```js
// ( [1,[2,4],3], "[a,[b],c]" );
// result
// { a:1, b:2, c:3 }
```
```javascript
const destructuringArray = (ary, shape) => {
  let shapeAry
  try {
    shapeAry = JSON.parse(shape.replace(/\w+/g, '"$&"'))
  } catch(e) {
    throw new Error('shape error')
    return 
  }
  const helper = (raw, shapeAry) => {
    let result = {}
    shapeAry.forEach((item, idx) => {
      if (Array.isArray(item)) {
        result = {...helper(raw[idx], item), ...result}
      } else {
        result[item] = raw[idx]
      }
    })
    return result
  }
  return helper(ary, shapeAry)
}
```
重点就是keys.replace(/\w+/g, '"$&"'), JSON.parse()里面的key需要双引号

### Object.create()
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。相当于
```js
SubType.prototype = new SuperType()
```
有两个参数
proto
新创建对象的原型对象。
propertiesObject
可选。如果没有指定为 undefined，则是要添加到新创建对象的不可枚举（默认）属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
```js
// mdn示范的经典寄生组合继承
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
```
```js
// mdn示范的多继承
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```

### 设计模式

https://zhuanlan.zhihu.com/p/43283016

### nodejs线程
在 Node.js 中，有两种类型的线程：一个事件循环线程（也被称为主循环，主线程，事件线程等）。另外一个是在工作线程池里的 k 个工作线程（也被称为线程池）。

Node.js 使用谷歌的 V8 引擎处理 JavaScript，对于大部分操作确实很快。 但有个例外是正则表达式以及 JSON 的处理，下面会讨论。

### cluster
http://www.alloyteam.com/2015/08/nodejs-cluster-tutorial/
方案一：1 个 Node 实例开启多个端口，通过反向代理服务器向各端口服务进行转发
方案二：1 个 Node 实例开启多个进程监听同一个端口，通过负载均衡技术分配请求（Master->Worker）

每个 worker 进程通过使用 child_process.fork() 函数，基于 IPC（Inter-Process Communication，进程间通信），实现与 master 进程间通信

### js阻塞css和dom的渲染根本原因
浏览器是多进程程序，其执行js进程跟GUI渲染进程互斥 

### react生命周期
挂载阶段
constructor
getDerivedStateFromProps
render
componentDidMount

更新阶段
getDerivedStateFromProps
shouldComponentUpdate(nextProps, nextState): boolean
render
getSnapshotBeforeUpdate
componentDidUpdate

卸载阶段
componentWillUnmount

### react请求放在哪一个生命周期
React的异步请求到底应该放在哪个生命周期里,有人认为在componentWillMount中可以提前进行异步请求,避免白屏,其实这个观点是有问题的.
由于JavaScript中异步事件的性质，当您启动API调用时，浏览器会在此期间返回执行其他工作。当React渲染一个组件时，它不会等待componentWillMount它完成任何事情 - React继续前进并继续render,没有办法“暂停”渲染以等待数据到达。
而且在componentWillMount请求会有一系列潜在的问题,首先,在服务器渲染时,如果在 componentWillMount 里获取数据，fetch data会执行两次，一次在服务端一次在客户端，这造成了多余的请求,其次,在React 16进行React Fiber重写后,componentWillMount可能在一次渲染中多次调用.
目前官方推荐的异步请求是在componentDidmount中进行.

链接：https://juejin.im/post/5d5f44dae51d4561df7805b4

### get和post的区别
语义get获取资源，post提交
从缓存的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
从编码的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
从参数的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
从幂等性的角度，GET是幂等的，而POST不是。(幂等表示执行相同的操作，结果也是相同的)
（最后一个，我不同意，这可能取决于具体实现不同，RFC并没有规定）

链接：https://juejin.im/post/5e76bd516fb9a07cce750746

### 两个display inline-block元素会出现空白
html中一个隐藏的br元素
通常fontSize: 0
html两个元素不换行

```js
class A {
  constructor() {
    
  }
}
```

### es5