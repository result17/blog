## 坑
当你的create-react-app版本过低的时候，新建项目将不会有模板产生，你需要卸载旧版本
```js
npm uninstall -g create-react-app
```
重新安装即可

## react-router和react-router-dom
react-router-dom是react-router的dom版本，后者比前者增加了
```js
// and so on
<BrowserRouter></BrowserRouter>
```

## react-redux
react-redux主要增强了两个功能：
1.把一个组件拆分伪容器组件和傻瓜组件。
2.如同使用react的Context API一样提供一个所有组件都可以直接访问的Context。