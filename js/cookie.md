## 限制
任何逗号、分号或空格(cookie值中禁止使用这些值)
cookie的值字符串可以用encodeURIComponent()来保证它不包含任何逗号、分号或空格
chrome对cookie个数没限制
domain (可选)
例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (string或null)。
path (可选)
例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。(string or null)。路径必须为绝对路径（参见 RFC 2965）。
设置 Path=/docs，则以下地址都会匹配：
/docs
/docs/Web/
/docs/Web/HTTP
过期时间（Expires）
有效期（Max-Age）
## 写入cookie
```js
docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
```
## 得到cookie
```js
docCookies.getItem(name)
```
## 检测cookie
```js
docCookies.hasItem(name)
```
## 移除cookie
```js
docCookies.removeItem(name[, path],domain)
```
## 得到所有cookie的列表
```js
docCookies.keys()
```
服务器的respond head可以通过设置Set-Cookie来通知客户端
```js
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```
```js
// node server
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz'])
```
## cookie安全属性
- HttpOnly 属性可以阻止通过javascript访问cookie, 从而一定程度上遏制这类攻击。能有效防止XSS攻击来获取cookie值。启用此属性后，通过JS获取cookie值会返回''。
- Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。但即便设置了 Secure 标记，敏感信息也不应该通过Cookie传输，因为Cookie有其固有的不安全性，Secure 标记也无法提供确实的安全保障。
## 会话期Cookie
会话期Cookie是最简单的Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）。
## 持久性cookie
和关闭浏览器便失效的会话期Cookie不同，持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。
## ETags
作为缓存的一种强校验器，ETag 响应头是一个对用户代理(User Agent, 下面简称UA)不透明（译者注：UA 无需理解，只需要按规定使用即可）的值。对于像浏览器这样的HTTP UA，不知道ETag代表什么，不能预测它的值是多少。如果资源请求的响应头里含有ETag, 客户端可以在后续的请求的头中带上 If-None-Match 头来验证缓存。
Last-Modified 响应头可以作为一种弱校验器。说它弱是因为它只能精确到一秒。如果响应头里含有这个信息，客户端可以在后续的请求中带上 If-Modified-Since 来验证缓存。
## Cookie同源与跨域
对于Cookie来说，Cookie的同源只关注域名，是忽略协议和端口的。所以一般情况下，https://localhost:80/和http://localhost:8080/的Cookie是共享的。
Cookie是不可跨域的；在没有经过任何处理的情况下，二级域名不同也是不行的。(wenku.baidu.com和baike.baidu.com)。
## 题外话
cookie name：name 相同，只要 cookie 的 domain ，path ， secure 有一项不同，就是不同的 cookie。
token技术出现在cookie之前，在此之前有别的技术来实现token的保存。
## cookie SameSite属性 (题外题外话)
从Chrome 51开始，cookie增加了一个SameSite属性，用来防止csrf攻击
它可以设置三个值
- Strict
- Lax
- None
## Strict
strict最为严格，完全禁止第三方cookie：跨站点时，任何情况都不会发送cookie。只有当前网页URL与请求目标一致，才会带上Cookie
```html
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```
## Lax
Lax规则稍稍放宽，大多数情况不放松第三方Cookie，但是导航到目标地址的Get请求除外
```html
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```
## None
Chrome 计划将Lax变为默认设置。此时，网站可以选择显示关闭SameSite属性，设为None。不过，前提是必须要同时设置Secure属性（cookie只能通过HTTPS协议发送），否则无效。
```html
<!-- example -->
Set-Cookie: widget_session=abc123; SameSite=None; Secure
```