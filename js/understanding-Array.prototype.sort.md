>[MDN上的解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 分析
此函数只接受一个参数或者不接参数。此函数是会改变原函数。
-不接参数时。数组会把元素转为字符串形式，然后按照字典序进行排序。
-接受参数。
```
此个参数只能为函数compareFunction。而此函数接受两个参数，firstEl和secondEl。
```
```js
let ary = [4, 3, 7, -5, 10]
//  升序排序
ary.sort((a, b) => a - b)
console.log(ary)
// 降序排序
ary = ary.sort((a, b) => b - a)
console.log(ary)
```
## 注意
>网上常用的ary.sort(Math.random() - .5)不是真正的乱序
[推荐浏览冴羽关于乱序的文章](https://github.com/mqyqingfeng/Blog/issues/51)
```
就在于在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。
```
>在我搜索[V8测试源码](https://github.com/v8/v8/blob/4b9b23521e6fd42373ebbcb20ebe03bf445494f9/test/mjsunit/array-sort.js)，发现V8源码在数组长度
小于或等于10时，采用插入排序。超过10时，使用quickSort。
```
要想实现真正乱序，就要用到[洗牌算法](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
```
```js
// es6
function shuffle(ary) {
  for (let i = ary.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    [ary[i - 1], ary[j]] = [ary[j], ary[i - 1]]
  }
}
```
