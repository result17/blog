react hooks 解决的问题
类组件的状态难复用
趋向复杂难以维护
this 指向问题

### node有顶层对象
global module require(module.require) process
https://zhuanlan.zhihu.com/p/38382637

### http的队头阻塞问题
当 http 开启长连接时，共用一个 TCP 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态，也就是著名的队头阻塞问题。

### cookie有效期
Cookie可以通过Expires和Max-Age设置

### cookie samesite
SameSite可以设置为三个值，Strict、Lax和None。
 在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求sanyuan.com网站只能在sanyuan.com域名当中请求才能携带 Cookie
 在Lax模式，就宽松一点了，但是只能在 get 方法提交表单况或者a 标签发送 get 请求的情况下可以携带 Cookie，
  在None模式下，也就是默认模式，请求会自动携带上 Cookie。

### cookie缺点
cookie体积上限4kb
性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过Domain和Path指定作用域来解决。

### 前端缓存
强缓存
协商缓存
缓存位置

http://47.98.159.95/my_blog/perform/001.html

### 缓存位置
浏览器中的缓存位置一共有四种，按优先级从高到低排列分别是：

Service Worker
Memory Cache
Disk Cache
Push Cache

### 非同源限制
不能读取和修改对方的 DOM
不读访问对方的 Cookie、IndexDB 和 LocalStorage
限制 XMLHttpRequest 请求。(后面的话题着重围绕这个)

### cors
HTTP访问控制（CORS）
跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。
比如，站点 http://domain-a.com 的某 HTML 页面通过 <img> 的 src 请求 http://domain-b.com/image.jpg。网络上的许多页面都会加载来自不同域的CSS样式表，图像和脚本等资源。
出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

  （译者注：这段描述不准确，并不一定是浏览器限制了发起跨站请求，也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。）

  
某些请求不会触发 CORS 预检请求。本文称这样的请求为“简单请求”，请注意，该术语并不属于 Fetch （其中定义了 CORS）规范。若请求满足所有下述条件，则该请求可视为“简单请求”：

### jsonp
```js
const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = '';
    for(let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
  };
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace('.', ''); 
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    }
  });
}

```
```js
jsonp({
  url: 'http://localhost:3000',
  params: { 
    a: 1,
    b: 2
  }
}).then(data => {
  // 拿到数据进行处理
  console.log(data); // 数据包
})

```
使用script标签好处是自动序列化，能够使用js函数

### http2新特性
帧、消息、流和TCP连接
有别于HTTP/1.1在连接中的明文请求，HTTP/2与SPDY一样，将一个TCP连接分为若干个流（Stream），每个流中可以传输若干消息（Message），每个消息由若干最小的二进制帧（Frame）组成。[12]这也是HTTP/1.1与HTTP/2最大的区别所在。 HTTP/2中，每个用户的操作行为被分配了一个流编号(stream ID)，这意味着用户与服务端之间创建了一个TCP通道；协议将每个请求分割为二进制的控制帧与数据帧部分，以便解析。这个举措在SPDY中的实践表明，相比HTTP/1.1，新页面加载可以加快11.81% 到 47.7%[17]

HPACK 算法
HPACK算法是新引入HTTP/2的一个算法，用于对HTTP头部做压缩。其原理在于：

客户端与服务端根据 RFC 7541 的附录A，维护一份共同的静态字典（Static Table），其中包含了常见头部名及常见头部名称与值的组合的代码；
客户端和服务端根据先入先出的原则，维护一份可动态添加内容的共同动态字典（Dynamic Table）；
客户端和服务端根据 RFC 7541 的附录B，支持基于该静态哈夫曼码表的哈夫曼编码（Huffman Coding）。
服务器推送
网站为了使请求数减少，通常采用对页面上的图片、脚本进行极简化处理。但是，这一举措十分不方便，也不高效，依然需要诸多HTTP链接来加载页面和页面资源。

HTTP/2引入了服务器推送，即服务端向客户端发送比客户端请求更多的数据。这允许服务器直接提供浏览器渲染页面所需资源，而无须浏览器在收到、解析页面后再提起一轮请求，节约了加载时间。

### node事件循环
timers：执行 setTimeout() 和 setInterval() 中到期的 callback。
I/O callbacks：上一轮循环中有少数的 I/O callback 会被延迟到这一轮的这一阶段执行。
idle, prepare：仅内部使用。
poll：最重要的阶段，执行 I/O callback，在适当的条件下 node 会阻塞在这个阶段。
check：执行 setImmediate() 的 callback。
close callbacks：执行 close 事件的 callback，例如 socket.on('close',func)。

### 如何在ES5环境下实现const
实现const的关键在于Object.defineProperty()这个API，这个API用于在一个对象上增加或修改属性。通过配置属性描述符，可以精确地控制属性行为。Object.defineProperty() 接收三个参数

### 柯里化函数
```ts
const curry = (fn: (...args: any[]) => any): function | void {
  return (..args) => {
    args.length >= length ? fn.apply(this, args) : curry(fn.bind(this, ...args))
  }
}
```
记得绑定this, function.length等于函数参数的长度

### flex布局
- flex可以给行内元素使用inline-flex
- flex-direction属性决定主轴的方向
- flex-wrap属性定义，如果一条轴线排不下，如何换行。
- flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
- justify-content属性定义了项目在主轴上的对齐方式。
- align-items属性定义项目在交叉轴上如何对齐。
- align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
以下6个属性设置在项目上(作用在子容器上)
- order  order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow  属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink  flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis  flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- flex  flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
- align-self align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，