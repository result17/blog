### js字符串编码
JavaScript语言采用Unicode字符集，但是只支持一种编码方法。

这种编码既不是UTF-16，也不是UTF-8，更不是UTF-32。上面那些编码方法，JavaScript都不用。

JavaScript用的是UCS-2！

### 监控dom变化
https://gist.github.com/tomhicks/6cb5e827723c4eaef638bf9f7686d2d8
```js

/*
Copy this into the console of any web page that is interactive and doesn't
do hard reloads. You will hear your DOM changes as different pitches of
audio.
I have found this interesting for debugging, but also fun to hear web pages
render like UIs do in movies.
*/

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const observer = new MutationObserver(function(mutationsList) {
  const oscillator = audioCtx.createOscillator()

  oscillator.connect(audioCtx.destination)
  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(
    Math.log(mutationsList.length + 5) * 880,
    audioCtx.currentTime,
  )

  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 0.01)
})

observer.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
})  
```

### RPC
https://www.zhihu.com/question/25536695
远程过程调用协议RPC

### css加载会造成阻塞吗？
css加载不会阻塞DOM树的解析
css加载会阻塞DOM树的渲染
css加载会阻塞后面js语句的执行
js会阻塞Dom解析

### typeof class
function class 只是function的语法糖

### Virtual DOM
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。
list-diff

https://www.zhihu.com/question/29504639/answer/73607810

### 点击劫持
X-Frame-Options  不允许页面存在iframe

### mvc mvvm
https://github.com/livoras/blog/issues/11

### useReducer和重载
```js
/**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see https://reactjs.org/docs/hooks-reference.html#usereducer
     */
    // overload where dispatch could accept 0 arguments.
    function useReducer<R extends ReducerWithoutAction<any>, I>(
        reducer: R,
        initializerArg: I,
        initializer: (arg: I) => ReducerStateWithoutAction<R>
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];

    function useReducer<R extends ReducerWithoutAction<any>>(
        reducer: R,
        initializerArg: ReducerStateWithoutAction<R>,
        initializer?: undefined
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];

    function useReducer<R extends Reducer<any, any>, I>(
        reducer: R,
        initializerArg: I & ReducerState<R>,
        initializer: (arg: I & ReducerState<R>) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

    function useReducer<R extends Reducer<any, any>, I>(
        reducer: R,
        initializerArg: I,
        initializer: (arg: I) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
   
    function useReducer<R extends Reducer<any, any>>(
        reducer: R,
        initialState: ReducerState<R>,
        initializer?: undefined
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

```
函数重载，前面的函数只用写函数头，最后一个函数写函数头还有函数体。
https://www.zhihu.com/question/63751258

### override和overload
override：覆写，在继承关系中，子类如果定义了一个与父类方法签名完全相同的方法，被称为覆写（Override）。
overload：是方法签名不同，但刚好函数名相同。

### ReadOnlyArray和Tuple
```js
const values: ReadonlyArray<string> = ["a", "b", "c"];
const point: readonly [number, number] = [0, 0];
```

### 数组扁平
知乎的马猴烧韭
```js
type ArrayElement<T> = {
  isArray: ArrayElem<T extends ReadonlyArray<infer E> ? E : never>;
  notArray: T;
}[T extends ReadonlyArray<any> ? 'isArray' : 'notArray'];

type ArrayElem<T> = T extends ReadonlyArray<any> ? ArrayElement<T> : T;

/**
 *
 * @param xs the input array
 * @returns `xs.flat(Infinity)`
 */
export function flatInfinity<T>(xs: ReadonlyArray<T>): Array<ArrayElem<T>> {
  return xs.flat(Infinity);
}
```

### 用interface定义函数
<!-- 平常用的最多的FC -->
```js
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```
(props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null 表示这种类型的变量可以作为函数执行：

### 联合类型 extends any
https://zhuanlan.zhihu.com/p/54193438
简要的说一下就是如果 extends 左边是联合类型，那么 TS 会把 extends 操作符左边的联合类型拆开做判断。
如果第一部分的输入是 1|2 那么输出是 ((k: 1) => void) | ((k: 2) => void) 而不是 (k: 1|2) => void

### node的cpu和堆分析
导入到 Chrome Performance 中分析:
```js
node --cpu-prof --heap-prof -e "require('request')"
```

### react 事件

<!-- 都是旧的事件机制，react16 -->
https://zhuanlan.zhihu.com/p/35468208
https://juejin.im/post/5d7678b06fb9a06b2b47a03c#heading-27

### react版keep-alive

https://zh-hans.reactjs.org/docs/portals.html#usage
由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。

### react中的事件冒泡
这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先。

