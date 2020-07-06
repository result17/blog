## DOCTYPE 的作用是什么？
 IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（DOCTYPE）切换实现的。
<!DOCTYPE>声明位于 HTML 文档中的第一行，处于 html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。
DOCTYPE 不存在或格式不正确会导致文档以兼容模式border-box呈现，存在则以content-box呈现。
<!DOCTYPE>  声明一般位于文档的第一行，它的作用主要是告诉浏览器以什么样的模式来解析文档。一般指定了之后会以标准模式来进行文档解析，否则就以兼容模式进行解析。在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。而在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。
在 html5 之后不再需要指定 DTD 文档，因为 html5 以前的 html 文档都是基于 SGML 的，所以需要通过指定 DTD 来定义文中允许的属性以及一些规则。而 html5 不再基于 SGML 了，所以不再需要使用 DTD。
## 标准模式与兼容模式各有什么区别？
标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。
## HTML5 为什么只需要写 <!DOCTYPE HTML>，而不需要引入 DTD？
HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。
而 HTML4.01 基于 SGML ，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。
## SGML 、 HTML 、XML 和 XHTML 的区别？
SGML 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
HTML 是超文本标记语言，主要是用于规定怎么显示网页。 
XML 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多， 而 HTML 的标签都是固定的而且数量有限。
XHTML 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML 更严格，比如标签必须都用小写，标签都必须有闭合标签等。
## DTD 介绍
DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。
 DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。
## 行内元素与块级元素的区别？
HTML4中，元素被分成两大类：inline （内联元素）与 block （块级元素）。 
（1） 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
（2） 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
（3） 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。
## 空元素定义
标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。
常见的空元素有：br hr img input link meta
## link 标签定义
link 标签定义文档与外部资源的关系。
link 元素是空元素，它仅包含属性。 此元素只能存在于 head 部分，不过它可出现任何次数。
link 标签中的 rel 属性定义了当前文档与被链接文档之间的关系。常见的 stylesheet 指的是定义一个外部加载的样式表。
##  页面导入样式时，使用 link 和 @import 有什么区别？
（1）从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加
载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。
（2）加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。
（3）兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容
  性问题。
（4）DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @i
 mport 的方式插入样式。
## 你对浏览器的理解？
简单来说浏览器可以分为两部分，shell 和 内核。

其中 shell 的种类相对比较多，内核则比较少。shell 是指浏览器的外壳：例如菜单，工具栏等。主要是提供给用户界面操作，参数设置等等。它是调用内核来实现各种功能的。内核才是浏览器的核心。内核是基于标记语言显示内容的程序或模块。也有一些浏览器并不区分外壳和内核。从 Mozilla 将 Gecko 独立出来后，才有了外壳和内核的明确划分。
## 介绍一下你对浏览器内核的理解？
主要分成两部分：渲染引擎和 JS 引擎。
渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。
JS 引擎：解析和执行 javascript 来实现网页的动态效果。
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。
## 浏览器的渲染原理简介
（1）浏览器会解析三个东西：
- 一个是HTML/SVG/XHTML，事实上，Webkit有三个C++的类对应这三类文档。解析这三种文件会产生一个DOM Tree。
- CSS，解析CSS会产生CSS规则树
- Javascript，脚本，主要是通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree.
（2）解析完成后，浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。注意：
Rendering Tree 渲染树并不等同于DOM树，因为一些像Header或display:none的东西就没必要放在渲染树中了。
CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element。也就是DOM结点。也就是所谓的Frame。
然后，计算每个Frame（也就是每个Element）的位置，这又叫layout和reflow过程。
（3）最后通过调用操作系统Native GUI的API绘制。
### Dom解析：猜测是通过BFS将HTML转化为特定的C++对象。
### CSS解析：
建立CSS Rule Tree是需要比照着DOM Tree来的。CSS匹配DOM Tree主要是从右到左解析CSS的Selector
### 渲染：
- 计算CSS样式
- 构建Render Tree
- Layout – 定位坐标和大小，是否换行，各种position, overflow, z-index属性 ……
- 正式开画
JS动态修改DOM属性或CSS属性对导致重新layout，可能导致Repaint和Reflow。
Reflow的成本比Repaint的成本高得多的多。DOM Tree里的每个结点都会有reflow方法，一个结点的reflow很有可能导致子结点，甚至父点以及同级结点的reflow。在一些高性能的电脑上也许还没什么，但是如果reflow发生在手机上，那么这个过程是非常痛苦和耗电的。
般来说，浏览器会把这样的操作积攒一批，然后做一次reflow，这又叫异步reflow或增量异步reflow。但是有些情况浏览器是不会这么做的，比如：resize窗口，改变了页面默认的字体，等。对于这些操作，浏览器会马上进行reflow。
#### 减少reflow/repaint
- 不要一条一条地修改DOM的样式。与其这样，还不如预先定义好css的class，然后修改DOM的className。
- 把DOM离线后修改。
- 不要把DOM结点的属性值放在一个循环里当成循环里的变量。
- 尽可能的修改层级比较低的DOM。
- 为动画的HTML元件使用fixed或absoult的position。
- 千万不要使用table布局。
## 渲染过程中遇到 JS 文件怎么处理？（浏览器解析过程）
JavaScript 的加载、解析与执行会阻塞文档的解析，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么
它会暂停文档的解析，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复继续解析文档。
也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性。
## async 和 defer 的作用是什么？有什么区别？（浏览器解析过程）
（1）脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。
（2）defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。
（3）async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执 行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。
##  什么是文档的预解析？（浏览器解析过程）
Webkit 和 Firefox 都做了这个优化，当执行 JavaScript 脚本时，另一个线程解析剩下的文档，并加载后面需要通过网络加
载的资源。这种方式可以使资源并行加载从而使整体速度更快。需要注意的是，预解析并不改变 DOM 树，它将这个工作留给主解析过程，自己只解析外部资源的引用，比如外部脚本、样式表及图片。
## 渲染页面时常见哪些不良现象？（浏览器渲染过程）
FOUC：主要指的是样式闪烁的问题，由于浏览器渲染机制（比如firefox），在 CSS 加载之前，先呈现了 HTML，就会导致展示
出无样式内容，然后样式突然呈现的现象。会出现这个问题的原因主要是 css 加载时间过长，或者 css 被放在了文档底部。
白屏：有些浏览器渲染机制（比如chrome）要先构建 DOM 树和 CSSOM 树，构建完成后再进行渲染，如果 CSS 部分放在 HTML尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本的加载会阻塞后面
文档内容的解析，从而页面迟迟未渲染出来，出现白屏问题。
## 什么是重绘和回流？（浏览器绘制过程）
重绘: 当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。
回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。
常见引起回流属性和方法：
任何会改变元素几何信息（元素的位置和尺寸大小）的操作，都会触发回流。
（1）添加或者删除可见的 DOM 元素；
（2）元素尺寸改变——边距、填充、边框、宽度和高度
（3）内容变化，比如用户在 input 框中输入文字
（4）浏览器窗口尺寸改变——resize事件发生时
（5）计算 offsetWidth 和 offsetHeight 属性
（6）设置 style 属性的值
（7）当你修改网页的默认字体时。
回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。
## 操作DOM慢
一些 DOM 的操作或者属性访问可能会引起页面的回流和重绘，从而引起性能上的消耗。
##  DOMContentLoaded 事件和 Load 事件的区别？
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和
子框架的加载完成。
Load 事件是当所有资源加载完成后触发的。
##  HTML5 有哪些新特性、移除了那些元素？
HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
新增的有：
绘画 canvas;
用于媒介回放的 video 和 audio 元素;
本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
sessionStorage 的数据在浏览器关闭后自动删除;
语意化更好的内容元素，比如 article、footer、header、nav、section;
表单控件，calendar、date、time、email、url、search;
新的技术 webworker, websocket;
新的文档属性 document.visibilityState
移除的元素有：
纯表现的元素：basefont，big，center，font, s，strike，tt，u;
对可用性产生负面影响的元素：frame，frameset，noframes；
## 如何处理 HTML5 新标签的浏览器兼容问题？
（1） IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器
        支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式。

（2） 当然也可以直接使用成熟的框架，比如 html5shim ;
 ```html
 <!--[if lt IE 9]>
   <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
  <![endif]-->`
[if lte IE 9]……[endif] 判断 IE 的版本，限定只有 IE9 以下浏览器版本需要执行的语句。
```
## 简述一下你对 HTML 语义化的理解？
有利于搜索引擎的SEO。
更加适配特殊人群。
语义化更有利于发挥HTML能力。summary标签实现手风琴效果。
将网站分块，更有利于阅读维护理解。
##  b 与 strong 的区别和 i 与 em 的区别？
从页面显示效果来看，被 b 和 strong 包围的文字将会被加粗，而被 i 和 em 包围的文字将以斜体的形式呈现。

但是 b 和i 是自然样式标签，分别表示无意义的加粗，无意义的斜体，表现样式为 { font-weight: bolder}，仅仅表示「这
里应该用粗体显示」或者「这里应该用斜体显示」，此两个标签在 HTML4.01 中并不被推荐使用。
 而 em 和 strong 是语义样式标签。 em表示一般的强调文本，而 strong 表示比 em 语义更强的强调文本。
使用阅读设备阅读网页时：strong 会重读，而 b 是展示强调内容。
## 前端需要注意哪些 SEO ？
（1）合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。
（2）语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页。
（3）重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容肯定被 抓取。（4）重要内容不要用 js 输出：爬虫不会执行 js 获取内容
（5）少用 iframe：搜索引擎不会抓取 iframe 中的内容
（6）非装饰性图片必须加 alt
（7）提高网站速度：网站速度是搜索引擎排序的一个重要指标
 (8) react的SPA需要服务端渲染才能更好的爬虫爬取。
## HTML5 的离线储存（已经废除了AppCache），现在改由service worker支持
## 常见的浏览器端的存储技术有哪些？
浏览器常见的存储技术有 cookie、localStorage 和 sessionStorage。
还有两种存储技术用于大规模数据存储，webSQL（已被废除）和 indexDB。
 IE 支持 userData 存储数据，但是基本很少使用到，除非有很强的浏览器兼容需求
## 描述cookies，sessionStorage和localStorage的区别？
- cookie 数据大小不能超过4K，生存时间由expiress属性指定，并且cookie只能被同源的页面访问共享。
- sessionStorage是html5提供的一种浏览器本地存储的方法，它借鉴了服务器端session的概念。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源
页面所访问共享。
- localStorage也是html5提供一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage 
不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage
## iframe有哪些缺点
iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。
主要缺点有：
（1） iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
（2） 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
（3） iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
（4） 浏览器的后退按钮失效。
（5） 小型的移动设备无法完全显示框架。
## Label 的作用是什么？是怎么用的？
label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。
```html
<label for="Name">Number:</label>
<input type=“text“ name="Name" id="Name"/>
```
## 如何实现浏览器内多个标签页之间的通信?
实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此我们可以找一个中介者，
让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。

第一种实现的方式是使用 websocket 协议，因为 websocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。
标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。

第二种是使用 ShareWorker 的方式，shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。

第三种方式是使用 localStorage 的方式，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。
还有一种方式是使用 postMessage 方法，如果我们能够获得对应标签页的引用，我们就可以使用 postMessage 方法，进行通信。
## webSocket 如何兼容低版本浏览器？
Adobe Flash Socket 、
ActiveX HTMLFile (IE) 、
基于 multipart 编码发送 XHR 、
基于长轮询的 XHR
## 页面可见性（Page Visibility API） 可以有哪些用途？
这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户
不看网页，下面这些网页行为都是可以暂停的。

（1）对服务器的轮询
（2）网页动画
（3）正在播放的音频或视频
自己使用中用此个API来组织轮播图在不可见的标签页中暂停轮播。
## 实现不使用 border 画出 1 px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。
```html
<div style="height:1px;overflow:hidden;background:red"><div>
```
## 带group的标签
hgroup，colgroup，optgroup
## <img> 的 title 和 alt 有什么区别？
title 通常当鼠标滑动到元素上的时候显示
alt 是 <img> 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装
饰图片外都必须设置有意义的值，搜索引擎会重点分析
## Canvas 和 SVG 有什么区别？
Canvas 是一种通过 JavaScript 来绘制 2D 图形的方法。Canvas 是逐像素来进行渲染的，因此当我们对 Canvas 进行缩放时，会出现锯齿或者失真的情况。
    
SVG 是一种使用 XML 描述 2D 图形的语言。SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。我们可以为某个元素附加 JavaScript 事件监听函数。并且 SVG 保存的是图形的绘制方法，因此当 SVG 图形缩放时并不会失真。
使用requestAnimationFrame，不停的重绘canvas可实现动画。
## 渐进增强和优雅降级的定义
 渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。自下而上。
优雅降级：一开始就根据高版本浏览器构建完整的功能，然后再针对低版本浏览器进行兼容。自上而下。
## IE 各版本和 Chrome 可以并行下载多少个资源？
（1）  IE6 2 个并发
（2）  iE7 升级之后的 6 个并发，之后版本也是 6 个
（3）  Firefox，chrome 也是6个
## 常用的 meta 标签
```html
<!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
    <head lang=”en”> 标准的 lang 属性写法
    <meta charset=’utf-8′>    声明文档使用的字符编码
    <meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
    <meta name=”description” content=”不超过150个字符”/>       页面描述
    <meta name=”keywords” content=””/>      页面关键词者
    <meta name=”author” content=”name, email@gmail.com”/>    网页作
    <meta name=”robots” content=”index,follow”/>      搜索引擎抓取
    <meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
    <meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
    <meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
    是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
    <meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
    添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
    <meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
    <meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
    <meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
    <meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
    <meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
    <meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
    <meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
    <meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
    <meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
    <meta name=”full-screen” content=”yes”>              UC强制全屏
    <meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
    <meta name=”browsermode” content=”application”>   UC应用模式
    <meta name=”x5-page-mode” content=”app”>    QQ应用模式
    <meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
    设置页面不缓存
    <meta http-equiv=”pragma” content=”no-cache”>
    <meta http-equiv=”cache-control” content=”no-cache”>
    <meta http-equiv=”expires” content=”0″>
  ```
##  css reset 和 normalize.css 有什么区别？
为什么会有 CSS Reset 的存在呢？那是因为早期的浏览器支持和理解的 CSS 规范不同，导致渲染页面时效果不一致，会出现很多兼容性问题。

reset 的目的，是将所有的浏览器的自带样式重置掉，这样更易于保持各浏览器渲染的一致性。

normalize 的理念则是尽量保留浏览器的默认样式，不进行太多的重置，而尽力让这些样式保持一致并尽可能与现代标准相符合。


1.Normalize.css 保护了有价值的默认值

Reset 通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。 相比之下，Normalize.css 保持了许多默认的浏
览器样式。 这就意味着你不用再为所有公共的排版元素重新设置样式。 当一个元素在不同的浏览器中有不同的默认值时，Normali
ze.css 会力求让这些样式保持一致并尽可能与现代标准相符合。


2.Normalize.css 修复了浏览器的 bug

它修复了常见的桌面端和移动端浏览器的 bug。这往往超出了 Reset 所能做到的范畴。关于这一点，Normalize.css 修复的问题
包含了 HTML5 元素的显示设置、预格式化文字的 font-size 问题、在 IE9 中 SVG 的溢出、许多出现在各浏览器和操作系统中
的与表单相关的 bug。


3.Normalize.css 没有复杂的继承链

使用 Reset 最让人困扰的地方莫过于在浏览器调试工具中大段大段的继承链。在 Normalize.css 中就不会有这样的问题，因为在
我们的准则中对多选择器的使用时非常谨慎的，我们仅会有目的地对目标元素设置样式。


4.Normalize.css 是模块化的

这个项目已经被拆分为多个相关却又独立的部分，这使得你能够很容易也很清楚地知道哪些元素被设置了特定的值。因此这能让你自己
选择性地移除掉某些永远不会用到部分（比如表单的一般化）。


5.Normalize.css 拥有详细的文档

Normalize.css 的代码基于详细而全面的跨浏览器研究与测试。这个文件中拥有详细的代码说明并在 Github Wiki 中有进一步的
说明。这意味着你可以找到每一行代码具体完成了什么工作、为什么要写这句代码、浏览器之间的差异，并且你可以更容易地进行自己
的测试。
css reset 是最早的一种解决浏览器间样式不兼容问题的方案，它的基本思想是将浏览器的所有样式都重置掉，从而达到所有浏览器样式保持一致的效果。但是使用这种方法，可能会带来一些性能上的问题，并且对于一些元素的不必要的样式的重置，其实反而会造成画蛇添足的效果。
后面出现一种更好的解决浏览器间样式不兼容的方法，就是 normalize.css ，它的思想是尽量的保留浏览器自带的样式，通过在原
有的样式的基础上进行调整，来保持各个浏览器间的样式表现一致。相对与 css reset，normalize.css 的方法保留了有价值的默
认值，并且修复了一些浏览器的 bug，而且使用 normalize.css 不会造成元素复杂的继承链。
##  用于预格式化文本的标签是
预格式化就是保留文字在源码中的格式 最后显示出来样式与源码中的样式一致 所见即所得。
pre 定义预格式文本，保持文本原有的格式.
## DHTML 是什么？
DHTML 将 HTML、JavaScript、DOM 以及 CSS 组合在一起，用于创造动态性更强的网页。通过 JavaScript 和 HTML DOM，能够动态地改变 HTML 元素的样式。
DHTML 实现了网页从 Web 服务器下载后无需再经过服务的处理，而在浏览器中直接动态地更新网页的内容、排版样式和动画的功
能。例如，当鼠标指针移到文章段落中时，段落能够变成蓝色，或者当鼠标指针移到一个超级链接上时，会自动生成一个下拉式子链
接目录等。

包括：
（1）动态内容（Dynamic Content）：动态地更新网页内容，可“动态”地插入、修改或删除网页的元件，如文字、图像、标记等。

（2）动态排版样式（Dynamic Style Sheets）：W3C 的 CSS 样式表提供了设定 HTML 标记的字体大小、字形、样式、粗细、
文字颜色、行高度、加底线或加中间横线、缩排、与边缘距离、靠左右或置中、背景图片或颜色等排版功能，而“动态排版样
式”即可以“动态”地改变排版样式。
## head 标签中必不少的是？
head 标签用于定义文档的头部，它是所有头部元素的容器。head>中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。
文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数
据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：base, link, meta, script, style, 以及 title。

title 定义文档的标题，它是 head 部分中唯一必需的元素。
## html5中浏览器存在获得用户实际地理位置的API
```js
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options)
```
## HTML5 新增的表单元素有？
datalist 规定输入域的选项列表，通过 option 创建！ 

output 元素用于不同类型的输出！
HTML output 标签表示计算或用户操作的结果。
### disabled 和 readonly 的区别？
disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。
     
readonly 规定输入字段为只读。input 内容会随着表单提交。

无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value。

### 纯html进行表单检验
验证属性: required
元素: textarea, select, input (text, password, checkbox, radio, file, datetime,datetime-local, date, month, time, week, number, email, url, search, 和 tel 类型)
验证属性: min, max
元素: input (datetime, datetime-local, date, month, time, week, number, 和 range 类型)
验证属性: pattern
元素: input (text, password, email, url, search, 和 tel 类型)