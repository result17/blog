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
## type module妙用
```js
// 支持 <script type="module"> 的浏览器也支持 async 和 await 函数。
// 支持 <script type="module"> 的浏览器也支持 Class 类。
// 支持 <script type="module"> 的浏览器也支持 arrow functions。
// 支持 <script type="module"> 的浏览器也支持 fetch 、Promises、Map、Set 等更多 ES2015+ 语法。
```
```js
<!-- Browsers with ES module support load this file. -->
<script type="module" src="main.js"></script>

<!-- Older browsers load this file (and module-supporting -->
<!-- browsers know *not* to load this file). -->
<script nomodule src="main-legacy.js"></script>
```
这里唯一的问题是 Safari 10 并不支持 nomodule 属性，但是为了解决这一问题，你可以在使用 <script nomodule> 标签前，在 HTML 中使用内联JavaScript代码片段（注意：这个插件已经安装在 Safari11 版本中了
https://jdc.jd.com/archives/4911#post_comment

## 算法题
给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值;
X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和;
现在需要你找出数列a的所有区间中, X值最大的那个区间;
如数列a为: 3 1 6 4 5 2; 则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;

https://juejin.im/post/5e6a14b1f265da572978a1d3
```js
// 第一次作答的大概代码（部分变量忘记更新，还有优化的地方）
function solution(list) {
  debugger
  if (!list.length) return []
  // 正整数数组
  let left = 0, totalMaxX = 0, rl = 0, rr = 0
  for (; left < list.length; left++) {
    let min = list[left], sum = list[left], tempX = sum * sum, tl = tr = left
    for (let right = left + 1; right < list.length; right++) {
      sum += list[right]
      if (list[right] >= min) {
        // 肯定会增加的
        tempX += min * list[right]
        tr = right
      } else {
        // 不一定会增加的
        min = list[right]
        let tempVal = min * sum
        if (tempVal > tempX) {
          tr = right
          tempX = tempVal
        }
      }
    }
    if (tempX > totalMaxX) {
      rl = tl
      rr = tr
      totalMaxX = tempX
    }
  }
  return list.slice(rl, rr + 1)
}

solution([3,1,6,4,5,2])
```
核心思路是，子数组可以仅由两个变量left和right，用O(n**2)列出所有的子数组，当其不更新最小值时，x的值总会增加，如果更新最小值时，则运算比较并记录。
优化有两点：
1. 最外层循环没必要跟tempX比较，直接跟totalMaxX比较更合适。
2. 当比较3开头的x值，没必要再比较在它右边且比它小或等于它的开头的子数组。因为，最小值肯定出现在3之后，且子区间之和必比3的子区间之和小。
更晕的是，题目原来是求x的最大值，不是求区间。
```js
// 神三元解法
let maxXValue = (arr) => { 
    let n = arr.length; 
    let min = Array.from(new Array(n), _ => new Array(n)); 
    let res = Array.from(new Array(n), _ => new Array(n)); 
    let max = Number.MIN_SAFE_INTEGER; 
    for(let i = 0; i < n; i++) { 
        for(let j = i; j < n; j++) { 
            if(i == j) { 
                min[i][j] = arr[i]; 
                res[i][j] = arr[i] * arr[i]; 
                continue; 
            } 
            if(arr[j] < min[i][j - 1]) { 
                min[i][j] = arr[j]; 
                res[i][j] = (res[i][j - 1] * arr[j] / min[i][j - 1]) + arr[j] * arr[j]; 
            } else { 
                min[i][j] = min[i][j - 1]; 
                res[i][j] = res[i][j - 1] + min[i][j - 1] * arr[j]; 
            } 
            max = Math.max(res[i][j], max); 
        } 
    } 
    return max; 
}
maxXValue(9, 1, 1)
maxXValue([3,1,16,4,5,2,7,14,3])
```
```js
// my best solution
function solution(list) {
  if (!list.length) return []
  let left = 0, maxX = 0, l = 0, r = 0
  for (; left < list.length; left++) {
    let min = list[left], sum = list[left], tempMaxX = sum * sum
    for (let right = left + 1; right < list.length; right++) {
      let cur = list[right]
      sum += cur
      min = Math.min(cur, min)
      tempMaxX = min * sum
      if (tempMaxX > maxX) {
        maxX = tempMaxX
        l = left
        r = right
      }
    }
  }
  // 逗号表达式故意皮一下
  return (list.slice(l, r + 1), maxX)
}

solution([3,1,16,41,5,2,7,14,3])
```
上面的缺少了单个数字组成的区间
```js
function solution(list) {
  if (!list.length) return []
  let left = 0, maxX = 0, l = 0, r = 0, maxL = list[left]
  for (; left < list.length; left++) {
    if  (list[left] > maxL) {
      maxL = list[left]
    } else {
      continue
    }
    let min = list[left], sum = 0, tempMaxX = 0
    for (let right = left; right < list.length; right++) {
      let cur = list[right]
      sum += cur
      min = Math.min(cur, min)
      tempMaxX = min * sum
      if (tempMaxX > maxX) {
        maxX = tempMaxX
        l = left
        r = right
      }
    }
  }
  // 逗号表达式故意皮一下
  return (list.slice(l, r + 1), maxX)
}

solution([3,1,16,41,5,2,7,14,3])
```