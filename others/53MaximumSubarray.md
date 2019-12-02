```js
var maxSubArray = function(nums) {
  if (!nums.length) return
  if (nums.length === 1) return nums[0]
  let sum = 0, max = nums[0]
  for (let i = 0, len = nums.length; i < len; i++) {
    sum += nums[i]
    if (sum > max) max = sum
    if (sum < 0) sum = 0
  }
  return max
}
let arr = [-2,1,-3,4,-1,2,1,-5,4]
maxSubArray(arr)
```
```
动态规划思想
```