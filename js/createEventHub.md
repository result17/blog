## 阅读链接
https://github.com/amandakelake/blog/issues/65
这是自己平常有接触到，但没有意识总结的知识。
## 实现
讲博主的代码用面向对象方式实现一次
```js
class EventHub {
  constructor() {
    // 存放事件，及事件处理函数
    this.hub = Object.create(null)
  }
  on(event, handler) {
    if (!(event in this.hub)) {
      this.hub[event] = []
    }
    this.hub[event].push(handle)
  }
  emit(event, data) {
    if (!(event in this.hub)) return
    this.hub[event].forEach(handler => handler(data))
  }
  off(event, handler) {
    if (!(event in this.hub)) return
    this.hub[event] = this.hub[event].filter(item => item !== handler)
  }
}
```