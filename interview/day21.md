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
  const result = constuctor.call(instance, ...args)
  return typeof result === 'object' ? result : instance
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

### will-change
通过此css属性告诉浏览器此元素很快会发生变换，从而启动GPU加快此图层渲染？。但后遗症有会影响后面postion: fixed的元素。

### getDerivedStateFromProps effect
https://tech.youzan.com/getderivedstatefromprops/

### dns prefectch
https://www.chromium.org/developers/design-documents/dns-prefetching
https://github.com/barretlee/performance-column/issues/3

### diffence between 301 and 302
301会被缓存
302不会

301 seo会捉取重定向的网站B，并将网址保存为b
302 会捉取B网站内容，但网址会保存为A

### chrome developer tool tips
https://coolshell.cn/articles/17634.html

### v8 asm
https://zhuanlan.zhihu.com/p/134647506
https://zhuanlan.zhihu.com/p/54465194

### 将异步和promise玩出新花样的文章
https://www.blackglory.me/async-constructor/

### Hoisting（变量提升)

### sesson storage
|  特性   | cookie | localStorage | sessionStorage
|  ----  | ----  | ----  | ----  |
| 数据的生命周期  | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存 | 仅在当前会话下（刷新页面还有效）有效，关闭页面或浏览器后被清除 |
| 存放数据大小  | 4k左右 | 一般为5MB |
| 与服务器端通信 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 |

### react中的$$typeof 
https://zhuanlan.zhihu.com/p/53163790
dan's blog

### react fiber
https://www.cxymsg.com/guide/fiber.html

### ag chart repo
ag-grid

### img srcset attr
```html
<img src="clock-demo-thumb-200.png"
     alt="Clock"
     srcset="clock-demo-thumb-200.png 200w,
             clock-demo-thumb-400.png 400w"
     sizes="(min-width: 600px) 200px, 50vw">
```
picture元素通过包含零或多个 source 元素和一个 img元素来为不同的显示/设备场景提供图像版本
```html
<picture>
    <source srcset="/media/examples/surfer-240-200.jpg"
            media="(min-width: 800px)">
    <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```
### 首屏加载优化
https://juejin.im/post/5de4fd9c518825434771d163
img 标签现在也有
