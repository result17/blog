## 更新
在stack overflow有一个更好的讨论
https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language

## 结论
In practical terms, this means that if you change the parameter itself (as with num and obj2), 
that won't affect the item that was fed into the parameter. 
But if you change the INTERNALS of the parameter, that will propagate back up (as with obj1).

如果，你直接改变参数自身，是不会影响函数外面的变量，如果改变参数内的属性，是会影响参数。

## 误区
原来，一直以来自己对值传递和引用传递的理解是错误的。先来一道题吧！

```js
let obj = {}
function f(o) {
  o.name = 'copy'
  o = {name: 'paste'}
}
f(obj)
console.log(obj.name)
```
```
输出是什么呢？如果是昨天的我，想必会回答'paste'。因为我觉得函数参数是按引用传递。实际上JavaScript高级程序设计第三版的第70页写明：
```
```
ECMAScript中所有函数的参数都是按值传递的。
```
```
局部变量o刚好和外部变量obj引用的是同一个对象而已，所有改变o的指向并不会影响外部变量obj
```
## 赋值和浅拷贝
```js
let a = {x: 1}
let b = a
b.x = 10
// ?
console.log(a.x)
```
```
这个毫无疑问是10
```
```js
let x = {x: 1}
let y = Object.assign(x)
y.x = 10
// ?
console.log(x.x)
let z = Object.assign({}, x)
z.x = 100
// ?
console.log(x.x)
```
```
答案是10和10
```
```
这就涉及到本人的一个误区，一直以为Object.assign(o)为浅拷贝，实际上不是这种调用是相当于赋值操作
只有Object.assign({}, o)才为浅拷贝
```
```
赋值是引用传递，但在浅拷贝对象来说，基本类型属性是赋值新的值，对于引用类型属性来说是，传递引用（和赋值操作一样）。
```