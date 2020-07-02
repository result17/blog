### react生命周期（class组件）
挂载阶段  render阶段
constructor
static getDerivedStateFromProps
render
componentDidMount

更新阶段  commit阶段
static getDerivedStateFromProps
shouldComponentUpdate(nextProps, nextState): boolean
render
getSnapshotBeforeUpdate
componentDidUpdate

卸载阶段
componentWillUnmount

错误处理
static getDerivedStateFromError
componentDidCatch

### react setState做了什么？
- setState会使得组件进入commit阶段，经过sholdComponetUpdate判断是否更新组件
- 经过render后，会产生新的v-dom tree，然后经过diff算法计算最小差异
- 然后react经过此最小差异进行update。

### setState的第二个参数
setState在react的生命周期中调用时，由于生命周期为异步的，所以setState变为“异步”批量更新。而此时获取state为未更新的state，可能引起错误，所以第二个参数是callback，在state更新后调用，一般是获取next state。
但react官方建议使用componetDidUpdate()代替

### setState可以接受函数作为参数
此updater函数接受的state和props都保证为最新。其返回值会与state进行浅合并。

### 为什么建议setState接受函数作为参数？
因为其接受的最新state，对于next state依赖cur state来计算的场景很有用，例如动画。

### react 中 key 的作用
加速react reconciliation。例如，列表节点，会根据key会比对相同的key节点，不会删除一个节点再新增一个节点进行插入。

### react生命周期中，最适合与服务端进行数据交互的函数是什么？
- componentDidMount（不推荐）部分人的观点，此时dom已经挂载了，可以进行dom操作。但发起http请求是一个异步操作，即使是较早的生命周期中调用，也不会马上执行。
- componentDidUpdata（推荐）因为React hooks中的useEffect混合了此两个生命周期，更倾向于componentDidUpdata。
  
### react中组件传值
父传子 通过props
子传父 可以通过，父组件传递一个函数的props，子组件调用携带参数调用此函数。或者，考虑使用redux或者mobox这些状态管理库dispatch('event')。如果是函数组件，更推荐使用createContext，配合useReducer来使用，provider.value={{dispatch}}
```js
<ListContext.Provider value={{ listState, dispatch }}>
  <List
    height={ 1000 }
    itemCount={ (data as QuestionContextRes).source.questions.length }
    itemSize={ 460 }
    itemData={ (data as QuestionContextRes).source.questions }
    useIsScrolling
    width={ '100%' }
  >
    {
      questionItemFactory
    }
  </List>
</ListContext.Provider>
```
### shouldComponentUpdate(nextProps, nextState)
react中父组件重新渲染的话，子组件会先于父组件重新渲染，很多时候这是不必要的，会造成性能浪费。所以在子组件的shouldCimponetUpdate可以进行判断，避免重新rerender。
```js
shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content === this.props.content) {
        return false;
    } else {
        return true;
    }
}
```

### 使用 PureComponent
PureComponent内部实现了shouldComponetUpdate里面使用浅比较进行判断函数是否rerender。在数据结狗是引用类型，可以导致不正确渲染。

### refs
react中正确获取dom或组件实例的API

### 调用 super(props) 的目的是什么
是由于es6中继承的子类使用this，必须要先调用super。Dan中的blog有写文章介绍此情况。

### state和props
state为组件的内部参数，可能随着生命周期而改变，作用范围仅为自身。
props为构造函数（或函数组件本身）初始化和更新时的函数参数，由父组件提供。组件不能改变自身 props。

### 客户端渲染和服务端渲染
- 客户端渲染会导致首屏加载时间过长，不利于seo
- 服务端渲染会消耗大量服务器资源。

### 受控组件
像input，textarea这些元素会自己维护state，不受react控制。但我们可以将这些元素的val设置成state的值，从而控制这些元素的值。

### 前端路由原理
- hash
```js
window.addEventListender('hashchang',fn)
```
- history
主要是基于history.pushState()和history.replaceState()
```js
// 新增历史记录
history.pushState(stateObject, title, URL);
// 替换当前历史记录
history.replaceState(stateObject, title, URL);
```
当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件
#### 对比
- hash只能更改#后的内容，history可以通过 API 设置任意的同源 URL
- history要配置路由不匹配的404page，而hash不用。
### 事件机制
- react不依赖于浏览器自身的事件规范，自行实现一个跨浏览器的事件池，如果阻止事件冒泡要使用event.preventDefault()，而不是event.stopPropagation。而事件池有利于复用事件，在浏览器中监听多个事件，会产生多个事件对象，还要注册多个事件监听器，造成高额的内存分配问题还要存在内存泄漏，而事件池，在事件触发时才分配事件对象，当回调函数结束调用时，事件对象重新返回事件池。