## 通用首部
指请求报文和响应报文都可以使用的字段
Cache-Control
no-cache 指客户端不缓存过期资源
no-store 指不进行缓存
max-age 指缓存资源的缓存时间比指定的值小，那么客户端就接受缓存资源，且缓存服务器不对资源有效性进行再次确认


Connection 指控制不再转发给代理的首部字段（Hop-by-hop），管理持久连接
close 指服务器像明确断开连接
Keep-Alive 指保存持久连接，HTTP/1.1前默认连接是非持久性的，如需要保存持久连接，需要增加此字段    


Upgrade 可以用来指定一个完全不同的通信协议，对于这个字段，服务器可以返回101状态码
