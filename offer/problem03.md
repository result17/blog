```
在一个长度为n的数组中所有数字都在0-n-1的范围内，数组某些数字重复。
[2, 3, 1, 0, 2, 5, 3]，返回重复数字2或3
```
```js
function main(ary) {
  if (ary.length < 2) return null
  let store = new Set()
  for (let i = ary.length; i; i--) {
    if (store.has(ary[i - 1])) {
      return ary[i - 1]
    }
    store.add(ary[i - 1])
  }
  return null
}
console.log(main([2, 3, 1, 0, 2, 5, 3]))
```
```
缺点：使用额外空间
```