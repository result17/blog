### 网页首帧优化
https://juejin.im/post/5bee7dd4e51d451f5b54cbb4

### 防止xss
https://juejin.im/post/5bad9140e51d450e935c6d64

### 预防DOM型XSS攻击
DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。
如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。
DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
```html
<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>
```

### 掘金内容json
掘金先加载一个骨架html，再通过ajax请求接口的内容json，并序列化后插入html，完成csr。
```json
{
"content": "<h1 class=\"heading\">前言</h1>\n<p>自JavaScript诞生以来，前端技术发展非常迅速。移动端白屏优化是前端界面体验的一个重要优化方向，Web 前端诞生了 SSR 、CSR、预渲染等技术。在美团支付的前端技术体系里，通过预渲染提升网页首帧优化，从而优化了白屏问题，提升用户体验，并形成了最佳实践。</p>\n<p>在前端渲染领域，主要有以下几种方式可供选择：</p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:center\"></th>\n<th style=\"text-align:left\">CSR</th>\n<th style=\"text-align:left\">预渲染</th>\n<th style=\"text-align:left\">SSR</th>\n<th style=\"text-align:left\">同构</th>"
}
```
内容是经过转义返回到客户端的，一定程度下避免了xss攻击。

### 1px问题
- 新版本ios：写0.5px，就会显示一个物理像素宽度的 border，而不是一个css像素的 border。
- 使用边跨图片
- 使用box-shadow
- 使用伪元素
```html
.setOnePx{
  position: relative;
  &::after{
    position: absolute;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; /*no*/
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```
- 设置viewport的scale

### z-index的问题
1、首先先看要比较的两个元素是否处于同一个层叠上下文中：
      1.1如果是，谁的层叠等级大，谁在上面（怎么判断层叠等级大小呢？——看“层叠顺序”图）。
      1.2如果两个元素不在统一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。
2、当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。

https://juejin.im/post/5b876f86518825431079ddd6

### redux
最简单的订阅状态
```js
const createStore = function (initState) {
  let state = initState;
  let listeners = [];

  /*订阅*/
  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(newState) {
    state = newState;
    /*通知*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState
  }
}
```
使用reducer更改状态
```js
/*注意：action = {type:'',other:''}, action 必须有一个 type 属性*/
function plan(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}
```
```js
/*增加一个参数 plan*/
const createStore = function (plan, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

// dispatch函数
  function changeState(action) {
    /*请按照我的计划修改 state*/  
    state = plan(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState
  }
}
```
```js
const exceptionMiddleware = (next) => (action) => {
  try {
    /*loggerMiddleware(action);*/
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  } 
}
/*loggerMiddleware 变成参数传进去*/
store.dispatch = exceptionMiddleware(loggerMiddleware);
```
https://github.com/brickspert/blog/issues/22

### doctype
目前浏览器的排版引擎使用三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）。在怪异模式下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。在标准模式下，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现。

### 块格式化上下文
- 根元素(<html>)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、- table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content或 paint 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。
- 不考录兼容情况下的最佳实践：使用display: flow-root
作用：让浮动内容和周围的内容等高
使用display: flow-root

### block, inline和inline-block
#### display:block
block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
block元素可以设置margin和padding属性。
#### display:inline
inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
inline元素设置width, height属性无效。
inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。
#### display:inline-block
简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。
