## X-XSS-Protection 
```js
// 不启用xss过滤
X-XSS-Protection: 0 
// 启用xss锅炉 检查到xss删除页面
X-XSS-Protection: 1
// 启动过滤，不会删除页面但会阻塞页面
X-XSS-Protection: 1; mode=block
// 启用过滤，删除页面并报告
X-XSS-Protection: 1; report=<reporting-uri>
```
兼容性非常差，chrome全军覆没
现代浏览器现在都没有对其的原生支持
## Content Security Policy
内容安全策略   (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。
除了服务器响应头的Content-Security-Policy，还有<meta>元素可以配置
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```
例子
```js
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```
意思是
图片可以从任何地方加载
多媒体文件仅允许从media1.com和media2.com加载
可运行脚本仅允许从userscripts.example.com
```js
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```
仅允许通过HTTPS方式并仅从onlinebanking.jumbobank.com域名来访问文档
## Content-Security-Policy-Report-Only 
```js
Content-Security-Policy-Report-Only: policy
```
支持CSP的浏览器将始终对于每个企图违反你所建立的策略都发送违规报告，如果策略里包含一个有效的report-uri 指令。
启用违例报告
```js
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```
具体报告格式请参阅[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
比较遗憾的是其响应头特性较为新，国内各大网站少有设置（掘金除外）。
