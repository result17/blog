```js
export function debounce(fn, deplay, immediate) {
  let timerID, result
  return function(...args) {
    // 是否需要立即执行
    let context = this
    if (timerID) clearTimeout(timerID)
    if (immediate) {
      let callNow = !timerID
      // 停止触发事件deplay毫秒后，才能重新触发 (callNow === true)
      timerID = setTimeout(() => {
        timerID = null
      }, deplay)
      if (callNow) result = fn.apply(context, args)
    } else {
      timerID = setTimeout(() => {
        result = fn.apply(context, args)
      }, deplay)
    }
    return result
  }
}
```
```
防抖函数常用于鼠标移动，输入框输入，格斗游戏的攻击硬直。修正了this指向问题（不使用apply会指向window）,因为addEventListener会自动传入事件对象，所以增加了args参数。而且事件处理函数可能有返回值，增加了result。
```