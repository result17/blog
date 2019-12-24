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
  var prototype = Object(superType.prototype)
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
