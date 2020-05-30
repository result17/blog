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
