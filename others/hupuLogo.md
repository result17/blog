## hupu网站图片水印
hupu是我每天都会上的一个论坛，其手机版会在图片上添加一个水平。起初，我好奇怎么实现，所以打开电脑浏览一下代码，原来就是用css属性，设定相对位置。水印元素跟图片元素同级。
```css
.img-logo:after {
  width: 24px;
  height: 24px;
  content: '';
  background-image: url(http://w1.hoopchina.com.cn/images/m/img_logo.png);
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: 10px;
}
```
## 更好的实现
图片不应该直接放在img标签，应该将图片和logo图片通过canvas混合（可能比较消耗服务器的计算资源），应该可以得到比较好的水印效果。