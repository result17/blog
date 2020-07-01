## 组合继承
组合集成是JavaScript最常用的继承模式，但存在一个不足是调用了两次超类型构造函数。在实例上和subType.prototype上会有相同的两份属性。

##  寄生组合继承
所谓寄生组合继承，即是通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
基本思路：不必为了指定子类型的原型而调用超类型的构造函数（组合继承的用法）。
```js
// 在组合继承中
SubType.prototype = new SuperType()
```
不太好理解吧？我们来分析一下。
分析
```js
// 假设
let obj = new SuperType()
// 所以
SubType.prototype = obj
// 由于obj是构造函数SuperType的实例，所以
obj.__proto__ = SuperType.prototype
// 最后
SubType.prototype.__proto__ = SuperType.prototype
```
我们可以看到，通过上面语句subType通过原型链来继承了SuperType.prototype上的所有方法。
但实际上，我们真的要这么麻烦调用SuperType才能指定SubType.prototype吗？我们所需要无非是SuperType的一个副本而已。所以寄生组合继承这样使用
```js
function inheritPrototype(subType, superType) {
  // 注意这儿是浅拷贝，我觉得不太好，但如果是深拷贝则会导致内存占用问题
  var prototype = Object.assign(superType.prototype)
  // 例如此处修改constructor属性也会修改superType.prototype.constructor这显然不合理
  prototype.constructor = subType
  subType.prototype = prototype
}
```
```js
// 完整用例
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function() {
  alert(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
inheritPrototype(subType, superType)
subType.prototype.sayAge = function() {
  alert(this.age)
}
```
### extends有两条原型链
```js
// 1、构造器原型链
Child.__proto__ === Parent; // true
Parent.__proto__ === Function.prototype; // true
Function.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
// 2、实例原型链
child.__proto__ === Child.prototype; // true
Child.prototype.__proto__ === Parent.prototype; // true
Parent.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```

### node实现继承的方式
https://github.com/nodejs/node/blob/master/lib/util.js#L295-L313
```js
function inherits(ctor, superCtor) {
  if (ctor === undefined || ctor === null)
    throw new ERR_INVALID_ARG_TYPE('ctor', 'Function', ctor);

  if (superCtor === undefined || superCtor === null)
    throw new ERR_INVALID_ARG_TYPE('superCtor', 'Function', superCtor);

  if (superCtor.prototype === undefined) {
    throw new ERR_INVALID_ARG_TYPE('superCtor.prototype',
                                   'Object', superCtor.prototype);
  }
  Object.defineProperty(ctor, 'super_', {
    value: superCtor,
    writable: true,
    configurable: true
  });
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
```

### 继承
```js
// ES5 实现ES6 extends的例子
function Parent(name){
    this.name = name;
}
Parent.sayHello = function(){
    console.log('hello');
}
Parent.prototype.sayName = function(){
    console.log('my name is ' + this.name);
    return this.name;
}

function Child(name, age){
    // 相当于super
    Parent.call(this, name);
    this.age = age;
}
// new object.create
function object(){
    function F() {}
    F.prototype = proto;
    return new F();
}
function _inherits(Child, Parent){
    // Object.create
    Child.prototype = Object.create(Parent.prototype);
    // __proto__
    // Child.prototype.__proto__ = Parent.prototype;
    Child.prototype.constructor = Child;
    // ES6
    // Object.setPrototypeOf(Child, Parent);
    // __proto__
    Child.__proto__ = Parent;
}
_inherits(Child,  Parent);
Child.prototype.sayAge = function(){
    console.log('my age is ' + this.age);
    return this.age;
}
var parent = new Parent('Parent');
var child = new Child('Child', 18);
console.log('parent: ', parent); // parent:  Parent {name: "Parent"}
Parent.sayHello(); // hello
parent.sayName(); // my name is Parent
console.log('child: ', child); // child:  Child {name: "Child", age: 18}
Child.sayHello(); // hello
child.sayName(); // my name is Child
child.sayAge(); // my age is 18
```
