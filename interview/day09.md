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
