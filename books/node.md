# 第一章
## node选择js原因
Ryan Dahl是一名资深的c/c++程序员，想实现一个基于事件驱动，非阻塞I/O的web服务器。因为js在浏览器中有广泛的事件驱动方面应用和V8优秀的性能。
## node是js的runtime
node将js从浏览器解放出来，支持多进程，与操作系统直接交互，提供高性能异步web服务器。
## node特点异步I/O
在Node中，我们可以从语言层面很自然地进行并行I/O操作。每个调用之间无须等待之前的I/O调用结束。在编程模型上可以极大提高效率。
## node特点事件与回调函数
事件的编程方式具有轻量级，松耦合，只关心事务点灯优势，但是在多个异步任务的场景下， 事件与事件之间各自独立，如何协作是一个问题。
## node特点单线程
node保持了js在浏览器中单线程的特点。在node中，js与其余线程是无法共享任何状态。单线程的嘴大好处是不用像多线程编程那样处处在意状态的同步问题，没有死锁，也没有线程上下文交换所带来的性能上的开销。
但是单线程存在弱点：
- 无法利用多核CPU
- 错误会引起整个应用退出，应用的健壮性值得考虑。
- 大量计算占用COU导致无法继续调用异步I/O。（我的数据库处理）。
node采用了与web workers相同的思路来解决单线程在健壮性和无法利用多核CPU方面的问题。
## node特点跨平台
起初，node只可以在linux平台运行，windows使用node要通过MinGW。后来，微软投入一个团队帮助node实现windows平台兼容。node与操作系统之间构建了libuv层，实现跨平台。
## node应用场景I/O密集型
node面向网络且擅长并行I/O，能够有效地组织更多的硬件资源，从而提供更多好的服务。
I/O密集的优势是主要是node利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用极小。
## node应用场景不太胜任CPU密集型应用
由于JS单线程的原因，如果有长时间运行的计算（大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起。
但是适当调整和分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起，这样既可同时享受到异步I/O的好处，又能充分利用CPU。
node的两个方法充分利用CPU
- node可以编写C/C++扩展方法更高效地利用CPU。
- 通过子进程的方式，将一部分Node进程当作常驻服务进程用域计算，然后利用进程间的消息来传递结果，将计算与I/O分离，还能充分利用多CPU。
## node作为后端服务的中间层
# 第二章
## CommonJS目的
希望js能够在任何地方运行。
## 在commonJS之前js的困境
- 没有模块系统
- 标准库较少
- 没有标准接口
- 缺乏包管理系统
## exports和module.exports
首先只能，exports只是module.exports一个别名，一个引用而已。commonJS导出的只是module.exports属性。
而module只是一个含exports属性的对象。请看node官方文档
https://nodejs.org/api/modules.html#modules_exports_shortcut
任何时候都不要更改module.exports的指向
```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // Module code here. In this example, define a function.
    function someFunc() {}
    exports = someFunc;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = someFunc;
    // At this point, the module will now export someFunc, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```
参考：https://www.zhihu.com/question/26621212
## 模块标识
就是传递给require()方法的参数，它必须是符合小驼峰命名的字符串，或者是以..开头的相对路径或绝对路径，可以没有.js。
## node模块加载
```js
// a是密集的number数组，不让用Array的内建方法  
// function insertion_sort(a) {  
//   for (var i = 1; i < a.length; i++) {  
//     var t = a[i];  
//     var j = 0;  
//     for (_____;_____;_____) {  
//       __________;  
//     }  
//     a[j + 1] = t;  
//   }  
// } 
```
node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而node缓存的是编译和执行之后的对象。
不论是核心模块还是文件模块，require()方法对相同模块的二次加载都一律采用缓存有限方式，不同之处在于核心模块的缓存检查先于文件模块。
## 模块标识符
- 核心模块（在node的源代码编译过程中已经编译为二进制代码，其加载过程最快）
- .或..的相对路径文件模块
- 以/开始的绝对路径文件模块
- 以非路径形式的文件模块，如自定义的connect模块。
## 模块路径的生成规则
- 当前文件目录下的node_modules目录
- 父目录下的node_modules目录
- 顺着路径向上逐级递归，直到根目录下的node_modules目录
## 模块文件扩展名分析
按照js node json，依次尝试，尝试过程需要调用fs模块同步阻塞地判断文件是否存在。
## 目录分析和包
require()通过分析文件扩展名后，可能没有查找到对应文件，却得到一个目录。
此时，首先node会检查当前目录是否存在package.json，通过JSON.parse解析出包描述对象，从中取出main属性制动的文件名进行定位。如果缺少扩展名，进入上面的模块文件扩展名分析。
如果main属性指定文件名错误，或者压根没有package.json文件，node会将index当作默认文件名，依次查找index.js，index.node，index.json。
如果没有定位到任何文件，则自定义模块进入下一模块路径进行朝朝（父目录的node_modules）进行查找。如果模块路径数组都被遍历完毕，依然没有查找到文件，则会抛出查找失败的异常。
## 模块编译
在node中，每个文件模块都是一个对象
对于不同文件扩展名，其载入方法也有所不同
- .js 通过fs模块同步读取文件后编译执行。
- .node 这是用c/c++编写的编写的扩展文件，通过dlopen()方法加载最后编译生成的文件。
- .json文件。通过fs模块同步读取文件，用JSON.parse()解析返回结果。
- 其余扩展名文件。它们都被.js文件载入。
每个编译成功的模块都会将其文件路径作为索引滑轮在Module._cache对象上，以提高二次引入的性能。
Module._extensions会被赋值给require()的extensions属性，通过访问require.extensions可以指定系统中已有的扩展加载方式。
## 加载自定义的扩展名
可以通过
```js
require.extensions['yourext']
```
但是node官方不鼓励。推荐将其他语言编译成js再加载。
## js模块编译
事实哈桑，在编译过程中，node对获取的ejs文件内容进行头尾包装
```js
(function (exports, require, module, __filname, __dirname) {
  // your code here
})
```
这样每个模块文件之间都进行作用域隔离。包装之后的代码会通过vm原生模块的runInThisContext()方法执行（类似eval，只是具有明确上下文，不污染全局），
返回一个具体的function对象。最后将当前模块对象的exports属性，require()方法，module以及在文件定位中得到的完整文件路径和文件目录传递给这个function()执行。
## c/c++模块编译
node调用process.dlopen()（在windows和类unix有不同实现，通过libuv层封装）方法进行加载和执行。
实际上，.node的模块文件并不需要编译，因为它是编写c/c++模块之后编译生成的，所以只有加载和执行过程。
## json文件的编译
node利用fs同步读取json文件，调用JSON.parse()方法得到对象，然后将它付给模块对象的exports，以供外部调用。
## 核心模块
分为c/c++和js两部分，其中c/c++文件存放在node项目的src目录下，js文件存放在lib目录下。
## js核心模块的编译过程
在编译所有c/c++文件之前，编译程序需要将全部js模块文件编译成c/c++代码。
## js核心模块转换为c/c++
node采用v8附带的js2c.py工具，将所有内置的js代码转换为c++里的数组，生成node_natives.h头文件。
在这个过程中，js代码以字符串的形式储存在node命名空间中，是不可直接执行的。在启动node进程是，js代码
直接加载进内存中。在加载过程中，js核心模块经历标识符分析后直接定位到内存中，比普通的文件模式从磁盘中一处
一处查找要快得多。（所以也造成node启动慢）
## 编译js核心模块
与文件模块有区别的地方在于在于源代码的获取方式和缓存执行结果的位置。
js核心模块的获取过程，源文件通过process.binding('natives')取出，编译成功的模块缓存到NativeModule._cache对象
上，文件模块则缓存到Module._cache对象上。
## c/c++核心模块的编译过程
node是使用c++模块主内完成核心，js主外实现封装的模式实现node的高性能。
node中的buffer crypto evals fs os等模块都是通过c/c++编写的。
## c/c++核心模块的组织形式
node_extension.h文件将散列的内建模块统一放进了node_module_list数组中。
而node提供了get_builtin_module()方法从node_module_list数组中取出这些模块。
内建模块的优势在于：首先c/c++的性能高于js。其此，在进行二五年间编译是，它们被编译成二进制文件。一旦node开始执行，它们被编译成二进制文件。一旦node开始执行，它们被直接加载进内存，无须再次坐标识符定位，文件定位，编译等过程，直接执行。（低内存设备内存占用大的问题）
## 编写核心模块
对c/c++一点不认识（暂时跳过）
## c/c++扩展模块
js一个典型弱点就是位运算。js位运算参照java的位运算实现，但是java位运算是在int型数字的基础上进行的，而js中只有double星的数据类型，在进行位运算的过程中，需要将double型转换位int型，然后进行。所以。在js层面上做位运算的效率不高。
.node文件其实是按平台划分的在类unix下是gcc/g++编译的动态链接共共享对象文件(.so)，在windows下则需要通过Visual
c++编译位动态链接库文件(.dll)
值得注意的是，一个平台下的.node在另一个平台下是无法加载执行的，必须重新用各自平台下的编译器编译成正确的node文件。
## 更多的c/c++扩展模块
to do

## npm全局安装
它根据包描述文件中的bin字段配置，将实际脚本链接到node可执行文件相同的路径下
```js
"bin": {
  "express": "./bin/express"
}
```
实际上，通过全局模式安装的所有模块都被安装进了一个统一的目录下，这个目录可以通过如下方式推算出来
```js
path.resovle(process.execPath, '..', '..', 'lib', 'node_modules')
```
# 第三章
## node处理资源的方式
利用单线程，远离多线程死锁，状态同步等问题，利用异步I/O，让单线程远离阻塞，以更好地使用CPU。
## 操作系统内核对于I/O只有两种方式
阻塞和非阻塞。非阻塞I/O跟阻塞I/O的差别为调用之后会立即返回。阻塞I/O完成整个获取数据的过程，而非阻塞I/O则不带数据直接返回，要获取数据，还需要通过文件描述符再次读取。而判断非阻塞I/O是否完成，需要重复调用判断操作是否完成的技术叫做轮询。
## 轮询手段
- read （性能最低）通过重复调用来检查I/O的状态来完成完整数据的读取。
- select 它是通过对文件描述符上的事件状态来进行哦按段。
- poll 采用链表的方式避免数组长度的限制，其次它能避免不需要的检查。但是当文件描述符较多的时候，它的性能还是十分低下。
- epoll 该方案是Linux下效率最高的I/O事件通知机制，在进入轮询的时候如果没有就按察到I/O事件，将会进行休眠。直到事件发生将它唤醒。它是真实利用了事件通知，执行回调的方式，而不是遍历查询，所以不会浪费CPU。
- kqueue 该方案的实现与epoll类似，不过它仅在FreeBSD系统存在，
## node异步I/O方案
node在类unix平台自行实现了线程池来完成异步I/O。
在winodws采用IOCP实现了异步I/O，本质上是系统内核接管了线程池。
在libuv层作为了抽象封装层
```js
function f(x) { 
  return [
    function () { x++ }, 
    function (y) { 
      return function (z) { 
        console.log(x + y + z)
      }
    }
  ]
}

const [f1, xy] = f(1);
const xyz = xy(2);
f1();
xyz(3);
```
## 事件循环
此处关于这个部分，请查看https://github.com/result17/blog/blob/master/node/eventloop.md
在windows下，事件循环基于IOCP创建，而在*unix下则基于多线程创建。
而发出调用到回调函数被执行，中间发生的是：从js线程会产生一个请求对象，
## process.nextTick()
讲回调函数放入队列中，在下一个Tick时取出执行。定时器中采用红黑树的操作事件复杂度为o(lg(n))， nextTick
的时间复杂度为o(1)
## setImmdiate()
setImmdiate()方法与process.nextTick()方法都是将回调函数延迟执行，
process.nextTick()中的回调函数执行优先级要高于setImmdiate()。
在具体实现上，process.nextTick()