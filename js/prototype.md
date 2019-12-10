关于原型链，其实把原型链图片记清楚，基本没什么问题
![img](https://github.com/result17/blog/blob/master/imgs/prototype.jpg?raw=true)

但还需要注意一两点
所有的构造函数的__proto__（es6的正规用法为Object.getPrototypeOf）属性都指向Function.prototype，包括Object和Function。这里就出现一个奇怪的现象，Funtion就有两个属性指向其原型Function.prototype。
任何函数都有原型这句话是错的，箭头函数不具备原型。但如下代码成立
```js
let f = () => 1
Object.getPrototypeOf(f) === Function.prototype
```
实例自身没有constructor属性，会从其构造函数原型上继承过来。
构造函数的原型本质上是对象，所以
```js
Object.getPrototypeOf(Array.prototype) === Object.prototype
```