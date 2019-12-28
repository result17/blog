## 起因
当我重新安装显卡，发现chrome黑屏。然后在网上搜索一番，定位原因是chrome默认使用硬件加速导致黑屏。有一种常见的方法就是关闭硬件加速，你可以在baidu或者google轻易搜索到，这里不啰嗦了。
## better way
另一个更好的方法是，删除GPUcache。你可以在以下的path中删除此文件夹。
```c
C:\Users\%yourUserName\AppData\Local\Google\Chrome\User Data\ShaderCache
```
将%yourUserName替换为你的用户名即可，然后删除GPUcache。
