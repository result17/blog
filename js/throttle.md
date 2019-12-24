```
首先，节流有几个模式，有头无尾，无头有尾，有头有尾。头和尾分别指的是，首次触发事件是否执行函数和事件不再触发后是否还执行一次函数。注意防抖和节流每次都返回新的函数.
节流应用：格斗游戏的攻击硬直，飞机大战虽然玩家多次按发送按钮但单位事件只有一次炮弹发射。
```
```js
// 有头无尾
export function throttle(fn, deplay) {
  let lastTime = 0
  return function(...args) {
    let context = this
    let now = +new Date()
    let result
    if (now - lastTime > deplay) {
      result = fn.apply(context, arg)
      lastTime = now
    } 
    return result
  }
}
```
```js
// 有头无尾（setTimeout版）
export function throttle(fn, deplay) {
  let timerID = null
  return function(...args) {
    let context = this, result
    if (!timerID) {
      timerID = setTimeout(() => {
        timerID = null
      } , deplay)
      result = fn.apply(context, args)
    }
    return result
  }
}
```
```js
// 无头有尾
export function throttle(fn, deplay) {
  let timerID = null
  return function(...args) {
    let context = this, result
    if (!timerID) {
      timerID = setTimeout(() => {
        result = fn.apply(context, args)
        timerID = null
      } , deplay)
    }
    return result
  }
}
```
```js
// 直接引用  https://github.com/mqyqingfeng/Blog/issues/26
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```