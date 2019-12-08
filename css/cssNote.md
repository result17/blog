```
img是行内元素直接使用 img {
    vertical-align: middle;
}。此属性只对行内元素有效，对块级元素无效。
```
```
css实现三种竖排文字方法
```
```css
.text{
    writing-mode: vertical-lr;
    direction: rtl;
}
.text{
    writing-mode: vertical-lr;
    direction: rtl;
}
.text{
    transform:rotate(90deg);
}
```
```
cursor: not-allowed（禁止） / pointer（手指） text move
```
```
overflow要想使用，必须给父元素指定高度。
```
```
none 默认值。允许浮动元素出现在两侧。
left 在左侧不允许浮动元素。
right 在右侧不允许浮动元素。
both 在左右两侧均不允许浮动元素。
inherit 从父元素继承 clear 属性的值。
```
```
a标签的执行顺序
:link
未访问链接

:visited
已访问的链接

:hover
鼠标悬停

:active
鼠标按下

可交互式的组件还有一个

:focus
选中状态（鼠标点击、TAB键）
```
```
爱恨原则
LoVe HAte
```
```
利用flex布局，flex-direction:column 定义排列方向为竖排
header footer 定高，中间部分flex:1; 一样可以实现
需要注意的是body和container容器需要设置高度100%;
```
```
flex布局复习

语法
示例
规范
浏览器兼容性
参见
CSS属性 flex 规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间。这是一个简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。
flex-basis 指定了 flex 元素在主轴方向上的初始大小。
flex-direction row row-reverse column column-reverse
flex-flow 属性是 flex-direction 和 flex-wrap 的简写。
flex-grow 属性定义弹性盒子项（flex item）的拉伸因子
flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。
```
```
对于行内元素来说，设置竖直marign是无效的，但可以设置水平margin。 margin-left和margin-right.
```
```
单行居中 多行居左实现
```
```html
<h2>
  <p>
  context here
  </p>
 </h2>
```
```css
h2 {
 text-align: center;
}
p {
  display: inline-block;
  text-align: left;
}
```