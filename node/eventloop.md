```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```
[node官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#i-o-callbacks)
官方文档永远是最佳学习资料
node的事件循环有6个阶段及process.nextTick()
- timers阶段  此阶段执行setTimeout(callback)和setInterval(callback)预定的回调函数
- pending callbacks (以前叫I/O callbacks阶段) 执行除了close事件的callbacks，被timers(定时器，setTimeout、setInterval等)设定的callbacks、setImmediate()设定的callbacks之外的callbacks。（如 readFile函数data事件的回调）
- idle, prepare阶段  此阶段仅限node内部使用
- poll阶段  获取新的I/O事件，适当的条件下node将阻塞在这里
- check阶段 执行setImmediate()设定的回调函数
- close callback阶段 比如socket.on(‘close’, callback)的callback会在这个阶段执行。

注意上面六个阶段都不包括 process.nextTick()

每一个阶段都有一个装有callbacks的fifo queue(队列)，当event loop运行到一个指定阶段时，node将执行该阶段的fifo queue(队列)，当队列callback执行完或者是执行callbacks数量超过该阶段的上限时，event loop会转入下一个阶段。
process.nextTick()。process.nextTick() 产生的回调函数保存在一个叫做 nextTickQueue 的队列中，不在上面任何一个阶段的队列里面。当当前操作完成后，nextTickQueue 中的回调函数会立即被执行，不管事件循环处在哪个阶段。也就是说，在 nextTickQueue 中的回调函数被执行完毕之前，事件循环不会往前推进。

## poll阶段
在node.js里，任何异步方法（除timer，close，setImmediate之外）完成时，
都会将其callback加入到poll queue里，并立即执行
poll阶段有两个功能
1. 处理poll队列的事件（进入I/O callbacks阶段）
2. 执行timers的callback（进入timers阶段）
伪代码表示poll工作流程
```js
if (!timer) {
  if (!pollQueue.size) {
    if (hasSetImmediate()) {
      eventloop.enter(check)
    } else {
      // 在此阻塞，直到有新的callback
      while(pollQueue.size)
    }
  } else {
    while (!pollQueue.size) {
      callback()
      pollQueue.size--
    }
  }
} else {
  if (!pollQueue.size) {
    // timer时间是否到达
    if (timer.timeout) {
      eventloop.enter(check)
    }
  } else {
    while (!pollQueue.size) {
      callback()
      pollQueue.size--
    }
  }
}
```
[cNode相关讨论]https://cnodejs.org/topic/57d68794cb6f605d360105bf

## setTimeout 和 setImmediate
setImmediate 设计在poll阶段完成时执行，即check阶段；
setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行；但其在timer阶段执行
```js
setTimeout(function timeout () {
  console.log('timeout');
},0);

setImmediate(function immediate () {
  console.log('immediate');
});
```
答案是不确定
这种情况只会发生在初次启动node进程时发生，在回调过程中poll阶段必然会下先进入check阶段执行setImmediate回调再进入timer阶段
执行
在node中，setTimeout(cb, 0) === setTimeout(cb, 1);
都是先检查uv_run_timer的，但是由于cpu工作耗费时间，比如第一次获取的hrtime为0
那么setTimeout(cb, 1)，超时时间就是loop->time = 1(ms，node定时器精确到1ms，但是hrtime是精确到纳秒级别的)

由于第一次loop前的准备耗时超过1ms，当前的loop->time >=1 ，则uv_run_timer生效，timeout先执行
2.由于第一次loop前的准备耗时小于1ms，当前的loop->time = 0，则本次loop中的第一次uv_run_timer不生效，那么io_poll后先执行uv_run_check，即immediate先执行，然后等close cb执行完后，继续执行uv_run_timer

## process.nextTick()
process.nextTick()不在event loop的任何阶段执行，而是在各个阶段切换的中间执行,即从一个阶段切换到下个阶段前执行。
process.nextTick()是node早期版本无setImmediate时的产物，node作者推荐我们尽量使用setImmediate。