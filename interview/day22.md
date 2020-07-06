### react diff
- tree diff
- component diff
- element diff
#### tree diff
 React 官方建议不要进行 DOM 节点跨层级的操作。
 会直接删除原先节点，再在要移动节点创建节点，较为浪费时间。
 React 通过分层求异的策略，对 tree diff 进行算法优化；
#### component diff
- 同一类型组件， 进行virtual DOM tree diff，可以通过shouldComponentUpdate()优化。
- 如果不同类型，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
#### element diff
- INSERT_MARKUP
- MOVE_EXISTING
- REMOVE_NODE
通过key搞笑对比同层次节点进行diff，作用是加快diff速度和做到节点复用。
### happypack 原理解析
- 加载基本设置。
- 线程池初始化，套用传统软件的也给主进程管理多个线程模型。为每个子进程创建rpcHandler
- 通过createThreadPool创建子进程
- 开始编译
### react.memo
原理对比组件上一次的props和此次props，如果相同则跳过render，否则render。
### 使用vuex的好处
- 状态集中管理，便于维护。
- 减少组件的耦合，提高组件的复用性，减少大量的派发。
- 便于跨组件通信。
### vuex装载原理
- 将初始化Vue根组件时传入的store设置到this对象的$store属性上，子组件从其父组件引用$store属性，层层嵌套进行设置
### vuex进行模块装载
modules属性进行模块注册，使其都成为module对象，最后options对象被构造成一个完整的组件树。ModuleCollection类还提供了modules的更替功能，详细实现可以查看源文件
### dispatch与commit设置
封装替换原型中的dispatch和commit方法，将this指向当前store对象。
### Vuex如何区分state是外部直接修改，还是通过mutation方法修改的？
Vuex中修改state的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing标志变量为true，然后才能修改state，修改完毕还需要还原_committing变量。外部修改虽然能够直接修改state，但是并没有修改_committing标志位，所以只要watch一下state，state change时判断是否_committing值为true，即可判断修改的合法性。
### 调试时的”时空穿梭”功能是如何实现的？
devtoolPlugin中提供了此功能。因为dev模式下所有的state change都会被记录下来，’时空穿梭’ 功能其实就是将当前的state替换为记录中某个时刻的state状态，利用 store.replaceState(targetState) 方法将执行this._vm.state = state 实现。
https://tech.meituan.com/2017/04/27/vuex-code-analysis.html
### HMR原理
https://juejin.im/post/5df36ffd518825124d6c1765
HMR优点在于可以保存应用状态，提高开发效率
HMR英文为hot module replacement
-  通过 websocket 建立起 浏览器端 和 服务器端 之间的通信
#### 服务端
- compiler实例：监听本地文件的变化、文件改变自动编译、编译输出
- 更改config中的entry属性：将lib/client/index.js、lib/client/hot/dev-server.js注入到打包输出的chunk文件中
- 往compiler.hooks.done钩子（webpack编译完成后触发）注册事件：里面会向客户端发射hash和ok事
- 调用webpack-dev-middleware：启动编译、设置文件为内存文件系统、里面有一个中间件负责返回编译的文件
- 创建webserver静态服务器：让浏览器可以请求编译生成的静态资源， 创建websocket服务，建立双向连接执行热更新逻辑
#### 客户端
- 创建一个 websocket客户端 连接 websocket服务端，websocket客户端监听 hash 和 ok 事件
- 主要的热更新客户端实现逻辑，浏览器会接收服务器端推送的消息，如果需要热更新，浏览器发起http请求去服务器端获取新的模块资源解析并局部刷新页面
### webpack图片压缩
使用imagemin
### tcp可靠性
https://www.zhihu.com/question/49596182
tcp看通过checksum来对内容进行校验，但对于现在的网络而言是可以通过更改内容和检验和来欺骗。TCP Option以TCP报文数据 + Pre-Shared密码做为共同输入参数，生成一个SHA Hash进行保证加密内容。
### tcp拥塞控制
慢启动 拥塞避免 快重传 和 快恢复
https://zhuanlan.zhihu.com/p/76023663
慢启动阶段思路是不要一开始就发送大量的数据，先探测一下网络的拥塞程度，也就是说由小到大逐渐增加拥塞窗口的大小，在没有出现丢包时每收到一个 ACK 就将拥塞窗口大小加一（单位是 MSS，最大单个报文段长度），每轮次发送窗口增加一倍，呈指数增长，若出现丢包，则将拥塞窗口减半，进入拥塞避免阶段；
当窗口达到慢启动阈值或出现丢包时，进入拥塞避免阶段，窗口每轮次加一，呈线性增长；当收到对一个报文的三个重复的 ACK 时，认为这个报文的下一个报文丢失了，进入快重传阶段，要求接收方在收到一个失序的报文段后就立即发出重复确认（为的是使发送方及早知道有报文段没有到达对方，可提高网络吞吐量约20%）而不要等到自己发送数据时捎带确认；
快重传完成后进入快恢复阶段，将慢启动阈值修改为当前拥塞窗口值的一半，同时拥塞窗口值等于慢启动阈值，然后进入拥塞避免阶段，重复上述过程。
### webpack原理
- 从entry使用node.readFileSync()加载代码，然后转换AST语法树
- AST语法树方便webpack使用babel转换，支持es module等等功能
- 分析收集依赖文件并依次递归解析依赖文件
- 通过loader进行加载非js文件
- 将代码分割成chunk，并统一合并到bundle
### react context原理
https://zhuanlan.zhihu.com/p/42654080
- Provider fiber节点创建时，会将所接受到value保存到context._currentValue
- consumer直接消费context._currentValue
- Consumer 的子孙节点将会在 Consumer update 时被遍历，继续向下传播 context 变更，这是为了时间分片而考虑。
-  Provider 所有匹配 Consumer 的 rerender造成性能浪费
### 前端监控思路
https://zhuanlan.zhihu.com/p/32262716
通过window.onerror采集所有未捕获异常
#### 困难
- script error
- 如果你的页面和页面中引用的 JavaScript 文件不同源（协议、域名、端口不一致），那么这些脚本抛出的错误都属于跨域错误
- 此时只能将所有脚本放在同域上。
- 第二patch原生方法捕获错误
- 通过 Patch 原生方法来尽可能的捕获到错误，这也是很多监控脚本默认提供的能力。比如说我们可以通过如下代码来 Patch 原生的 setTimeout 方法：
#### 框架的解决方法
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
### http/2.0新特性
- 多路复用
- header压缩
- 服务器主动推送
- 二进制格式传输数据
### http队头阻塞
http1.1指的是虽然允许客户端发起多个http请求（同一域同一tcp连接），但服务端是要依次进行响应的，如果上一个请求时间过长，还要等待请求处理完才开始按序返回。
### http keepalive
- 好处 减少tcp连接（握手和挥手的时间消耗）减少服务器额外负担
- 坏处 并行数量被限定在6个。
  https://juejin.im/post/5dbe8eba5188254fe019dabb、
### ETag
- 根据文件内容计算的一个标记值
- 浏览器会在下一次请求中将If-None-Match中添加此ETag
- 服务器会将此ETag跟自己计算的ETag计算比较
```
nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。
```
- 如果相同则返回304，直接使用缓存
- 不同则返回新资源
### 自定义事件
- 现在mdn推荐做法是new Event()
- 还有CustomEvent document.createEvent
- 派发事件时使用dispatch(event: EventObj)

### myNew
```js
function myNew(constructor, ...args) {
  const instance = Object.create(constructor.prototype)
  // 可能显式返回对象
  const result = constuctor.call(instance, ...args)
  return typeof result == 'object' ? result : instance
}
```
### instanceof
```js
function myInstanceOf(left, right) {
  if (left === null) return false
  if (right === null)  throw new Error ('Right side cant be null')
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeof(proto)
  }
}
```
### myObjectCreate
```js
function myObjectCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
```
### this
指向当前函数的执行环境，在函数调用时去确定
### XSS
跨站脚本攻击是指人为的通过网站漏洞使得网站将文本当作代码执行从而获取用户token或者数据的攻击方式。
- 存储型 上传恶意代码被服务器存储，使得每一个浏览网站的用户受到共攻击。
- 反射型 攻击者在url构造恶心代码，服务器将恶意代码当作参数，发送给用户，浏览器解析html时执行恶意代码
- Dom型 攻击者将恶意代码放在url上，使得用户点击链接请求此url时执行恶意代码
方法方法：
- 尽量使用框架和模板，这些模板和模块都进行过转义，较安全
- 前后端进行文本转义
- 尽量不是innerHTML使用textContent代替
- 使用httpOnly和security保护cookie
### commonjs和es6模块区别
- commonjs引入的是值拷贝，es6引入的是值引用，模块内部的改变会引起被引用值的改变。
- commonjs支持判断，动态引入，而es6是编译时，不支持分支判断动态引入。
- arguments、require、module、exports、__filename、__dirname
- CommonJS模块是运行时加载，ES6 Modules是编译时输出接口
### webpack三种hash
https://juejin.im/post/5d70aee4f265da03f12e7ab2
- hash 是对整个项目而言只要文件一改hash值就会改变 全部文件都共用相同的hash值
- chunkhash 只有重新构建整个chunk，chunkhash才会改变
- contenthash 跟每个文件有关
### webpack处理图片的两个loader
- file-loader 处理图片加载路径
- url-loader 处理图片大小，可以开启图片base64化
### 回流和重绘
- 一个dom元素几何属性，改变就会引起后续布局进行回流，特别在长列表中注意竖直方向布局的回流。
- 一个dom元素除了几何属性的样式改变会引起重绘。
### flex布局的兼容性
- ie6-9不支持，ie9-11支持-ms-前缀支持
### 协商缓存
- last-Modefied配合If-Modified-Since
- ETag配合If-None-Match
### 跨域限制
Cookie、LocalStorage 和 IndexDB 无法读取
DOM 无法获得
ajax请求无法返回（被浏览器劫持）
### to read
https://developer.aliyun.com/article/592876
https://developer.aliyun.com/article/592878
https://v8.dev/blog/high-performance-cpp-gc
https://v8.dev/blog/concurrent-marking
https://segmentfault.com/a/1190000004556040
https://zhuanlan.zhihu.com/p/26027085
https://zhuanlan.zhihu.com/p/47407398
### tree-shaking
es6 module特点
- 只能作为模块顶层语句出现
- import的模块名只能是字符串常量
- import binding是immutable的

所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

这是 ES6 modules 在设计时的一个重要考量，也是为什么没有直接采用 CommonJS，正是基于这个基础上，才使得 tree-shaking 成为可能，这也是为什么 rollup 和 webpack 2 都要用 ES6 module syntax 才能 tree-shaking。