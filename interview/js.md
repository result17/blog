## 精确获取页面元素位置的方式有哪些
getBoundingClientRect()方法返回一个该元素的左上角和右下角相对浏览器(viewport)左上角距离
```js
var X= this.getBoundingClientRect().left;
var Y =this.getBoundingClientRect().top;
//再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left + document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top + document.documentElement.scrollTop;
```
## 已知数据结构users，请实现语法支持user.unique能够按照name字段去重，并输出结构为：["a","b"]
```js
var users=[{
   id:1,name:"a"
},{
   id:2,name:"a"
},{
   id:3,name:"b"
},{
   id:4,name:"v"
}]
```
```js
users.reduce((acc, cur) => {
  if (acc.indexOf(cur.name) === -1) {
    acc.push(cur.name)
  }
  return acc
}, [])
```
## 已知如下对象，请基于es6的proxy方法设计一个属性拦截读取操作的例子，要求实现去访问目标对象example中不存在的属性时，抛出错误：Property "$(property)" does not exist
```js
const man={
    name:'jscoder',
    age:22
}
 //补全代码
const proxy = new Proxy(...)
proxy.name //"jscoder"
proxy.age //22
proxy.location //Property "$(property)" does not exist
```
```js
var man = {
	name:'jscoder',
    age:22
};
var proxy = new Proxy(man, {
	get: function(target, property) {
		if(property in target) {
			return target[property];
		} else {
			throw new ReferenceError(`Property ${property} does not exist.`);
		}
	}
});
console.log(proxy.name)
console.log(proxy.age)
console.log(proxy.location)
```
## 给出如下虚拟dom的数据结构，如何实现简单的虚拟dom，渲染到目标dom树
```js
//样例数据
let demoNode = ({
    tagName: 'ul',
    props: {'class': 'list'},
    children: [
        {tagName: 'li', children: ['douyin']},
        {tagName: 'li', children: ['toutiao']}
    ]
});
```
```js
function Element(vDomObj) {
  let ele
  // debugger
  if (typeof vDomObj.tagName === 'string') {
    ele = document.createElement(vDomObj.tagName)
    if (vDomObj.props) {
      for (const prop of Object.keys(vDomObj.props)) {
        ele.setAttribute(prop, vDomObj.props[prop])
      }
    }
    for (let i = 0; i < vDomObj.children.length; --i) {
      if (Object.prototype.toString.call(vDomObj.children[i]) === '[object Object]') {
        ele.appendChild(new Element(vDomObj.children[i]))
      } else if (Object.prototype.toString.call(vDomObj.children[i]) === '[object String]') {
        ele.append(document.createTextNode(vDomObj.children[i]))
      }
    }
  }
  return ele
}
Element(demoNode)
```
```js
// 原答案
Element.prototype.render = function(){
    var el = document.createElement(this.tagName),
        props = this.props,
        propName,
        propValue;
    for(propName in props){
        propValue = props[propName];
        el.setAttribute(propName, propValue);
    }
    this.children.forEach(function(child){
        var childEl = null;
        if(child instanceof Element){
            childEl = child.render();
        }else{
            childEl = document.createTextNode(child);
        }
        el.appendChild(childEl);
    });
    return el;
};
```
```js
// 根据实例输入输出矩阵规律完成以下matrix函数
function matrix(n) {}

matrix(n).forEach((item, i) => {
  console.log(item)
})

// input 3 or 4
// output
[0, 2, 0]
[2, 1, 2]
[0, 2, 0]

// input 5 or 6
// output
[0, 0, 3, 0, 0]
[0, 3, 2, 3, 0]
[3, 2, 1, 2, 3]
[0, 3, 2, 3, 0]
[0, 0, 3, 0, 0]

// input 7 or 8
// output
[0, 0, 0, 4, 0, 0, 0]
[0, 0, 4, 3, 4, 0, 0]
[0, 4, 3, 2, 3, 4, 0]
[4, 3, 2, 1, 2, 3, 4]
[0, 4, 3, 2, 3, 4, 0]
[0, 0, 4, 3, 4, 0, 0]
[0, 0, 0, 4, 0, 0, 0]
```
```js
function matrix(n) {
  if (n < 0) return []
  let m = n % 2 ? n : n - 1, res = [], mid = (m + 1) / 2
  for (let i = 0; i < mid; ++i) {
    let col = new Array(m).fill(0), j = i
    // 中间位置
    col[mid - 1] = mid - i 
    while (j > 0) {
      j-- 
      let val = mid - j
      col[mid - 1 - (i - j)] = val
      col[mid - 1 + (i - j)] = val
    }
    res.push(col)
  }
  for (let i = mid - 1; i >= 0; --i) {
    let col = res[i].slice()
    res.push(col)
  }
  return res
}
```
```js
let arr = [1, 2, 3];
let fnArray = [];
for (var i = 0; i < arr.length; i++) {
    fnArray[i] = function () {
        return arr[i] * 2;
    }
}
let result = fnArray.find((fn) => {
    return fn() === 4;
})
console.log(result);
```

这有一个小小的坑就是，循环结束i的值是3而不是2。arr这个数组显然没有索引为3的元素，所以undefined * 2 = NaN , NaN 自然不等于4。
```js
// destructuringArray( [1,[2,4],3], "[a,[b],c]" );
// result
// { a:1, b:2, c:3 }

```
```js
// todo
```

给定一个一维数组arr，将其按一定数量num分组为二维数组，例如: 条件为arr=[0,1,2,3,4,5,6], num=3, 结果为[[0,1,2],[3,4,5],[6]]
```js
function solution(ary, num) {
  let res = [], i = 0
  while (i < ary.length) {
    res.push(ary.slice(i, i + num))
    i += num
  }
  return res
}
```