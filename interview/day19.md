### http2.0
多路复用（即一个tcp/ip连接可以请求多个资源）


首部压缩（http头部压缩，减少体积）


二进制分帧（在应用层跟传送层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）


服务器端推送（服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端）


请求优先级（如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求。）

### 'uncaughtException' 事件
当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件。 默认情况下，Node.js 通过将堆栈跟踪打印到 stderr 并使用退出码 1 来处理此类异常，从而覆盖任何先前设置的 process.exitCode。 为 'uncaughtException' 事件添加处理程序会覆盖此默认行为。 或者，更改 'uncaughtException' 处理程序中的 process.exitCode，这将导致进程退出并提供退出码。 否则，在存在这样的处理程序的情况下，进程将以 0 退出。

### try catch不能捕获非阻塞或者异步函数里面的异常。
```js
try {
  process.nextTick(function(){
     let x=x; //第二个x在使用前未定义，会抛出异常
  },0);
} catch (e) {
  console.log('该异常已经被捕获');
  console.log(e);
}
process.on('uncaughtException',function(err){console.log(err)})
```

### node中的domains
node中domain模块能被用来集中地处理多个异常操作，通过node的domain模块可以捕获非阻塞函数内的异常。
但现在已经被弃用