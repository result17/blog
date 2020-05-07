### Cache-Control
 Cache-Control 通用消息头字段，被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。
 - public 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
 - private 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。
 - no-cache 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
 - no-store 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
 - max-age= (seconds)
设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。设置max-age后Expires失效。
- must-revalidate
一旦资源过期（比如已经超过max-age），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。
- only-if-cached
表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝。

重新验证
指定 no-cache 或 max-age=0 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。这意味着每次都会发起 HTTP 请求，但当缓存内容仍有效时可以跳过 HTTP 响应体的下载。
```js
Cache-Control: no=cache
Cache-Control: max-age=0
```

### FP中的map, filter
```js
Array.prototype.map = function(callback) {
  var result = []; 
  
  this.forEach(function(element, index) {
	  result.push(callback(element, index));
  })
  
  return result;
}
```
```js
Array.prototype.filter = function(callback) {
	var result = [];
	this.forEach((item, index) => {
		if(callback(item, index))
			result.push(item);
	});
	return result;
}
```

### 简单的观察者模式
```js
class Producer {
	constructor() {
		this.listeners = [];
	}
	addListener(listener) {
		if(typeof listener === 'function') {
			this.listeners.push(listener)
		} else {
			throw new Error('listener 必須是 function')
		}
	}
	removeListener(listener) {
		this.listeners.splice(this.listeners.indexOf(listener), 1)
	}
	notify(message) {
		this.listeners.forEach(listener => {
			listener(message);
		})
	}
}
```

### 常见的 TCP 拥塞控制算法
- Reno 被许多教材（例如：《计算机网络——自顶向下的方法》）所介绍，适用于低延时、低带宽的网络，它将拥塞控制的过程分为四个阶段：慢启动、拥塞避免、快重传和快恢复，对应的状态如下所示：
- BBR  BBR 算法不将出现丢包或时延增加作为拥塞的信号，而是认为当网络上的数据包总量大于瓶颈链路带宽和时延的乘积时才出现了拥塞，所以 BBR 也称为基于拥塞的拥塞控制算法

https://zhuanlan.zhihu.com/p/76023663

### 解决ajax请求被缓存的方法
- 在服务端加 header(“Cache-Control: no-cache, must-revalidate”);
- 在 Ajax 的 URL 参数后加上 “?fresh=” + Math.random()

### useContext的第二个参数
通过特定的位运算，可以避免子组件重复渲染。
https://zhuanlan.zhihu.com/p/51073183

### 获得滚动距离
document.body.scrollTop在chrome存在兼容问题，可以使用
```js
window.pageYOffset
window.scrollY
document.documentElement.scrollTop
```
### chrome是多进程结构
包含Broeser进程，第三方插件进程，还有渲染进程
https://juejin.im/post/5a6547d0f265da3e283a1df7
https://juejin.im/post/5cd9854b5188252035420a13
https://www.zhihu.com/question/368712837

### 发布订阅模式
```js
class EventEmitter {
	constructor() {
		this._events = new Map()
		this._maxEventListener = 10
	}
	addEventListener(event, fn) {
		if (this._events.get(event)) {
			this._events.get(event).push(fn)
		} else {
			this._events.set(event, [fn])
		}
	}
}
```

### object.create和new的区别
```js
class A {
  constructor() {
    this.name = 'A'
  }
  log() {
    console.log('A')
  }
}

const nA = new A()
const cA = Object.create(A)
const cA2 = Object.create(A.prototype)
```
```js
const isObject = t => typeof t === 'object' && t !== null
const isFunction = f => typeof f === 'function'
function myNew(super, args) {
	let result = Object.create(super.prototype)
	// construcror
	const returnVal = super.call(result, args)
	if (isFunction(returnVal) || isObject(returnVal)) {
		return returnVal
	}
	return result
}
```
注意构造函数super如果有显式返回值，而且函数值是函数或对象时，new会优先返回它。

### Map
对比Object
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
Map默认不包含任何键
键的类型可以是任意值
Map中的key是有序的
Map的大小可以由size属性获取
Map可以直接使用for of
性能在频繁增删键值对的场景下表现更好。

### undefined可以修改
undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。
void 0 === 0.._ === undfined

### css3动画
https://juejin.im/post/5cdd178ee51d456e811d279b#comment
```js
addEventListener("webkitAnimationEnd",  (e)=>{ });
```

### 使用MutationObserver实现microtask
MutationObserver可以用来实现microtask
（它属于microtask，优先级小于Promise，
一般是Promise不支持时才会这样做）
它是HTML5中的新特性，作用是：监听一个DOM变动，
当DOM对象树发生任何变动时，Mutation Observer会得到通知
像以前的Vue源码中就是利用它来模拟nextTick的，
具体原理是，创建一个TextNode并监听内容变化，
然后要nextTick的时候去改一下这个节点的文本内容

```js
var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(String(counter))

observer.observe(textNode, {
    characterData: true
})
timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
}

```
https://juejin.im/post/5a6547d0f265da3e283a1df7#heading-26

### getComputedStyle
getComputedStyle会获取当前元素所有最终使用的CSS属性值，window.和document.defaultView.等价...


getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息进行计算（譬如宽高等），所以用的时候慎用，回流会引起性能问题。然后合适的话会将话题引导回流，重绘，浏览器渲染原理等等。当然也可以列举一些其它会引发回流的操作，如offsetXXX，scrollXXX，clientXXX，currentStyle等等

### composite
浏览器渲染的图层一般包含两大类：普通图层以及复合图层
首先，普通文档流内可以理解为一个复合图层（这里称为默认复合层，里面不管添加多少元素，其实都是在同一个复合图层中）
其次，absolute布局（fixed也一样），虽然可以脱离普通文档流，但它仍然属于默认复合层。
然后，可以通过硬件加速的方式，声明一个新的复合图层，它会单独分配资源
（当然也会脱离普通文档流，这样一来，不管这个复合图层中怎么变化，也不会影响默认复合层里的回流重绘）
可以简单理解下：GPU中，各个复合图层是单独绘制的，所以互不影响，这也是为什么某些场景硬件加速效果一级棒
