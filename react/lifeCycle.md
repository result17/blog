```js
componentDidUpdate(prevProps, prevState, snapshot)
```
componentDidUpdata()会在更新后会被立即调用，首次渲染不会执行此方法。

当组件更新后，可以在此对dom（BOM也可以，例如调整窗口滚动高度）进行操作。可以在此对更新前后props进行比较，选择进行网络请求。
也可以在componetDidUpdate()中直接调用setState()，但必须包裹在条件语句中，否则会导致死循环。
还有请不要将props“镜像”给state，直接使用props。

如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

如果shouldComponentUpdate()返回值为false，则不会调用componentDidUpdata().