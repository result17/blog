```js
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var binarySearch = function(arr, left, right, target) {
  while (left < right) {
    let mid = (left + right) >> 1
    if (arr[mid] < target) {
      left = ++mid
    } else {
      right = mid
    }
  }
  return left
}
var lengthOfLIS = function(nums) {
  let dp = new Array(nums.length), len = 0
  for (let i = 0; i < nums.length; i++) {
    let e = binarySearch(dp, 0, len, nums[i])
    dp[e] = nums[i]
    if (e === len) ++len
  }
  return len
}
```
最长递增子序列，此子序列也是升序的可以使用二分搜索来更新子序列。