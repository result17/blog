### 逻辑运算符
```js
var a = 0 && -1;  //0
var b = 3 && 4;  //4
var c = 0 && 1 && 2;  //0
var d = 1 && 0 && 2;  //0
var e = 1 && 2 && 3;   //3
var f = 0 && false && '' && 1;  //0
var g = 0 || 1;  //1
var h = 1 || 0;  //1
var i = 1 || 2 && 3;   //1
var i = 1 || 2 || 3;   //1
var x = false || 0 || '';  //''
var j = 1 && 2 || 3;       //2
```
### doctype
<!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 html 标签之前。<!DOCTYPE> 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。HTML5 不基于 SGML，所以不需要引用 DTD。提示：请始终向 HTML 文档添加 <!DOCTYPE> 声明，这样浏览器才能获知文档类型。

```html
<!-- 错误写法，不应该加/ -->
<input />
```
https://zhuanlan.zhihu.com/p/26725189
div包裹图片多余像素问题
```css
img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
```

### hsts
![img](https://github.com/result17/blog/blob/master/imgs/http2https.png?raw=true)
![img](https://github.com/result17/blog/blob/master/imgs/hsts.png?raw=true)

### localstorage sessionstorage cookie

### 题目
```js
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```
```js
// my answer
// 2
// 4 // 函数先于变量提升，但随后变量更改了getName指向
// 1
// 1
// 不会
// .操作符先于new 操作符
```
https://www.jianshu.com/p/ca68783d0a82

### new的模拟
```js
const createInstance = (constuctor, ...args) {
  const instance = object.create(constuctor.prototype)
  constuctor.call(instance, ...args)
  return instance
}
```
### js精度
https://www.cnblogs.com/MuYunyun/p/9739951.html

### js字典序
```js
string.localeCompate
```

### node eventloop best posts
https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810

### node concurrency error handler
https://zhuanlan.zhihu.com/p/62210238

### a regex to remove src & href attribute
https://github.com/airuikun/Weekly-FE-Interview/issues/24