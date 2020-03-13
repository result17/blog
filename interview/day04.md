##

## DNS能用TCP实现吗？
晕，我还一直以为是只能用TCP协议实现。
https://www.zhihu.com/question/310145373

### 地址栏是以使用方法请求URL
GET

### typescript中的interface编译后占空间吗？enum呢？
interface不占空间，它在编译过程中被用来检查类型。enum占空间，是类似对象一样的实现。顺带一提，tsc是typescript compiler的意思，自然javac也是java compiler的意思。

### 如何获得页面加载时间？
chrome浏览器可以使用
```js
chrome.loadtimes()
const spend = chrome.loadtimes().finishLoadTime - chrome.loadtimes().startLoadTime
```
或者使用
```js
const spend = performance.timing.domComplete - performance.timing.domLoading
```

### Element.closest()
Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
```js
// polyfill
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement;
        } while (el !== null);
        return null;
    };
```
可以看出跟instanceof思想一样，使用do while循环比较符合意义。

### Element.animate()

https://codepen.io/rachelnabors/pen/rxpmJL/?editors=0010
实验中功能，原理是CSS动画，transform中有rotate, translate支持矩阵。

### 子类继承父类的方法是如何实现链式调用？


### sql注入
现在的数据库系统都提供SQL语句的预编译（prepare）和查询参数绑定功能，在SQL语句中放置占位符'?'，然后将带有占位符的SQL语句传给数据库编译，执行的时候才将用户输入的数据作为执行的参数传给用户。这样的操作不仅使得SQL语句在书写的时候不再需要拼接，看起来也更直接，而且用户输入的数据也没有机会被送到数据库的SQL解释器被编译执行，也不会越权变成代码。
https://www.zhihu.com/question/22953267/answer/23192081
python3中的sqlit3模块
```python
conn.executemany("insert into songs values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", song_data_list)
```
node中的mysql模块
```js
this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?, ?);`, [this.tableName, null, manager.name, manager.password, manager.github], err => {
          if (err) throw err
          console.log(`${this.tableName} inserted, add ${manager.name} in manager table!`)
        })
```