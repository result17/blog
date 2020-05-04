### What are defer and async attributes on a <script> tag?
If neither attribute is present, the script is downloaded and executed synchronously, and will halt parsing of the document until it has finished executing (default behavior). Scripts are downloaded and executed in the order they are encountered.

The defer attribute downloads the script while the document is still parsing but waits until the document has finished parsing before executing it, equivalent to executing inside a DOMContentLoaded event listener. defer scripts will execute in order.

The async attribute downloads the script during parsing the document but will pause the parser to execute the script before it has fully finished parsing. async scripts will not necessarily execute in order.

Note: both attributes must only be used if the script has a src attribute (i.e. not an inline script).

#### Good to hear
- Placing a defer script in the head allows the browser to download the script while the page is still parsing, and is therefore a better option than placing the script before the end of the body.
- If the scripts rely on each other, use defer.
- If the script is independent, use async.
- Use defer if the DOM must be ready and the contents are not placed within a DOMContentLoaded listener.

### deepEqual
```js
function isDeepEqual(obj1, obj2, testPrototypes = false) {
  if (obj1 === obj2) {
    return true
  }

  if (typeof obj1 === "function" && typeof obj2 === "function") {
    return obj1.toString() === obj2.toString()
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }

  if (
    Object.prototype.toString.call(obj1) !==
      Object.prototype.toString.call(obj2) ||
    typeof obj1 !== "object"
  ) {
    return false
  }

  const prototypesAreEqual = testPrototypes
    ? isDeepEqual(
        Object.getPrototypeOf(obj1),
        Object.getPrototypeOf(obj2),
        true
      )
    : true

  const obj1Props = Object.getOwnPropertyNames(obj1)
  const obj2Props = Object.getOwnPropertyNames(obj2)

  return (
    obj1Props.length === obj2Props.length &&
    prototypesAreEqual &&
    obj1Props.every(prop => isDeepEqual(obj1[prop], obj2[prop]))
  )
}
```

### event delegation
```js
document.addEventListener("click", e => {
  if (e.target.closest("button")) {
    handleButtonClick()
  }
})
```

### What are some differences that XHTML has compared to HTML?
- An XHTML element must have an XHTML DOCTYPE
- Attributes values must be enclosed in quotes
- Attribute minimization is forbidden (e.g. one has to use checked="checked" instead of checked)
- Elements must always be properly nested
- Special characters must be escaped

### What are the lifecycle methods in React?
- getDerivedStateFromProps: Executed before rendering on the initial mount and all component updates. Used to update the state based on changes in props over time. Has rare use cases, like tracking component animations during the lifecycle. There are only few cases where this makes sense to use over other lifecycle methods. It expects to return an object that will be the the new state, or null to update nothing. This method does not have access to the component instance either.

- componentDidMount: Executed after first rendering and here all AJAX requests, DOM or state updates, and set up eventListeners should occur.

- shouldComponentUpdate: Determines if the component will be updated or not. By default, it returns true. If you are sure that the component doesn't need to render after state or props are updated, you can return a false value. It is a great place to improve performance as it allows you to prevent a rerender if component receives new prop.

- getSnapshotBeforeUpdate: Invoked right after a component render happens because of an update, before componentDidUpdate. Any value returned from this method will be passed to componentDidUpdate.

- componentDidUpdate: Mostly it is used to update the DOM in response to prop or state changes.

- componentWillUnmount: It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

- componentDidCatch: Used in error boundaries, which are components that implement this method. It allows the component to catch JavaScript errors anywhere in the child component tree (below this component), log errors, and display a UI with error information.

### Create a function that masks a string of characters with # except for the last four (4) characters.
```js
const mask = (str, maskChar = "#") =>
  str.slice(-4).padStart(str.length, maskChar)
  mask("123456789") // "#####6789"
```
### What is the difference between null and undefined?
- typeof undefined evaluates to "undefined".

typeof null evaluates "object". However, it is still a primitive value and this is considered an implementation bug in JavaScript.

undefined == null evaluates to true.

### == 相对于引用类型和非引用类型
```js
const a = [1, 2, 3]
const b = [1, 2, 3]
const c = "1,2,3"

console.log(a == c)
console.log(a == b)
```
Objects are compared by reference

### What does the following function return?
```js
function greet() {
  return
  {
    message: "hello"
  }
}
```

### js添加;的特例
- The line starts with [
- The line starts with (

### what is the children prop?
children is part of the props object passed to components that allows components to be passed as data to other components, providing the ability to compose components cleanly. There are a number of methods available in the React API to work with this prop, such as React.Children.map, React.Children.forEach, React.Children.count, React.Children.only and React.Children.toArray. A simple usage example of the children prop is as follows:
```js
function GenericBox({ children }) {
  return <div className="container">{children}</div>
}

function App() {
  return (
    <GenericBox>
      <span>Hello</span> <span>World</span>
    </GenericBox>
  )
}
```
相当于vue中的slot

### What is a closure? Can you give a useful example of one?
A closure is a function defined inside another function and has access to its lexical scope even when it is executing outside its lexical scope. The closure has access to variables in three scopes:
- Variables declared in its own scope
- Variables declared in the scope of the parent function
- Variables declared in the global scope

In JavaScript, all functions are closures because they have access to the outer scope, but most functions don't utilise the usefulness of closures: the persistence of state. Closures are also sometimes called stateful functions because of this.

In addition, closures are the only way to store private data that can't be accessed from the outside in JavaScript. They are the key to the UMD (Universal Module Definition) pattern, which is frequently used in libraries that only expose a public API but keep the implementation details private, preventing name collisions with other libraries or the user's own code.

### 错误边界（Error Boundaries）

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

### js中唯一不与自己相等的值NaN
```JS
const isNaN = x => x !== x
```

### pipe
```js
const square = v => v * v
const double = v => v * 2
const addOne = v => v + 1
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
const res = pipe(square, double, addOne)
res(3) // 19; addOne(double(square(3)))
```
有点像lodash的flow

### pure function
A pure function is a function that satisfies these two conditions:

Given the same input, the function returns the same output.
The function doesn't cause side effects outside of the function's scope (i.e. mutate data outside the function or data supplied to the function).
