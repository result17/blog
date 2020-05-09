## 阅读链接
https://github.com/amandakelake/blog/issues/36
## 简单实现
```js
function instance_of(L, R) {//L 表示左边的object，R 表示右边的constructor
  if (L === null) return
  const R_P = R === null ? null : R.prototype// 取 R 的显式原型
  L = L.__proto__// 取 L 的隐式原型,并且可能会顺着原型链重新赋值
  while (true) { 
    if (L === null) 
      return false
    if (R_P === L)// 这里重点：严格比较 true 
      return true;
    L = L.__proto__
  } 
}
```
需要明确的是，instanceof和typeof一样是运算符。用来检测构造函数的 prototype 属性是否出现在某个实例对象的原型链。判断对象是否为构造函数的实例，可能不准确，因为此函数判断的是Object.getPrototypeOf(sub) === sup.prototype，当两者之一改变，等式不再成立。
## update
```js
console.log('aa' instanceof String) // 都说了判断引用类型，拿个基本类型出来坑爹么
let obj_string = new String('aa');
console.log(obj_string instanceof String)
```
注意包装类型的坑，new出来的永远是对象
```js
console.log(String instanceof String); 
console.log(Object instanceof Object); 
console.log(Function instanceof Function); 
console.log(Function instanceof Object);
```
尝试能否答对？

### myInstanceOf
```js
const myInstanceOf = (l, r) => {
  if (L === null) return
  l = l.getPrototypeof(l)
  r = r === null ? null : r.prototype
  while (true) {
    if (l === null) return false
    if (l === r) return true
    l = l.getPrtototypeof(l)
  }
}
```

### 对象转原始值
对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

如果Symbol.toPrimitive()方法，优先调用再返回
调用valueOf()，如果转换为原始类型，则返回
调用toString()，如果转换为原始类型，则返回
如果都没有返回原始类型，会报错
