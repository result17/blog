## alias
在
```js
code ~/.bash_profile
```
给git设置alias，在普通文件夹中使用没问题。但在vscode中发现不起作用。搜索谷歌，找到解决方案
- 在everthing中搜索code目录下的settings.json。
- 用编辑工具打开，在里面添加
```js
"terminal.integrated.shellArgs.windows": [
    "--login", "-i"
],
```
##