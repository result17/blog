## 用途
token完全由应用管理，所以它可以避开同源策略。
token可以避免CSRF攻击
token是无状态，可以在多个服务器间共享。
## token如何防范CSRF攻击
首先，来说一般CSRF攻击分为get类型的csrf，还有post类型的csrf最后还有a链接的csrf
- get类型的csrf
```js
 <img src="http://bank.example/withdraw?amount=10000&for=hacker" > 
```
- 
- post类型的csrf
```js
 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
当你打开攻击网站，此网站向被攻击网站自动一个表单，相当于模拟用户进行了一次post操作。
- 链接类型的CSRF
```js
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a/>
```
由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功。
然后是csrf的攻击流程
- 用户登录bank.com，并在浏览器保留了cookie
- 攻击网站attack.me用上面所说的三种方式等用户访问bank.com，由于用户有bank.com的cookie，浏览器自动为请求携带token。
- bank.com接受请求后，确定是用户的cookie，误因为是用户执行请求，
- attack.me冒充用户执行操作，完成csrf攻击。

## token有效期
因为token是cookie上的关键字，所以我们也能对其设置关键字，同时从安全性来说，设置有效期是有必要的。但token有效期过短，带给用户的体验就不好。
一种方案是服务器保存token，客户端每次请求刷新token的有限期。
另一种方案是服务器响应token和refresh token。当token过期，可以通过refresh token去重新申请token和refresh token。

token一定要搭配HTTPS使用，因为只要在响应过程中，响应被窃取了，那就可以冒充用户向服务器发送带有token的请求，从而骗取用户信任。
## token的验证
由于token的验证都是在服务器一则，所以不必使用非对称加密，使用对称加密法则可（因为对称加密算法比非对称加密算法要快几十倍）。而且我们不需要从token解释出加密内容，只要验证token是否为服务器提供的即可（就是判断token是否是伪造的？）
由此，我们可以选择使用 加密的消息摘要HMAC（Keyed Hash Message Authentication Code）。由服务器提供一个密钥key（可以根据事件，请求内容等等，给响应提供一个特殊key，提高安全系数），再对客户端的请求（如 userID)，生成一个签名，将其返回客户端保存。当下一客户端携带token请求时，服务器再跟key混合再次对请求进行签名，判断此签名与token是否相同，从而选择是否信任客户端。
## 更安全的token实现
服务器用特定的密钥为每个用户生成一个特定token（有特定的有效期）,服务器保存一份，然后不再通过Set-Cookie通知客户端保存，而是插值到HTML字符串中。例如
```html
<form action="https://report-uri.io/login/auth" method="POST">
    <input type="hidden" name="csrf_token" value="d82c90fc4a14b01224gde6ddebc23bf0">
    <input type="email" id="email" name="email">
    <input type="password" id="password" name="password">
    <button type="submit" class="btn btn-primary">Login</button>
</form>
```
用户提交表带时也把cstf-token的值提交给服务器，由服务器判断。