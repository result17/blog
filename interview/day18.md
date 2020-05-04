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