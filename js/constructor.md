```js
var o = {}
// true
o.constructor === Object
Object.constructor === Function
```
实例的constructor属性指向构造函数，构造函数的原型也通过constructor属性指回自身。
