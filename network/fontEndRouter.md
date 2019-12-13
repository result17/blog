## 前端路由
react-router, vue-router等前端路由实现原理大同小异。它们的作用是为了实现无刷新的条件下切换显示不同页面。路由本质就是在不刷新的情况下，当页面的URL发生改变时，页面的显示结果根据URL的变化而变化。
## hash router
hash路由最大特点时地址栏会出现#。或许你觉得眼熟，a标签可以实现页面内跳转吗？
```html
<p id="data"></p>
<a href="#data"></a>
```
当你点击此a标签时，页面自动跳转到p标签所在的位置。
顺带一提，在HTML5的特性支持下，返回顶部的按钮通过一个简单的a标签就可以实现（但没有过渡动画，用户体验不好，一般是使用JS根据赛贝尔曲线的特性设计出缓动函数来实现）
```html
<a href="#top"></a>
<!-- or -->
<a href="#"></a>
```
这和前端路由有关系吗？有关系啊
由上可知，我们改变url的hash属性是不会刷新页面，这不正适合用来适合吗？
除了通过a标签修改，我们还可以通过