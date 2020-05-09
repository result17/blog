## 为什么0.1 + 0.2 !== 0.3?请从浮点数原理回答。
https://github.com/camsong/blog/issues/9



## 什么是BFC？如何触发BFC？什么是浮动？如何清除浮动为什么要清除浮动？



## 什么是函数柯里化？实现一个柯里化函数
```js
const curry = (fn: (...args: any[]) => any): function | void {
  return (..args) => {
    return args.length >= fn.length ? fn.apply(this, args) : curry(fn.bind(this, ...args))
  }
}
```
充分利用箭头函数的实现
```js
const currying = fn =>
    judge = (...args) =>
        args.length >= fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg)
```


## virtual Dom？
### 判断 == 调用哪些函数？
valueOF

### 为什么需要react的服务端渲染

### 暂时性死区
es6后，let和const引入此概念，如果let 和 const 关键字声明的变量，在初始化前访问就会出现引用错误。


### 箭头函数this
```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()
```
对于箭头函数，this 关键字指向的是它当前周围作用域（简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象），这个行为和常规函数不同。这意味着当我们调用 perimeter 时，this 不是指向 shape 对象，而是它的周围作用域（在例子中是 window）。都怪我粗心没看清箭头函数。

### static
```js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')
```
colorChange 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用（也就是 Chameleon），并且不能传递给实例。因为 freddie 是一个实例，静态方法不能被实例使用，因此抛出了 TypeError 错误。

###  事件传播的三个阶段是什么？
在捕获（capturing）阶段中，事件从祖先元素向下传播到目标元素。当事件达到目标（target）元素后，冒泡（bubbling）才开始。

### 所有对象都有原型
除了基本对象（base object），所有对象都有原型。基本对象可以访问一些方法和属性，比如 .toString。这就是为什么你可以使用内置的 JavaScript 方法！所有这些方法在原型上都是可用的。虽然 JavaScript 不能直接在对象上找到这些方法，但 JavaScript 会沿着原型链找到它们，以便于你使用。

### 函数与模板字符串
```js
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
```
如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！

### Object.prototype.tostring()
```js
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

// 456
console.log(a[b])
```

### 块级作用域
```js
(() => {
  let x, y
  try {
    throw new Error()
  } catch (x) {
    (x = 1), (y = 2)
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
```
catch 代码块接收参数 x。当我们传递参数时，这与之前定义的变量 x 不同 。这个 x 是属于 catch 块级作用域的。

然后，我们将块级作用域中的变量赋值为 1，同时也设置了变量 y 的值。现在，我们打印块级作用域中的变量 x，值为 1。

catch 块之外的变量 x 的值仍为 undefined， y 的值为 2。当我们在 catch 块之外执行 console.log(x) 时，返回 undefined，y 返回 2。

## promise和setTimeout的巧妙结合
```js
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

### weakset 与 weakmap
```js
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```

### 运算符结合顺序
```js
console.log(3 + 4 + "5");
```

### parseInt
```js
const num = parseInt("7*6", 10);
```

### defineProperty
```js
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));

// { name: "Lydia", age: 21 }, ["name"]
```

### JSON.stringify的第二个参数
```js
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```
JSON.stringify的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为"level" 和 "health" 的属性被包括进来， "username"则被排除在外。 data 就等于 "{"level":19, "health":90}".

而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（译者注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为undefined，则该属性会被排除在外。

### reduce深入理解
```js
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

### import运行顺序
```js
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

### 基本类型
```js
console.log(Number(1) === Number(1))
console.log(new Number(1) === new Number(1))
console.log(Symbol('foo') === Symbol('foo'))
```

### 生成器
```js
function* startGame() {
  const 答案 = yield "Do you love JavaScript?";
  if (答案 !== "Yes") {
    return "Oh wow... Guess we're gone here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```

### 箭头函数prototype
```js
function giveLydiaPizza() {
  return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
```

### ... args
```js
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```
... args是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，并且只能作为最后一个参数。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。

### symbols

#### random nums
```js
class RmNumList {
  constructor(range, len) {
    // 
    static this.range = 
  }
}
```

### 箭头函数返回陷阱
```js
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
```
箭头函数返回对象应该使用()