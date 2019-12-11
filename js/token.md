## 用途
token完全由应用管理，所以它可以避开同源策略。
token可以避免CSRF攻击
token是无状态，可以在多个服务器间共享。
## token有效期
因为token是cookie上的关键字，所以我们也能对其设置关键字，同时从安全性来说，设置有效期是有必要的。但token有效期过短，带给用户的体验就不好。
一种方案是服务器保存token，客户端每次请求刷新token的有限期。
另一种方案是服务器响应token和refresh token。当token过期，可以通过refresh token去重新申请token和refresh token。

token一定要搭配HTTPS使用，因为只要在响应过程中，响应被窃取了，那就可以冒充用户向服务器发送带有token的请求，从而骗取用户信任。
## token的验证
由于token的验证都是在服务器一则，所以不必使用非对称加密，使用对称加密法则可（因为对称加密算法比非对称加密算法要快几十倍）。而且我们不需要从token解释出加密内容，只要验证token是否为服务器提供的即可（就是判断token是否是伪造的？）
由此，我们可以选择使用 加密的消息摘要HMAC（Keyed Hash Message Authentication Code）。由服务器提供一个密钥key（可以根据事件，请求内容等等，给响应提供一个特殊key，提高安全系数），再对客户端的请求（如 userID)，生成一个签名，将其返回客户端保存。当下一客户端携带token请求时，服务器再跟key混合再次对请求进行签名，判断此签名与token是否相同，从而选择是否信任客户端。