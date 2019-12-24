## 前端路由
react-router, vue-router等前端路由实现原理大同小异。它们的作用是为了实现无刷新的条件下切换显示不同页面。路由本质就是在不刷新的情况下，当页面的URL发生改变时，页面的显示结果根据URL的变化而变化。
## hash router
hash路由最大特点时地址栏会出现#。或许你觉得眼熟，a标签可以实现页面内跳转吗？
```html
<p id="data"></p>
<!-- a标签的name属性也可以跳转 -->
<a name="print"></a>
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
除了通过a标签修改，我们还可以通过window.location对象进行修改
```js
window.location.hash = 'edit'
```
浏览器也提供了相关事件，让开发者知道hash的变化
```js
window.onhashchange = function(event) {
  console.log(event)
}
window.addEventListener('hashchange', (event) => {
  console.log(event)
})
```
关于浏览器#的特性，阮一峰老师有一篇[文章](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)总结的很好，以下为它的总结
- HTTP请求不包括#
```
　http://www.example.com/index.html#print
```
```
GET /index.html HTTP/1.1

Host: www.example.com
```
所以要想服务器正确解析，自然要使用enCodeURIComponet()
- 改变#会改变浏览器的访问历史
每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。
但在IE 6和7不会
- 不利于SEO
通常搜索引擎爬虫只会爬取http协议中的内容，但hash路由并不属于。所以，不利于seo。
google提出捉取#!，会自动将其后面的内容转化伪查询字符串_escaped_fragment_的值
如google发现网站为
```
http://twitter.com/#!/username
```
会变为捉取
```
http://twitter.com/_escaped_fragment_/username
```
## History路由
window.history是一个只读属性，用来获取History对象的引用，History 对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口。
在介绍History路由前，我们先了解一下History对象的用法吧
history中跳转
有三种方法back(),forward()和go()
```js
// 后退按钮
window.history.back()
```
```js
// 前进按钮
window.history.forward()
```
更为通用的方法为
```js
// 相当于back()
window.history.go(-1)

// 相当于forward()
window.history.forward()
```
对于history堆栈里的历史记录，html5新增了两个方法用来修改和添加
- pushState()
pushState() 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL。
状态对象 — 状态对象state是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。（对象不大于640k）
标题 — 目前被忽略，可传空字符串。
URL — 该参数定义了新的历史URL记录。注意，调用 pushState() 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 pushState() 会抛出一个异常。该参数是可选的，缺省为当前URL。

- replaceState() 方法
history.replaceState() 的使用与 history.pushState() 非常相似，区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个。 注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。
也就是pushState()会使得window.history.length + 1，而replaceState不改变 

- popstate 事件
 每当活动的历史记录项发生变化时， popstate 事件都会被传递给window对象。如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝。
 需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）
 ## 简单BrowserRouter使用
 - <BrowserRouter>
 使用此组件包裹你的App组件，然后通过HTML5 history API来异步渲染UI。
 basename属性
 如果你的app是服务以子目录subDir
 可以设置
 ```js
 <BrowserRouter basename="subDir">
 ```
 此时http://localhost:3000 和 http://localhost:3000/subDir 渲染相同内容。
 getUserConfirmation
 跟BOM的window.confim一样，会在页面跳出对话框，可以选择是否，返回值为boolean
 可以用来确认用户是否允许跳转
 ```js
 <BrowserRouter
  getUserConfirmation={(message, callback) => {
    // this is the default behavior
    const allowTransition = window.confirm(message);
    callback(allowTransition);
  }}
/>
```
forceRefresh: bool 默认为false，表示改变路由的时候页面不会重新刷新，如果当前浏览器不支持history，那么当forceRefresh设置为true的时候，此时每次去改变url都会重新刷新整个页面。

keyLength: number 表示location的key属性的长度，在react-router中每个url下都有为一个location与其对应，并且每一个url的location的key值都不相同，这个属性一般都使用默认值，设置的意义不大。
(应该是BrowserRouter的state属性上的key， 默认为6位)

children: node children的属性必须是一个ReactNode节点，表示唯一渲染一个元素。
（React中的children属性，16开始有新语法Fragments）

- <Route>
Route是react router中最重要的组件，功能是匹配相应的location中的地址
当url改变后
Route组件会将url跟path属性进行匹配，当path相同，就会渲染对应的component
当设置exact时，只有url跟Route的path完全匹配才会渲染对应的组件
```js
<Route exact path="/one">
  <About />
</Route>
```
URL为/one才会匹配，当URL为/one/two不会匹配
- strict 严格限制谢贤
```js
<Route  path='/home/' component={Home}/> 
```
此时只有http://localhost:3000/home/ 才能匹配， http://localhost:3000/home 不能匹配
- sensitive url大小敏感
component 当URL匹配成功渲染对应的组件
- render 属性接受一个函数，此函数返回值为React Element或者原生Element
(仅当URL与path属性才渲染)
- children 与render相似，不同的是就算path不匹配也会渲染
- LinK
<Route>定义了匹配规则和渲染规则，而<Link> 决定的是如何在页面内改变url，从而与相应的<Route>匹配。
可以将Link标签看作a标签
- to属性
to：string

```js
<Link to='/home'>Home</Link>
```
to: object
该对象可以包含pathname、seacth、hash和state
pathname: A string representing the path to link to.
search: A string representation of query parameters.
hash: A hash to put in the URL, e.g. #a-hash.
state: State to persist to the location.
前三个是关于如何改变url
最后一个属性是传递给新渲染组件用的
```js
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

- replace 
link不会在history中新增一个url，会替换当前url为新url。

## Route匹配后传入新组件的三个对象属性
这三个对象属性是history，location和match
history是react-router唯二的依赖。React-router中将这个新的History类的构建方法，独立成一个node包，包名为history。
其大部分API对应的就是HTML5的history对象，只是把pushState变为
push，把replaceState变为replace
back变为goBack()
forward变为goForward()
新增一个block方法
 这个方法也很有用，比如当用户离开当前页面的时候，给用户一个文字提示，就可以采用history.block("你确定要离开当前页吗？")这样的提示。
 action: 可以选择三个值 "PUSH" "REPLACE" "POP"
 （具体文档没详细介绍，需要自行检验）
 一个前后翻页有两个动画，可以根据action不同来判断动画
 ```js
 function newComponent (props)=>{
   return (
     <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.history.action==='PUSH'?'SlideIn':'SlideOut'}
         >
           <Component {...props}/>
    </ReactCSSTransitionGroup>
   )
}
 ```
 其余两个属性跟浏览器原生属性大同小异

