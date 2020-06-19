### 功能描述
虎扑论坛进入一个帖子后，如果有恢复，会在页面显示“有新回复了，轻击查看 >> ”的链接，点击后会加载新回复。

### 分析
打开页面的开发者工具，切换到network标签，可以查看。页面发送了如下请求。
!()[./imgs/hupuNewReply.png]
可以看到页面定时发送jsonp请求，到check_NewReply接口检查是否有新内容。
url如下
```
Request URL: https://msa.hupu.com/check_newreply?callback=jQuery1830456657562332061_1592049063314&tid=35956983&_=1592049190671
```
callback为客户端约定服务器返回script执行的回调函数名 <br>
tid为hupu每个帖子的id <br>
_ 为 callback的参数，具体参数未知 <br>

### 问题
很明显，jsonp是要动态构造script标签插入到页面中，多半插入到head标签中。但是我浏览这个dom结构，并没有发现有这样的script标签。
难道我想错了吗？可以response header中的sec-fetch-dest: script表明是script标签，还有jQuery的源码写明了构造了一个script标签。
那只能是每次执行callback删除了此标签，（自然也正常，避免标签过多）

### 解决方法
那如何验证上面的想法，自然是检查head标签的变化
```js
var callback = function(mutations) {
    for(var mutation of mutations) {
        if (mutation.type == 'childList') {
            console.log(mutation);
            console.log('A child node has been added or removed.');
        }
    }
};

let observer = new MutationObserver(callback);

let head = document.head;

let  options = {
  'childList': true,
  'attributes':true
} ;

observer.observe(head, options);
```
可以看到确实每次checkNewReply会变动两次节点（插入和删除）
而这个jsonp的innerHTML为空，可以猜测此callback函数
callback参数估计是第一次检查（没有新内容的时间戳 / 1000），检查（存在新内容的时间戳 / 1000）