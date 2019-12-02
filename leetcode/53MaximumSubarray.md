```js
var MaximumSubarray = function(ary) {
  if (ary.length === 0) return
  if (ary.length === 1) return ary[0]
  let sum = 0, max = ary[0]
  for (let i = 0; i < ary.length - 1; i++) {
    sum += ary[i]
    if (sum > max) max = sum
    if (sum < 0) sum = 0
  }
  return max
}
```
```
动态规划思想
```