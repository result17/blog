### 检查 HSTS 列表
浏览器检查自带的“预加载 HSTS（HTTP严格传输安全）”列表，这个列表里包含了那些请求浏览器只使用HTTPS进行连接的网站
如果网站在这个列表里，浏览器会使用 HTTPS 而不是 HTTP 协议，否则，最初的请求会使用HTTP协议发送
注意，一个网站哪怕不在 HSTS 列表里，也可以要求浏览器对自己使用 HSTS 政策进行访问。浏览器向网站发出第一个 HTTP 请求之后，网站会返回浏览器一个响应，请求浏览器只使用 HTTPS 发送请求。然而，就是这第一个 HTTP 请求，却可能会使用户受到 downgrade attack 的威胁，这也是为什么现代浏览器都预置了 HSTS 列表。

### 使用套接字
当浏览器得到了目标服务器的 IP 地址，以及 URL 中给出来端口号（http 协议默认端口号是 80， https 默认端口号是 443），它会调用系统库函数 socket ，请求一个 TCP流套接字，对应的参数是 AF_INET/AF_INET6 和 SOCK_STREAM 。
- 这个请求首先被交给传输层，在传输层请求被封装成 TCP segment。目标端口会被加入头部，源端口会在系统内核的动态端口范围内选取（Linux下是ip_local_port_range)
- TCP segment 被送往网络层，网络层会在其中再加入一个 IP 头部，里面包含了目标服务器的IP地址以及本机的IP地址，把它封装成一个IP packet。
---
服务器端接收到 SYN 包，如果它可以建立连接：
服务器端选择它自己的初始序列号
服务器端设置 SYN 位，表明自己选择了一个初始序列号
服务器端把 (客户端ISN + 1) 复制到 ACK 域，并且设置 ACK 位，表明自己接收到了客户端的第一个封包
客户端通过发送下面一个封包来确认这次连接：
自己的序列号+1
接收端 ACK+1
设置 ACK 位
数据通过下面的方式传输：
当一方发送了N个 Bytes 的数据之后，将自己的 SEQ 序列号也增加N
另一方确认接收到这个数据包（或者一系列数据包）之后，它发送一个 ACK 包，ACK 的值设置为接收到的数据包的最后一个序列号
关闭连接时：
要关闭连接的一方发送一个 FIN 包
另一方确认这个 FIN 包，并且发送自己的 FIN 包
要关闭的一方使用 ACK 包来确认接收到了 FIN

### TLS握手
- 客户端发送一个 ClientHello 消息到服务器端，消息中同时包含了它的 Transport Layer Security (TLS) 版本，可用的加密算法和压缩算法。
- 服务器端向客户端返回一个 ServerHello 消息，消息中包含了服务器端的TLS版本，服务器所选择的加密和压缩算法，以及数字证书认证机构（Certificate Authority，缩写 CA）签发的服务器公开证书，证书中包含了公钥。客户端会使用这个公钥加密接下来的握手过程，直到协商生成一个新的对称密钥
- 客户端根据自己的信任CA列表，验证服务器端的证书是否可信。如果认为可信，客户端会生成一串伪随机数，使用服务器的公钥加密它。这串随机数会被用于生成新的对称密钥
- 服务器端使用自己的私钥解密上面提到的随机数，然后使用这串随机数生成自己的对称主密钥
- 客户端发送一个 Finished 消息给服务器端，使用对称密钥加密这次通讯的一个散列值
- 服务器端生成自己的 hash 值，然后解密客户端发送来的信息，检查这两个值是否对应。如果对应，就向客户端发送一个 Finished 消息，也使用协商好的对称密钥加密
- 从现在开始，接下来整个 TLS 会话都使用对称秘钥进行加密，传输应用层（HTTP）内容

### html解析
浏览器渲染引擎从网络层取得请求的文档，一般情况下文档会分成8kB大小的分块传输。

HTML 解析器的主要工作是对 HTML 文档进行解析，生成解析树。

解析树是以 DOM 元素以及属性为节点的树。DOM是文档对象模型(Document Object Model)的缩写，它是 HTML 文档的对象表示，同时也是 HTML 元素面向外部(如Javascript)的接口。树的根部是"Document"对象。整个 DOM 和 HTML 文档几乎是一对一的关系。

#### 解析结束之后

浏览器开始加载网页的外部资源（CSS，图像，Javascript 文件等）。

此时浏览器把文档标记为可交互的（interactive），浏览器开始解析处于“推迟（deferred）”模式的脚本，也就是那些需要在文档解析完毕之后再执行的脚本。之后文档的状态会变为“完成（complete）”，浏览器会触发“加载（load）”事件。

注意解析 HTML 网页时永远不会出现“无效语法（Invalid Syntax）”错误，浏览器会修复所有错误内容，然后继续解析。

这就可以得出结论，css不会阻塞html解析但会阻塞html渲染，即延迟浏览器触发加载（load）事件。

### 页面渲染
- 通过遍历DOM节点树创建一个“Frame 树”或“渲染树”，并计算每个节点的各个CSS样式值
通过累加子节点的宽度，该节点的水平内边距(padding)、边框(border)和外边距(margin)，自底向上的计算"Frame 树"中每个节点的首选(preferred)宽度
- 通过自顶向下的给每个节点的子节点分配可行宽度，计算每个节点的实际宽度
- 通过应用文字折行、累加子节点的高度和此节点的内边距(padding)、边框(border)和外边距(margin)，自底向上的计算每个节点的高度
- 当存在元素使用 floated，位置有 absolutely 或 relatively 属性的时候，会有更多复杂的计算，详见http://dev.w3.org/csswg/css2/ 和 http://www.w3.org/Style/CSS/current-work
创建layer(层)来表示页面中的哪些部分可以成组的被绘制，而不用被重新栅格化处理。每个帧对象都被分配给一个层
- 页面上的每个层都被分配了纹理(?)
- 每个层的帧对象都会被遍历，计算机执行绘图命令绘制各个层，此过程可能由CPU执行栅格化处理，或者直接通过D2D/SkiaGL在GPU上绘制
- 上面所有步骤都可能利用到最近一次页面渲染时计算出来的各个值，这样可以减少不少计算量
- 计算出各个层的最终位置，一组命令由 Direct3D/OpenGL发出，GPU命令缓冲区清空，命令传至GPU并异步渲染，帧被送到Window Server。

### GPU渲染
- 在渲染过程中，图形处理层可能使用通用用途的 CPU，也可能使用图形处理器 GPU
- 当使用 GPU 用于图形渲染时，图形驱动软件会把任务分成多个部分，这样可以充分利用 GPU 强大的并行计算能力，用于在渲染过程中进行大量的浮点计算。

### Source Map
这就是 Source Map。它是一个独立的 map（其实就是 JSON） 文件，通常与源码在同一个目录下。

Source Map 常用于以下几个场景：

压缩代码，减小体积。比如 jQuery 1.9 的源码，压缩前是 252KB，压缩后是 32KB。
多个文件合并，减少 HTTP 请求数，仅用于前端。
将其他语言编译成 JavaScript，例如：CoffeeScript、TypeScript 等。

### 闭包作用域
同一个函数内部的闭包作用域只有一个，所有闭包共享。在执行函数的时候，如果遇到闭包，则会创建闭包作用域的内存空间，将该闭包所用到的局部变量添加进去，然后再遇到闭包时，会在之前创建好的作用域空间添加此闭包会用到而前闭包没用到的变量。函数结束时，会清除没有被闭包作用域引用的变量。

### 闭包造成内存泄漏原因
```js
const heapdump = require('heapdump')
let leakObject = null
let count = 0

setInterval(function testMemoryLeak() {
  const originLeakObject = leakObject
  const unused = function () {
    if (originLeakObject) {
      console.log('originLeakObject')
    }
  }
  leakObject = {
    count: String(count++),
    leakStr: new Array(1e7).join('*'),
    leakMethod: function () {
      console.log('leakMessage')
    }
  }
}, 1000)
```
这段代码内存泄露原因是：在 testMemoryLeak 函数内有两个闭包：unused 和 leakMethod。unused 这个闭包引用了父作用域中的 originLeakObject 变量，如果没有后面的 leakMethod，则会在函数结束后被清除，闭包作用域也跟着被清除了。因为后面的 leakObject 是全局变量，即 leakMethod 是全局变量，它引用的闭包作用域（包含了 unused 所引用的 originLeakObject）不会释放。而随着 testMemoryLeak 不断的调用，originLeakObject 指向前一次的 leakObject，下次的 leakObject.leakMethod 又会引用之前的 originLeakObject，从而形成一个闭包引用链，而 leakStr 是一个大字符串，得不到释放，从而造成了内存泄漏。

解决方法：在 testMemoryLeak 函数内部的最后添加 originLeakObject = null 即可。

### 简单throttle
```js
export function throttle(fm, deplay) {
  let timerId = null
  return function(...args) {
    const context = this
    let result = null
    if (!timeId) {
      timerId = setTimeout(() => {
        result = fn.apply(context, args)
        clearTimeout(timerId)
        timerId = null
      }, deplay)
    }
    return result
  }
}
```

### 简单debounce
```js
function debounce(fn, deplay, immediate) {
  let timerId = null, result
  return function(...args) {
    const context = this
    if (timerId) clearTimeout(timerId)

    if (immdiate && !timer) {
      result = fn.apply(context, args)
    }

    timerId = setTimeout(() => {
      result = fn.apply(context, args)
    }, deplay)
    return result
  }
}
```

### 事件委托
开胃菜
```js
// 添加一段脚本，使得点击li是alert对应的序列号，比如点击艾斯德斯，alert出序列号为3
<ul>
	<li>哈哈哈</li>
	<li>呵呵呵</li>
	<li>艾斯德斯</li>
</ul>
```
```js
const list = Array.from(document.querySelectorAll('li')
document.querySelector('ul').addEventListener('click', e => {
  alert(list.indexOf(e.target) + 1)
})
```
听坑人的，不用去想BOM还有什么API，NodeList在chrome比较新的版本（大概是6以后吧），只继承了enties和forEach，其他的没有。
```js
document.createEvent('keyEvents')
```
### 让人讨厌的var
```js
if ('a' in window) {
	var a = 10
}
console.log(a) // 输出啥
```
变量提升在语句执行前，所以'a' in window总会等于true
```js
console.log(a) // 输出啥
var a = 2
function a() {}
console.log(a) // 输出啥	
// 此题在考变量提升与函数声明提升的顺序
```
函数提升优先于变量提升

### 如何区分客户端所在环境是浏览器还是node？
```js
try {
  !!global && console.log('node')
} catch(e) {
  console.log('browser')
}
```

### 异步加载
js async defened
还有动态插入script标签
import()
