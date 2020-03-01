## keng
学习flask官方示例，在vscode TERMINAL中的powershell运行虚拟环境时会报错
```python
flask init-db
# no such commander
```
在网上找了一会答案才发现不能用IDE中的命令行，要使用环境中的命令行工具。
然后研究一下别人博文的样式，发现顶部菜单有一个li向两边展开的效果，一开始我是没有什么思路，后来各种尝试，才发现不是用纯css实现，原理是left:50%;width一开始为0，然后将width调整为div宽度，并将left：50%。再加上视觉上的隐蔽就可以实现。
