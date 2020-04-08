## 五层计算机网络模型，每层的重要协议有哪些？tcp握手和挥手原理？
- 五层从低到高分别为物理层，链路层，网络层，传输层以及应用层。
- 物理层是将物理信号转化为逻辑意义上的0和1的比特流。
- 链路层是使用点对点信道和广播信道，意义是物理层上的比特流在传输介质上存在误差，而链路层通过差错检测，透明传输和封装成帧等方法，向网络层提供高质量的数据传输服务。同时，应当指出链路层也存在滑动窗口机制。
- 网络层向上只提供简单灵活的，无连接的，尽最大努力交付的数据报服务。最重要的协议是IP协议（网际协议）。跟IP协议搭配使用的是ARP协议（地址解析协议）。
IP协议的而作用是将性能各异的网络在网络层上看起来像是一个统一的网络。
ARP协议解决的是知道一个机器的IP地址，需要指出其相应的硬件地址。
IP协议分为IPv4和IPv6。现在IPv4地址已经耗尽，解决此问题是使用IPv6协议，其地址空间扩大了2 ** 96倍。
强调的是在IP层抽象的互联网只能看到IP数据报。在局域网的链路层，只能看见MAC帧。

- 传输层协议主要是为不同主机上的不同进程间提供了逻辑通信的功能。运输层的两个重要协议是UDP和TCP协议。
分用：运输层从IP层收到发送给各应用进程的数据，必须分别交付指明的应用进程称。
复用：应用层的所有应用进程都可以通过运输层再传送到IP层。
服务器使用端口号：常用的是http80，https443，dns53，ftp21。
登记端口号：没有熟知端口号的应用程序使用，数值为1024-65535。
UDP协议：是无连接，尽最大努力交付，面向报文，没有拥塞控制机制（允许丢失一部分数据，但不允许有太大的时延）的协议。
TCP协议：是面向连接的传输层协议，每一条TCP协议连接的是点对点，TCP提供的是可靠交付的服务，提供全双工通信，面向字节流。
TCP的端点称为socket，socket = IP地址 + 端口号。
TCP可靠传输的实现是滑动窗口机制。
TCP的拥塞控制方法是慢开始，拥塞避免，快重传和快恢复。

- TCP握手
假设有用户A和服务器B，A主动打开连接，而B被动打开连接。
开始时B的TCP服务器进程先创建传输控制块TCB，接受客户进程连接请求，处于LISTEN状态。

1. A的TCP客户进程也创建传输控制块TCB，握手时向B发出连接请求报文段，此时首部的同步位SYN = 1，假设一个初始序号seq = x。TCP客户进程进入SYN-SENT状态。
2. 服务器B收到连续请求报文段后，如果同意连接，则向A发送确认报文。将SYN和ACK位都置1。确认号是ack = x + 1, 同时也为自己选择一个初始序号seq = y.
3. A还应最后确认。将确认报文的ACK置1。确认号ack = y + 1，自己的序号则是seq = x + 1。A进入ESTABLISHED状态。当B收到最后确认后，也进入ESTABLISHED状态。
### 为什么还要发送最后一次确认？
主要是为了防止已经失效的连接请求报文段突然又传回到B，因而产生错误。

- TCP挥手<br/>
通信双方都可以进行挥手，而且双方都处于ESTABLISHED状态。假设A进行挥手：
1. A发送连接释放报文，并停止发送数据。将FIN置1，其序号seq = u。其A进入FIN-WAIT-1状态。
2. B发出确认，ACK置为1，确认号是ack = u + 1，然后选择报文段序号为v，B进入CLOSE-WAIT状态。A收到B的确认后进入FIN-WAIT-2状态。
3. B如果没有向A发送数据，则会发送连接释放报文将FIN = 1， ACK = 1。ack = u + 1。序号为w（可能还有数据，所有w不一定等于v）。B进入CLOSED状态。
4. A收到B报文后将ACK置1，ack = w + 1。seq = u + 1，进入到TIME-WAIT时间等待状态。等待2MSL（最长报文段寿命，现在有建议设置为2分钟）后，A进入CLOSED状态。
### 为什么还要等待2MSL？
是为了确保A最后的ACK报文，能后到达B。

## JS的深浅拷贝的区别是什么？请实现一个解决循环引用的深拷贝代码？
浅拷贝：一次遍历对象属性将其依次复制。如果属性是基本类型，则拷贝的是值。如果属性是引用类型，拷贝的是内存地址。
深拷贝：递归遍历对象的所有属性(基本类型和引用类型)。
https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/
```js
// 最简单的实现
const deepClone = obj => JSON.parse(JSON.stringify(obj))
```
问题在于此实现没有解决循环引用问题，而且JSON.parse为了保护JS原型对象对于'__proto__'是不转换的
贴出一个我曾经写的答案
```js
function deepClone(target, map = new WeakMap()) {
  let typeCheck = (tar) => Object.prototype.toString.call(tar), res
  if (typeCheck(target) === '[object Object]') {
    res = {}
  } else if (typeCheck(target) === '[object Array]') {
    res = []
  } else {
    // 引用类型只考虑数组和对象，其他如函数暂不考虑
    return target
  }
  // 使用while性能更好
  let forEach = function (array, iteratee) {
    let index = -1
    const length = array.length
    while (++index < length) {
      iteratee(array[index])
    }
    return array
  }

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, res)
  // Object.keys同样可以作用于数组
  const keys = Object.keys(target)
  forEach(keys, (key) => {
    res[key] = deepClone(target[key], map)
  })
  return res
}
```
## CSRF是什么？有什么危害？原理是什么？如何防止CSRF?
CSRF是 CROSS-SITE REQUEST FORGERY，中文是跨域请求伪造。
跨域：只要协议、域名、端口有任何一个不同，都被当作是不同的域。
危害是：第三方网站可以冒充用户进行操作。
原理是：通过浏览器会自动携带cookie。第三方网站伪造用户去请求（请求自动携带cookie）被攻击网站，被攻击网站误以为第三方网站为用户，从而进行攻击。
防止CSRF有多种手段：
1. 首先肯定不能在cookies中储存用户明文额密码。
2. 在chrome51版本后，可以在响应头中设置
```js
Set-Cookie: __Host-session=123; path=/; Secure; HttpOnly; SameSite=Lax
```
只有在同域网站上才携带，并且还可以设置在安全的HTTP方法时才能携带cookie。
3. 将cookie设置成httponly，不允许JS直接取得cookie或者修改。
4. 设置一定时限的token，token是服务器根据用户首次请求携带的信息及其服务器的密钥进行数字签名生成的，之后服务器保存一份，不再通过set-cookie进行保存，而是插值到html文档中。
5. 后端服务器判断refence。


### 什么是点击劫持，如何防范?
点击劫持：
允许恶意网站以用户的名义点击“受害站点”。通常恶意网页在受害者网站链接中贴下一个透明的iframe。
防范：
服务端 header 字段 X-Frame-Options 能够允许或禁止 iframe 内页面的显示。

### 如何打乱数组？
```js
export function shuffle(items) {
  items = [...items]
  for (let i = items.length; i > 0; i--) {
    let idx = Math.floor(Math.random() * i)
    [items[idx], items[i - 1]] = [items[i - 1], items[idx]]
  }
  return items
}
```
典型错误)后没有引号再起一个语句
 ### 113 pathSum
 ```js
 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return []
  let res = [], list = []
  function travser(root, n, res, list) {
    if (!root.left && !root.right && root.val === n) {
      list.push(n)
      res.push(list)
    }
    if (root.left) {
      list.push(root.val)
      travser(root.left, n - root.val, res, list)
    }
    if (root.right) {
      list.push(root.val)
      travser(root.right, n - root.val, res, list)
    }
  }
  travser(root, sum, res, list)
  return res
};
 ```
 上面是我常犯的错误，list如果push进入会修改原来的list，导致下一次调用travser，list会重复。

 ```js
  /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return []
  let res = [], list = []
  function travser(root, n, res, list) {
    if (!root.left && !root.right && root.val === n) {
      list.push(n)
      res.push(list)
    }
    if (root.left) {
      list.push(root.val)
      travser(root.left, n - root.val, res, list.concat(root.val))
    }
    if (root.right) {
      list.push(root.val)
      travser(root.right, n - root.val, res, list.concat(root.val))
    }
  }
  travser(root, sum, res, list)
  return
```
```js
 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return []
  let res = [], list = []
  function travser(root, n, res, list) {
    list.push(root.val)
    n -= root.val
    if (!root.left && !root.right && n === 0) {
      res.push(list.slice())
    }
    if (root.left) {
      travser(root.left, n, res, list)
    }
    if (root.right) {
      travser(root.right, n, res, list)
    }
    list.pop()
  }
  travser(root, sum, res, list)
  return
```