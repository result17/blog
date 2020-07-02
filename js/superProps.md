## 参考
[why do we write super props](https://overreacted.io/zh-hans/why-do-we-write-super-props/)
这是对此文的笔记
## super
在javaScript中，super指的是超类型的构造函数。（在react中， 它指向了React.Component）

值得注意的是，在调用超类型之前，你是不能在constructor使用this关键字。
相当于寄生组合继承中
```js
function SubType(name) {
  // super(name)
  SuperType.call(this, name)
}
```
为了避免落入这个陷阱，JavaScript 强制你在使用 this 之前先行调用 super。让父类来完成这件事情！
让我们回到React，看看Component做了什么
```js
// React 內部
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```
这不就是跟寄生组合继承超类型构造函数做的一样吗？
```js
function Component(props) {
  this.props = props
}
```
题外话：在react中你调用super()没有传入props, 你依然能够在render函数或其他地方中访问this.props。React在调用构造函数后也把props赋值给实例。
```js
  // React 内部
const instance = new YourComponent(props);
instance.props = props;
```
这是因为，React要服务更多的类抽象，如ClojureScript，CoffeeScript，ES6，Fable，Scala.js，TypeScript。所以才会这样设计。
但写super(props)是有必要的，因为React内部是在构造函数结束后才为实例，添加props属性。
所以在构造函数是没有办法调用this.props

```js
// React 內部
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// 你的程式碼內部
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 我们忘了传入 props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 未定义
  }
  // ...
}
```
最后的题外话，你会发现当你在类中使用 Context API （无论是旧版的 contextTypes 或是在 React 16.6 更新的新版 contextTypes）的时候，context 是作为第二个参数传入构造函数的。
但由于context使用频率问题，没有写 super(props, context) 。
在class fields proposal出台后，这些坑会被慢慢修复。
但对于super的探索还不于此。

## 个人见解
class语法，在我理解就是把构造函数的原型对象“包装”成函数（为什么非得包装成函数，自然是使用new操作符）。理由：
- class的constructor和构造函数的原型对象的construcor都是指向构造函数
- 在constructor外的所有属性都是挂在构造函数得原型上

## 补充
对于刚才super()，就是等于调用超类型的构造函数是不完全的描述。当父类的构造函数是原生对象构造函数如Array, Obeject时，JS是不会修改其this属性的。更兼容的写法是
```js
function SubType(name) {
  // super(name)
  // SuperType.call(this, name)
  let _this = new SuperType(name)
  Object.setPrototypeOf(_this, SuperType.prototype)
  return _this
}
```
```js
function Car(w) {
  this.wheels = w
}
function Benz(wheel) {
  let _this = new Car(wheel)
  // _this.__proto__ = Benz.prototype
  Object.setPrototypeOf(_this, Benz.prototype)
  return _this
}
var benz = new Benz(4)
```
所以super()，相当于构造父类的一个实例，修改实例的__proto__属性，并将实例赋给this。所以this不能在super前使用。