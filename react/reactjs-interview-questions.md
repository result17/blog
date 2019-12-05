source: https://github.com/semlinker/reactjs-interview-questions
## 前言
在做使用react小打小闹做过程序后，发现对react的认识还不够。

## 什么是JSX？
JSX 是 ECMAScript 一个类似 XML 的语法扩展。基本上，它只是为 React.createElement() 函数提供语法糖，从而让在我们在 JavaScript 中，使用类 HTML 模板的语法，进行页面描述。
在下面的示例中，<h1> 内的文本标签会作为 JavaScript 函数返回给渲染函数。
```js
class App extends React.Component {
  render() {
    return(
      <div>
        <h1>{'Welcome to React world!'}</h1>
      </div>
    )
  }
}
```
以上示例 render 方法中的 JSX 将会被转换为以下内容：
```js
React.createElement("div", null, React.createElement(
  "h1", null, 'Welcome to React world!'));
```

## 类组件和函数组件
```js
  // 如果 Greeting 是一个函数
  const result = Greeting(props); // <p>Hello</p>

  // 如果 Greeting 是一个类
  const instance = new Greeting(props); // Greeting {}
  const result = instance.render(); // <p>Hello</p>
```
具体请阅读 https://overreacted.io/zh-hans/how-does-react-tell-a-class-from-a-function/
当我们需要使用状态state和生命周期函数时应该使用class组件或者使用函数组件

## 什么是 Pure Components?
React.PureComponent 与 React.Component 完全相同，只是它为你处理了 shouldComponentUpdate() 方法。当属性或状态发生变化时，PureComponent 将对属性和状态进行浅比较。另一方面，一般的组件不会将当前的属性和状态与新的属性和状态进行比较。因此，在默认情况下，每当调用 shouldComponentUpdate 时，默认返回 true，所以组件都将重新渲染。

## React 中的 props 是什么?
Props 是组件的输入。它们是单个值或包含一组值的对象，这些值在创建时使用类似于 HTML 标记属性的命名约定传递给组件。它们是从父组件传递到子组件的数据。
Props 的主要目的是提供以下组件功能：

将自定义数据传递到组件。
触发状态更改。
在组件的 render() 方法中通过 this.props.reactProp 使用

## 状态和属性有什么区别?
state 和 props 都是普通的 JavaScript 对象。虽然它们都保存着影响渲染输出的信息，但它们在组件方面的功能不同。Props 以类似于函数参数的方式传递给组件，而状态则类似于在函数内声明变量并对它进行管理。

## 回调函数作为 setState() 参数的目的是什么?
当 setState 完成和组件渲染后，回调函数将会被调用。由于 setState() 是异步的，回调函数用于任何后续的操作。

注意： 建议使用生命周期方法而不是此回调函数。
```js
setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'))
```
## HTML 和 React 事件处理有什么区别?
在 HTML 中事件名必须小写 而在 React 中它遵循 camelCase (驼峰) 惯例：
```js
<button onClick={activateLasers}>
```
在 HTML 中你可以返回 false 以阻止默认的行为：
```js
<a href='#' onclick='console.log("The link was clicked."); return false;' />
```
而在 React 中你必须地明确地调用 preventDefault() ：
```js
function handleClick(event) {
  event.preventDefault()
  console.log('The link was clicked.')
}
```
而且你在react上步访问事件，需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
## 什么是 "key" 属性，在元素数组中使用它们有什么好处?
key 是一个特殊的字符串属性，你在创建元素数组时需要包含它。Keys 帮助 React 识别哪些项已更改、添加或删除。
我们通常使用数据中的 IDs 作为 keys:
```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
)
```
## 如何创建 refs?
这是最近增加的一种方案。Refs 是使用 React.createRef() 方法创建的，并通过 ref 属性添加到 React 元素上。为了在整个组件中使用refs，只需将 ref 分配给构造函数中的实例属性。
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```
你也可以使用 ref 回调函数的方案，而不用考虑 React 版本。例如，访问搜索栏组件中的 input 元素如下
另一种使用Ref方式如下
```js
class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.txtSearch = null;
      this.state = { term: '' };
      this.setInputSearchRef = e => {
         this.txtSearch = e;
      }
   }

   onInputChange(event) {
      this.setState({ term: this.txtSearch.value });
   }

   render() {
      return (
         <input
            value={this.state.term}
            onChange={this.onInputChange.bind(this)}
            ref={this.setInputSearchRef} />
      );
   }
}
```
##  forward refs?
Ref forwarding 是一个特性，它允许一些组件获取接收到 ref 对象并将它进一步传递给子组件。
```js
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
const ref = React.createRef();
<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>
```
## callback refs 和 findDOMNode() 哪一个是首选选项?
 最好使用callback refs
```JS
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView()
  }

  render() {
    return <div ref={node => this.node = node} />
  }
}
```
## 什么是 Virtual DOM?
Virtual DOM (VDOM) 是 Real DOM 的内存表示形式。UI 的展示形式被保存在内存中并与真实的 DOM 同步。这是在调用的渲染函数和在屏幕上显示元素之间发生的一个步骤。整个过程被称为 reconciliation。

## Virtual DOM 如何工作?
Virtual DOM 分为三个简单的步骤。
每当任何底层数据发生更改时，整个 UI 都将以 Virtual DOM 的形式重新渲染。
然后计算先前 Virtual DOM 对象和新的 Virtual DOM 对象之间的差异。
一旦计算完成，真实的 DOM 将只更新实际更改的内容。 vdom3

## Shadow DOM 和 Virtual DOM 之间有什么区别?
Shadow DOM 是一种浏览器技术，它解决了构建网络应用的脆弱性问题。Shadow DOM 修复了 CSS 和 DOM。它在网络平台中引入作用域样式。 无需工具或命名约定，你即可使用原生 JavaScript 捆绑 CSS 和标记、隐藏实现详情以及编写独立的组件。Virtual DOM 是一个由 JavaScript 库在浏览器 API 之上实现的概念。

## 什么是 React Fiber? 主要目标是什么？
Fiber 是 React v16 中新的 reconciliation 引擎，或核心算法的重新实现。React Fiber 的目标是提高对动画，布局，手势，暂停，中止或者重用任务的能力及为不同类型的更新分配优先级，及新的并发原语等领域的适用性。
React Fiber 的目标是提高其在动画、布局和手势等领域的适用性。它的主要特性是 incremental rendering: 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力。

## 什么是受控组件?
在随后的用户输入中，能够控制表单中输入元素的组件被称为受控组件，即每个状态更改都有一个相关联的处理程序。

例如，我们使用下面的 handleChange 函数将输入框的值转换成大写：
```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()})
}
```
## 什么是非受控组件?
非受控组件是在内部存储其自身状态的组件，当需要时，可以使用 ref 查询 DOM 并查找其当前值。这有点像传统的 HTML。

在下面的 UserProfile 组件中，我们通过 ref 引用 name 输入框：
```js
class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.input = React.createRef()
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {'Name:'}
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## createElement 和 cloneElement 有什么区别?
JSX 元素将被转换为 React.createElement() 函数来创建 React 元素，这些对象将用于表示 UI 对象。而 cloneElement 用于克隆元素并传递新的属性。

## 在 React 中的提升状态是什么?
当多个组件需要共享相同的更改数据时，建议将共享状态提升到最接近的共同祖先。这意味着，如果两个子组件共享来自其父组件的相同数据，则将状态移动到父组件，而不是在两个子组件中维护局部状态。

## 组件生命周期（自己补充）

## 什么是高阶组件（HOC）?
高阶组件(HOC) 就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件，它只是一种模式，这种模式是由react自身的组合性质必然产生的。

我们将它们称为纯组件，因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件中的任何行为。
```js
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```
HOC 有很多用例：

代码复用，逻辑抽象化
渲染劫持
抽象化和操作状态（state）
操作属性（props

```js
function HOC(WrappedComponent) {
  return class Test extends Component {
    render() {
      const newProps = {
        title: 'New Header',
        footer: false,
        showFeatureX: false,
        showFeatureY: true
      };

      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}
```
## children 属性是什么?
Children 是一个属性（this.props.children），它允许你将组件作为数据传递给其他组件，就像你使用的任何其他组件一样。在组件的开始和结束标记之间放置的组件树将作为children属性传递给该组件。

React API 中有许多方法中提供了这个不透明数据结构的方法，包括：React.Children.map、React.Children.forEach、React.Children.count、React.Children.only、React.Children.toArray。
```js
const MyDiv = React.createClass({
  render: function() {
    return <div>{this.props.children}</div>
  }
})

ReactDOM.render(
  <MyDiv>
    <span>{'Hello'}</span>
    <span>{'World'}</span>
  </MyDiv>,
  node
)
``` 
## 怎样在 React 中写注释?
React/JSX 中的注释类似于 JavaScript 的多行注释，但是是用大括号括起来。
```js
<div>
  {/* 单行注释（在原生 JavaScript 中，单行注释用双斜杠（//）表示） */}
  {`Welcome ${user}, let's play React`}
</div>
```
```js
<div>
  {/* 单行注释（在原生 JavaScript 中，单行注释用双斜杠（//）表示） */}
  {`Welcome ${user}, let's play React`}
</div>
```
## 构造函数使用带 props 参数的目的是什么?
在调用super()方法之前，子类构造函数不能使用this引用。这同样适用于ES6子类。将props参数传递给super()的主要原因是为了在子构造函数中访问this.props。
带 props 参数:
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props) // prints { name: 'John', age: 42 }
  }
}
```
不带 props 参数:
```js
class MyComponent extends React.Component {
  constructor(props) {
    super()

    console.log(this.props) // prints undefined

    // but props parameter is still available
    console.log(props) // prints { name: 'John', age: 42 }
  }

  render() {
    // no difference outside constructor
    console.log(this.props) // prints { name: 'John', age: 42 }
  }
```
## 如何使用动态属性名设置 state ?
```js
handleInputChange(event) {
  this.setState({ [event.target.id]: event.target.value })
}
```
## Fragments
在react16版本后，render不需要要唯一个节点，可以使用Fragments。
```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  )
}
```
简洁版
```js
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  )
}
```
## 为什么使用 Fragments 比使用容器 div 更好?
通过不创建额外的 DOM 节点，Fragments 更快并且使用更少的内存。这在非常大而深的节点树时很有好处。
一些 CSS 机制如Flexbox和CSS Grid具有特殊的父子关系，如果在中间添加 div 将使得很难保持所需的结构。
在 DOM 审查器中不会那么的杂乱

## 在 React 中什么是 Portal ?
Portal 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。
```js
ReactDOM.createPortal(child, container)
```
一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：
第一个参数是任何可渲染的 React 子节点，例如元素，字符串或片段。第二个参数是 DOM 元素。