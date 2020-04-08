## margin合并问题
一般分为两种情况，父子容器margin合并和兄弟容器合并。margin会取Math.max(marginA, marginB)
- 父子容器: 可以触发父容器的BFC
- 兄弟容器：可以将其中一个容器display: absolute | inline-block; 或者float: left；

https://www.zhihu.com/question/19823139

## JWT
http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
- 原理：服务器认证以后，生成一个 JSON 对象，发回给用户
```json
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```
这个json保存在客户端，一旦检验成功，服务器无条件完全信任用户。检验规则，则是服务器用哈希算法进行签名。
- 数据结构
```js
Header.Payload.Signature
```
1. header是一个json对象
```js
{
  "alg": "HS256",
  "typ": "JWT"
}
```
2. payload
Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。
```js
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```
JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分，也就是是永远不要把密码之类的放在此。

3. Signature
Signature 部分是对前两部分的签名，防止数据篡改。
首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

### session认证
用户在浏览器登陆之后，服务端为用户生成唯一的 session id，存储在服务端的存储服务（例如 MySql, Redis）中
该 session id 也同时返回给浏览器，以 SESSION_ID 为 KEY 存储在浏览器的 cookie 中
如果用户再次访问该网站，cookie 里的 SESSION_ID 会随着请求一同发往服务端
服务端通过判断 SESSION_ID 是否已经在 Redis 中判断用户是否处于登陆状态

### td的margin
表格内的tr,td,th等元素，默认是不支持margin的，使用padding就好了。

### Resize Observer API
https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver

### react fiber介绍
https://zhuanlan.zhihu.com/p/37095662

### setState中的同步与异步深层解析
React内部也大量使用batchedUpdates来优化用户代码，比如说在事件回调中setState，在commit阶段的钩子（componentDidXXX）中setState 。

可以说，setState是对单个组件的合并渲染，batchedUpdates是对多个组件的合并渲染。合并渲染是React最主要的优化手段。

### ES5写一个数组去重、
刚开始写了一个O(n^2)时间的
一般用indexOf，sort()在数组长度大于10是快排，然res首先等于数组第一项,用两个指针一个在数组开头i，一个是j = i + 1。如果i = j，j++，直到j !== i,然后i = j，j++,
```
 res.push(arr[i])
```

能不能优化？ (我问能不能用新空间，他说可以，然后写了一个O(n)时间的)

使用对象键唯一的特性。


能不能区别开数字和字符串？(想了想，最后还是用indexOf方式，最优的没想出来，面完猛然想出来了，当时脑子有点乱)
这里就不能直接用对象存。比较脏的方法是判断类型用特殊标记，例如数字前添加*，转化为特殊的字符串，字符串前添加%。
打字思索的过程，突然想到可以分开两个对象存储。数字对象和字符串对象。每次遍历判断类型后，统一转化为字符串去特定类型的对象查询即可。

### 在 setState 中使用函数替代对象
https://juejin.im/entry/5873b04f61ff4b006d4d45f7
当一个应用比较复杂时，多次调用setState时，state很可能不是想要的state。（因为异步更新的原因）
```js
submit(){
   this.setState(function(prevState, props){
      return {showForm: !prevState.showForm}
   })
```
### 三栏布局
https://zhuanlan.zhihu.com/p/25070186?refer=learncoding

### js事件循环
macro-task:
- script (整体代码)
- setTimeout
- setInterval
- setImmediate
- I/O
- UI rendering

micro-task:
- process.nextTick
- Promise(原生)
- Object.observe
- MutationObserver

值得一提：
```js
setTimeout(function timeout () {
  console.log('timeout');
},0);

setImmediate(function immediate () {
  console.log('immediate');
});
```
### 区间排序
```js
let arr = [[15, 39], [0, 14], [100, 999], [80, 99], [40, 79]]
function solution() {
  return arr.sort((a, b) => {
    a[0] - b[0]
  })
}
solution()
```
又想过不用sort的，但好像比较麻烦。

### transform 的属性设置顺序可以改变吗
  不可以，比如 translate 和 rotate，因为旋转后 x 轴和 y 轴也会跟着旋转，所以先平移后旋转，和先旋转后平移得到的结果是不一样的。
  既然提到了 transform，我就顺带说了 transform 的副作用。子元素的属性比如宽高等单位设置为百分比，是相对于它第一个带有定位的父元素而言的。而如果它的父元素没有设置定位但设置了 transform 的话，也能起到类似定位的效果。因此如果设置了固定定位的元素的父元素带有 transform 的话，此时它的固定定位不再是相对于浏览器视口而言的，而是相对于这个带 transform 的父元素。

### react受控组件
在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，每个 state 突变都有一个相关的处理函数。这使得修改或验证用户输入变得简单。例如，如果我们要强制要求所有名称都用大写字母书写，我们可以将 handlechange 改写为：
```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
### react非受控组件
在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。
因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

### useMemo Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果

### react重渲染
this.setState : 无条件重渲染，不进行新旧比较
this.forceUpdate: 无条件重渲染，不进行新旧比较
父组件render带动子组件render： 无条件，和props是否更新无关
祖先组件context变动： 不做props变动假设