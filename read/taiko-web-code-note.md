## assetjs.js
所有文件的载入对象
## loader.js
加载类
通过Promise.all实现加载各种资源以及进度条更新。
## gamerulers.js
控制游戏得分及游戏帧率
## 后端server
大体上使用了nginx+flask。nginx做正向代理，转发请求到flask应用，也提供了song，img等静态资源的静态资源服务器。