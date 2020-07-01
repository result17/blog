## node的模块可以分为哪几类？说说它们的区别

### 近期想学习的库
unstated-next 轻量的react状态管理库
React Loadable react在用来拆分组件的库 （它们都是由jamie kyle写的）
Loadable 是一个高阶组件（创建组件的function）用来轻易地在组件层面拆分bundle。
Loadable的用法很简单。你仅仅要做的就是把要加载的组件和当你加载组件时的“Loading”组件传入一个方法中。
```js
import Loadable from 'react-loadable';

function MyLoadingComponent() {
  return <div>Loading...</div>;
}

const LoadableAnotherComponent = Loadable(
  () => import('./another-component'),
  MyLoadingComponent
);

class MyComponent extends React.Component {
  render() {
    return <LoadableAnotherComponent/>;
  }
}
```

### useEffect
useEffect 做了什么？ 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。
React 何时清除 effect？ React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。
如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。
如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，但我们有更好的方式来避免过于频繁的重复调用 effect。

除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便。

简而言之，useEffect的第二项参数为[],只会在组件挂载时运行一次，而非重新渲染时。
### shouldComponentUpdata === PureComponent === React.momo

### fetch中useEffect
```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product' + productId); // 使用了 productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 这样是无效的，因为 `fetchProduct` 使用了 `productId`
  // ...
}
```
```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 把这个函数移动到 effect 内部后，我们可以清楚地看到它用到的值。
    async function fetchProduct() {
      const response = await fetch('http://myapi/product' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ 有效，因为我们的 effect 只用到了 productId
  // ...
}
```
因为useEffect是使用闭包保存数据的

### useEffect和useLayoutEffect的区别
https://www.jianshu.com/p/412c874c5add
useLayoutEffect 相比 useEffect，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
尽可能使用标准的 useEffect 以避免阻塞视觉更新。

useLayoutEffect和平常写的ClassComponent的'componentDidMount'和'componentDidUpdate'同时执行。
useEffect会在本次更新完成后，也就是第1点的方法执行完成后，在开启一次任务调度，在下次任务调度中执行useEffect。
原文链接：https://blog.csdn.net/wlqdbtx/article/details/103625218

useEffect是一个用来执行副作用hook，第一个参数传入一个函数，每一次render之后执行副作用和清除上一次副作用，该函数的返回值就是清除函数。第二个参数是一个数组，传入内部的执行副作用函数需要的依赖，当这几个依赖有一个要更新，effect里面也会重新生成一个新的副作用并执行副作用。如果没有更新，则不会执行。如果第二个参数不传，那么就是没有说明自己有没有依赖，那就是每次render该函数组件都执行。

很明显，useEffect第一个参数可以模仿didmount、didupdate，它的返回值可以模仿willunmount
https://cloud.tencent.com/developer/article/1426847

requestIdleCallback
https://www.cnblogs.com/Wayou/p/requestIdleCallback.html
https://juejin.im/post/5ad71f39f265da239f07e862
useEffect是借助此API实现的，所以不建议用此API操作DOM。
useEffect的返回值会被react用来清除副作用。
```js
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return [{ data, isLoading, isError }, setUrl];
};
function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );
  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          );
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
export default App;
```
### import和import()
静态的import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode ，导入的模块都运行在严格模式下。在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。

此外，还有一个类似函数的动态 import()，它不需要依赖 type="module" 的script标签。

在 script 标签中使用 nomodule 属性，可以确保向后兼容。

在您希望按照一定的条件或者按需加载模块的时候，动态import() 是非常有用的。而静态型的 import 是初始化加载依赖项的最优选择，使用静态 import 更容易从代码静态分析工具和 tree shaking 中受益。

