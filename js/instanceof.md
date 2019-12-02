```js
function instanceof(left, right) {
  if (typeof left !== 'Object' || left === null) return
  let prot = Object.getPrototypeOf(left)
  while (prot !== null) {
    if (prot === right) return true
    prot = Object.getPrototypeOf(prot)
  }
  return false
}
```
```
需要明确的是，instanceof和typeof一样是运算符。用来检测构造函数的 prototype 属性是否出现在某个实例对象的原型链。判断对象是否为构造函数的实例，可能不准确，因为此函数判断的是Object.getPrototypeOf(sub) === sup.prototype，当两者之一改变，等式不再成立。
```