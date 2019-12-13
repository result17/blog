## 前言
csrf Cross-Site Request Forgery 跨域请求伪造
虽然攻击者无法直接获取用户的cookie内容和服务器对用户的响应，但能冒充客户进行对服务器的访问。
## csrf的攻击流程
- 用户登录bank.com，并在浏览器保留了cookie
- 攻击网站attack.me用上面所说的三种方式等用户访问bank.com，由于用户有bank.com的cookie，浏览器自动为请求携带token。
- bank.com接受请求后，确定是用户的cookie，误因为是用户执行请求，
- attack.me冒充用户执行操作，完成csrf攻击。
## csrf攻击原理
由上可知，csrf的攻击原理是用户访问攻击者网站时回去请求被攻击网站，而浏览器会为这个请求自动携带cookie，从而使得被攻击网站误以为是用户在进行操作。
## csrf is dead
在chrome51版本以后，响应头Set-Cookie可以设置SameSite属性，搭配HTTPS使用，就可以完全抵御csrf
```js
Set-Cookie: __Host-session=123; path=/; Secure; HttpOnly; SameSite=Lax
```
一般的，建议SameSite属性设为Lax。此属性允许使用安全的HTTP方法如 GET, HEAD, OPTIONS and TRACE时携带cookie，其余方法不许携带。安全HTTP出处 是[RFC 7321](https://tools.ietf.org/html/rfc7231#section-4.2.1)。
## 扩展阅读
- [tough-cookies](ttps://scotthelme.co.uk/tough-cookies/)
- [csrf-is-really-dead](https://scotthelme.co.uk/csrf-is-really-dead/)
- [csrf-is-dead](https://scotthelme.co.uk/csrf-is-dead/)