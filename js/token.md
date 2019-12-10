## 用途
token完全由应用管理，所以它可以避开同源策略。
token可以避免CSRF攻击
token是无状态，可以在多个服务器间共享。
## token有效期
因为token是cookie上的关键字，所以我们也能对其设置关键字，同时从安全性来说，设置有效期是有必要的。但token有效期过短，带给用户的体验就不好。
一种方案是服务器保存token，客户端每次请求刷新token的有限期。
另一种方案是服务器响应token和refresh token。当token过期，可以通过refresh token去重新申请token和refresh token。
