## 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？
（1）有两种盒子模型： IE 盒模型（border-box）、W3C 标准盒模型（content-box）
（2）盒模型：分为 内容（content）、填充（padding）、边界（margin）、 边框（border） 四个部分

IE 盒模型和 W3C 标准盒模型的区别：

（1）W3C 标准盒模型： 属性 width ，height 只包含内容 content ，不包含 border 和 padding 
（2）IE 盒模型： 属性 width ，height 包含 content、border 和 padding ，指的是 content + padding + border。

在 ie8+ 浏览器中使用哪个盒模型可以由 box-sizing （ CSS 新增的属性）控制，默认值为 content-box ，即标准盒模型；
如果将 box-sizing 设为 border-box 则用的是 IE 盒模型。如果在 ie6，7，8 中 DOCTYPE 缺失会将盒子模型解释为 IE
盒子模型。若在页面中声明了 DOCTYPE 类型，所有的浏览器都会把盒模型解释为 W3C 盒模型。
## CSS选择符有哪些？
（1）id 选择器（ #myid）
（2）类选择器（.myclassname）
（3）标签选择器（div, h1, p）
（4）后代选择器（h1 p）
（5）相邻后代选择器（子）选择器（ul > li）
（6）兄弟选择器（li ~ a）
（7）相邻兄弟选择器（li + a）
（8）属性选择器（a[rel = "external"]）
（9）伪类选择器（a:hover, li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（ * ）
##  ::before 和 :after 中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。
单冒号（:）用于 CSS3 伪类，双冒号（::）用于 CSS3 伪元素。（伪元素由双冒号和伪元素名称组成）
双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，
比如 :first-line、:first-letter、:before、:after 等，
而新的在 CSS3 中引入的伪元素则不允许再支持旧的单冒号的写法。

想让插入的内容出现在其它内容前，使用 ::before，否者，使用 ::after；
在代码顺序上，::after 生成的内容也比 ::before 生成的内容靠后。
如果按堆栈视角，::after 生成的内容会在 ::before 生成的内容之上。
## 伪类与伪元素的区别
css 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句
话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过 :hover 来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过 ::be
fore 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号 （::） 而不是一个冒号（:）。 这是 CSS3 的一部分，并尝试区分伪类和伪元素。大多数浏览
器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的 W3C 规范并未对此进行
特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。
## CSS 中哪些属性可以继承？
每个 CSS 属性定义的概述都指出了这个属性是默认继承的，还是默认不继承的。这决定了当你没有为元素的属性指定值时该如何计算
值。

当元素的一个继承属性没有指定值时，则取父元素的同属性的计算值。只有文档根元素取该属性的概述中给定的初始值（这里的意思应
该是在该属性本身的定义中的默认值）。

当元素的一个非继承属性（在 Mozilla code 里有时称之为 reset property ）没有指定值时，则取属性的初始值 initial v
alue（该值在该属性的概述里被指定）。

有继承性的属性：

（1）字体系列属性
    font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust

（2）文本系列属性
    text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、
    text-transform、direction、color

（3）表格布局属性
    caption-side border-collapse empty-cells

（4）列表属性
    list-style-type、list-style-image、list-style-position、list-style

（5）光标属性
    cursor

（6）元素可见性
    visibility

（7）还有一些不常用的；speak，page，设置嵌套引用的引号类型 quotes 等属性


注意：当一个属性不是继承属性时，可以使用 inherit 关键字指定一个属性应从父元素继承它的值，inherit 关键字用于显式地
指定继承性，可用于任何继承性/非继承性属性。
## CSS 优先级算法如何计算？
判断优先级时，首先我们会判断一条属性声明是否有权重，也就是是否在声明后面加上了 !important。一条声明如果加上了权重，
那么它的优先级就是最高的，前提是它之后不再出现相同权重的声明。如果权重相同，我们则需要去比较匹配规则的特殊性。

一条匹配规则一般由多个选择器组成，一条规则的特殊性由组成它的选择器的特殊性累加而成。选择器的特殊性可以分为四个等级，
第一个等级是行内样式，为1000，第二个等级是 id 选择器，为0100，第三个等级是类选择器、伪类选择器和属性选择器，为0010，
第四个等级是元素选择器和伪元素选择器，为0001。规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等
级的叠加，不会产生进位。选择器特殊性值的比较是从左向右排序的，也就是说以1开头的特殊性值比所有以0开头的特殊性值要大。
比如说特殊性值为1000的的规则优先级就要比特殊性值为0999的规则高。如果两个规则的特殊性值相等的时候，那么就会根据它们引
入的顺序，后出现的规则的优先级最高。
## 关于伪类 LVHA 的解释?
a 标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类:link、:visited、:hover、:active；
当链接未访问过时：

（1）当鼠标滑过 a 链接时，满足 :link 和 :hover 两种状态，要改变 a 标签的颜色，就必须将 :hover 伪类在 :link 伪
  类后面声明；
（2）当鼠标点击激活 a 链接时，同时满足 :link、:hover、:active 三种状态，要显示 a 标签激活时的样式（:active），
  必须将 :active 声明放到 :link 和 :hover 之后。因此得出 LVHA 这个顺序。

当链接访问过时，情况基本同上，只不过需要将 :link 换成 :visited。

这个顺序能不能变？可以，但也只有:link 和 :visited 可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，
也就不存在覆盖的问题。
## CSS3 新增伪类有那些？
（1）elem:nth-child(n)        选中父元素下的第 n 个子元素，并且这个子元素的标签名为 elem ， n 可以接受具体的数值，也可以接受函数。

（2）elem:nth-last-child(n)   作用同上，不过是从后开始查找。

（3）elem:last-child          选中最后一个子元素。

（4）elem:only-child          如果 elem 是父元素下唯一的子元素，则选中之。

（5）elem:nth-of-type(n)      选中父元素下第 n 个 elem 类型元素，n 可以接受具体的数值，也可以接受函数。

（6）elem:first-of-type       选中父元素下第一个 elem 类型元素。

（7）elem:last-of-type        选中父元素下最后一个 elem 类型元素。

（8）elem:only-of-type        如果父元素下的子元素只有一个 elem 类型元素，则选中该元素。

（9）elem:empty               选中不包含子元素和内容的 elem 类型元素。

（10）elem:target             选择当前活动的 elem 元素。

（11）:not(elem)              选择非 elem 元素的每个元素。

（12）:enabled                  控制表单控件的禁用状态。   

（13）:disabled                   控制表单控件的禁用状态。

(14) :checked               单选框或复选框被选中。

## 如何居中 div ？
一般常见的几种居中的方法有：

对于宽高固定的元素

（1）我们可以利用 margin:0 auto 来实现元素的水平居中。

（2）利用绝对定位，设置四个方向的值都为0，并将 margin 设置为 auto ，由于宽高固定，因此对应方向实现平分，可以实现水
    平和垂直方向上的居中。

（3）利用绝对定位，先将元素的左上角通过 top: 50% 和 left: 50% 定位到页面的中心，然后再通过 margin 负值来调整元素
    的中心点到页面的中心。

（4）利用绝对定位，先将元素的左上角通过 top: 50% 和 left: 50% 定位到页面的中心，然后再通过 translate 来调整元素
    的中心点到页面的中心。

（5）使用 flex 布局，通过 align-items: center 和 justify-content: center 设置容器的垂直和水平方向上为居中对
    齐，然后它的子元素也可以实现垂直和水平的居中。

对于宽高不定的元素，上面的后面两种方法，可以实现元素的垂直和水平的居中。对于行内元素， text-align: center; line-height: height;就可以居中了。
##  display 有哪些值？说明他们的作用。
block           块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none            元素不显示，并从文档流中移除。
inline          行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
list-item       像块类型元素一样显示，并添加样式列表标记。
table           此元素会作为块级表格来显示。
inherit         规定应该从父元素继承 display 属性的值。
##  position 的值 relative 和 absolute 定位原点是？
absolute
生成绝对定位的元素，相对于值不为 static 的第一个父元素的 padding box 进行定位，也可以理解为离自己这一级元素最近的
一级 position 设置为 absolute 或者 relative 的父元素的 padding box 的左上角为原点的。

fixed （老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。

relative
生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

static
默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right, z-index 声明）。

inherit
规定从父元素继承 position 属性的值。

sticky
单词sticky的中文意思是“粘性的”，position:sticky表现也符合这个粘性的表现。基本上，可以看出是position:relative和position:fixed的结合体——当元素在屏幕内，表现为relative，就要滚出显示器屏幕的时候，表现为fixed
## 请解释一下 CSS3 的 Flexbox（弹性盒布局模型），以及适用场景？
 Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。行内元素也可以使用 Flex 布局。注意，设为 Flex 布局以后，子元素的 float、cl
ear 和 vertical-align 属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex
项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。


以下 6 个属性设置在容器上。

flex-direction 属性决定主轴的方向（即项目的排列方向）。

flex-wrap 属性定义，如果一条轴线排不下，如何换行。

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

justify-content 属性定义了项目在主轴上的对齐方式。

align-items 属性定义项目在交叉轴上如何对齐。

align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


以下6个属性设置在项目上。

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认
值为 auto，即项目的本来大小。

flex 属性是 flex-grow， flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto ，表示继承父
元素的 align-items 属性，如果没有父元素，则等同于 stretch。
##  用纯 CSS 创建一个三角形的原理是什么？
采用的是相邻边框连续处均分原理
将元素的宽高设为0，只设置 border ，把任意三条边隐藏掉（颜色设为 transparent），剩下的就是一个三角形。
```css
#demo {
      width: 0;
      height: 0;
      border-width: 20px;
      border-style: solid;
      border-color: transparent transparent red transparent;
    }
  ```
##  一个满屏品字布局如何设计?
简单的方式：
上面的 div 宽100%，
下面的两个 div 分别宽50%，
然后用 float 或者 inline 使其不换行即可
## CSS 多列等高如何实现？
（1）利用 padding-bottom|margin-bottom 正负值相抵，不会影响页面布局的特点。设置父容器设置超出隐藏（overflow:
hidden），这样父容器的高度就还是它里面的列没有设定 padding-bottom 时的高度，当它里面的任一列高度增加了，则
父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的 padding-bottom 补偿这部分高度差。

（2）利用 table-cell 所有单元格高度都相等的特性，来实现多列等高。

（3）利用 flex 布局中项目 align-items 属性默认为 stretch，如果项目未设置高度或设为 auto，将占满整个容器的高度
的特性，来实现多列等高。
## 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧 ？
(1） png24 位的图片在 iE6 浏览器上出现背景
         解决方案：做成 PNG8 ，也可以引用一段脚本处理。

（2） 浏览器默认的 margin 和 padding 不同
      解决方案：加一个全局的 *{ margin:0; padding:0;} 来统一。

（3） IE6 双边距 bug ：在 IE6 下，如果对元素设置了浮动，同时又设置了 margin-left 或      
      margin-right，margin 值会加倍。
  
      ```css
      #box{ float:left; width:10px; margin:0 0 0 10px;} 
      ```
这种情况之下 IE 会产生20 px 的距离
解决方案：在 float 的标签样式控制中加入 _display:inline; 将其转化为行内属性。( _ 这个符号只有 ie6 会识别)

（4） 渐进识别的方式，从总体中逐渐排除局部。
      首先，巧妙的使用"\9"这一标记，将 IE 游览器从所有情况中分离出来。 
      接着，再次使用 "+" 将 IE8 和 IE7 、IE6 分离开来，这样 IE8 已经独立识别。

  ```css
  .bb{
      background-color:#f1ee18;      /*所有识别*/
      .background-color:#00deff\9;   /*IE6、7、8识别*/
      +background-color:#a200ff;     /*IE6、7识别*/
      _background-color:#1e0bd1;     /*IE6识别*/ 
  } 
   ```

（5） IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用 getAttribute() 获取自定义
      属性；Firefox下，只能使用 getAttribute() 获取自定义属性
      解决方法：统一通过 getAttribute() 获取自定义属性。

（6） IE下，event 对象有 x、y 属性，但是没有 pageX、pageY 属性; Firefox下，event 对象有 
      pageX、pageY 属性，但是没有 x、y 属性。
      解决方法：（条件注释）缺点是在 IE 浏览器下可能会增加额外的 HTTP 请求数。

（7） Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示
      解决方法：
      
  1. 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。但是，在 chrome
    更新到27版本之后就不可以用了。

  2. 还可以使用 -webkit-transform: scale(0.5);注意-webkit-transform: scale(0.75); 
    收缩的是整个 span 的大小，这时候，必须要将 span 转换成块元素，可以使用 display：block/inline-block/...；

（8） 超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不再具有 hover 和 active 了
      解决方法：改变 CSS 属性的排列顺序 L-V-H-A

（9） 怪异模式问题：漏写 DTD 声明，Firefox 仍然会按照标准模式来解析网页，但在 IE 中会触发怪异模
      式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写 DTD 声明的好习惯。
## li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
浏览器会把 inline 元素间的空白字符（空格、换行、Tab 等）渲染成一个空格。而为了美观。我们通常是一个 <li> 放在一行，
这导致 li 换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决办法：

（1）为 li 设置 float: left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。

（2）将所有 li 写在同一行。不足：代码不美观。

（3）将 ul 内的字符尺寸直接设为0，即 font-size: 0。不足：ul 中的其他字符尺寸也被设为0，需要额外重新设定其他
    字符尺寸，且在 Safari 浏览器依然会出现空白间隔。

（4）消除 ul 的字符间隔 letter-spacing: -8px，不足：这也设置了 li 内的字符间隔，因此需要将 li 内的字符
    间隔设为默认 letter-spacing: normal。
## 为什么要初始化 CSS 样式？
 - 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

- 当然，初始化样式会对 SEO 有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化 
```css
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend
, button, input, textarea, th, td { margin:0; padding:0; }
    body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
    h1, h2, h3, h4, h5, h6{ font-size:100%; }
    address, cite, dfn, em, var { font-style:normal; }
    code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
    small{ font-size:12px; }
    ul, ol { list-style:none; }
    a { text-decoration:none; }
    a:hover { text-decoration:underline; }
    sup { vertical-align:text-top; }
    sub{ vertical-align:text-bottom; }
    legend { color:#000; }
    fieldset, img { border:0; }
    button, input, select, textarea { font-size:100%; }
    table { border-collapse:collapse; border-spacing:0; }
```
## 什么是包含块，对于包含块的理解?
包含块（containing block）就是元素用来计算和定位的一个框。

（1）根元素（很多场景下可以看成是 < html> ）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。

（2）对于其他元素，如果该元素的 position 是 relative 或者 static，则“包含块”由其最近的块容器祖先盒的 content box
    边界形成。

（3）如果元素 position:fixed，则“包含块”是“初始包含块”。

（4）如果元素 position:absolute，则“包含块”由最近的 position 不为 static的祖先元素建立，具体方式如下：

  如果该祖先元素是纯 inline 元素，则规则略复杂：
      • 假设给内联元素的前后各生成一个宽度为 0 的内联盒子（inline box），则这两个内联盒子的 padding box 外面的包
        围盒就是内联元素的“包含块”；
      • 如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是 CSS2.1 规范并没有明确定义，浏览器自行发挥
  否则，“包含块”由该祖先的 padding box 边界形成。

  如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。
## CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下以后什么区别？
（1）对于一般的元素，它的表现跟 visibility：hidden; 是一样的。元素是不可见的，但此时仍占用页面空间。

（2）但例外的是，如果这个元素是 table 相关的元素，例如 table 行，table group，table列，table column group，它的
  表现却跟 display: none 一样，也就是说，它们占用的空间也会释放。

在不同浏览器下的区别：

在谷歌浏览器里，使用 collapse 值和使用 hidden 值没有什么区别。

在火狐浏览器、 Opera 和 IE11 里，使用 collapse 值的效果就如它的字面意思：table 的行会消失，它的下面一行会补充它的位
置。
## width:auto 和 width:100% 的区别
一般而言
    
width:100% 会使元素 box 的宽度等于父元素的 content box 的宽度。

width:auto 会使元素撑满整个父元素，margin、border、padding、content 区域会自动分配水平空间。
## 绝对定位元素与非绝对定位元素的百分比计算的区别
  绝对定位元素的宽高百分比是相对于临近的 position 不为 static 的祖先元素的 padding box 来计算的。

  非绝对定位元素的宽高百分比则是相对于父元素的 content box 来计算的。
##  对 BFC 规范（块级格式化上下文：block formatting context）的理解？
块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒
子的区域，也是浮动元素与其他元素的交互限定区域。

通俗来讲

• BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。
• 如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

创建 BFC

（1）根元素或包含根元素的元素
（2）浮动元素 float ＝ left | right 或 inherit（≠ none）
（3）绝对定位元素 position ＝ absolute 或 fixed
（4）display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
（5）overflow ＝ hidden | auto 或 scroll (≠ visible)
## 'display'、'position' 和 'float' 的相互关系？
（1）首先我们判断 display 属性是否为 none，如果为 none ，则 position 和 float 属性的值不影响元素最后的表现。
         
（2）然后判断 position 的值是否为 absolute 或者 fixed ，如果是，则 float 属性失效，并且 display的值应该被
    设置为 table 或者 block，具体转换需要看初始转换值。

（3）如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none ，如果不是，则 display 
    的值则按上面的规则转换。注意，如果 position 的值为 relative 并且 float 属性的值存在，则 relative 相对
    于浮动后的最终位置定位。
  
（4）如果 float 的值为 none ，则判断元素是否为根元素，如果是根元素则 display 属性按照上面的规则转换，如果不是，
    则保持指定的 display 属性值不变。

总的来说，可以把它看作是一个类似优先级的机制， "position:absolute" 和 "position:fixed" 优先级最高，有它存在
的时候，浮动不起作用，'display' 的值也需要调整；其次，元素的 'float' 特性的值不是 "none" 的时候或者它是根元素
的时候，调整 'display' 的值； 最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display' 特性值同设置值。
## margin 重叠问题
块级元素的上外边距（margin-top）与下外边距（margin-bottom）有时会合并为单个外边距，这样的现象称为 “margin 合
并”。

产生折叠的必备条件：margin 必须是邻接的!

而根据 w3c 规范，两个 margin 是邻接的必须满足以下条件：

  • 必须是处于常规文档流（非 float 和绝对定位）的块级盒子，并且处于同一个 BFC 当中。
  • 没有线盒，没有空隙，没有 padding 和 border 将他们分隔开
  • 都属于垂直方向上相邻的外边距，可以是下面任意一种情况
  • 元素的 margin-top 与其第一个常规文档流的子元素的 margin-top
  • 元素的 margin-bottom 与其下一个常规文档流的兄弟元素的 margin-top
  • height 为 auto 的元素的 margin-bottom 与其最后一个常规文档流的子元素的 margin-bottom
  • 高度为0并且最小高度也为0，不包含常规文档流的子元素，并且自身没有建立新的 BFC 的元素的 margin-top
    和 margin-bottom


margin 合并的3种场景：

（1）相邻兄弟元素 margin 合并。

  解决办法：
    • 设置块状格式化上下文元素（BFC）

（2）父级和第一个/最后一个子元素的 margin 合并。

解决办法：

对于 margin-top 合并，可以进行如下操作（满足一个条件即可）：
  • 父元素设置为块状格式化上下文元素；
  • 父元素设置 border-top 值；
  • 父元素设置 padding-top 值；
  • 父元素和第一个子元素之间添加内联元素进行分隔。

对于 margin-bottom 合并，可以进行如下操作（满足一个条件即可）：
  • 父元素设置为块状格式化上下文元素；
  • 父元素设置 border-bottom 值；
  • 父元素设置 padding-bottom 值；
  • 父元素和最后一个子元素之间添加内联元素进行分隔；
  • 父元素设置 height、min-height 或 max-height。

  （3）空块级元素的 margin 合并。

  解决办法：
    • 设置垂直方向的 border；
    • 设置垂直方向的 padding；
    • 里面添加内联元素（直接 Space 键空格是没用的）；
    • 设置 height 或者 min-height。