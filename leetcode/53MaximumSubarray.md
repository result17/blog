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
动态规划思想
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = nums[0];
        int sum = 0;
        for (int n : nums) {
            sum += n;
            res = Math.max(res, sum);
            if (sum < 0) {
                sum = 0;
            }
        }
        return res;
    }
}
```
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        if (!nums.size()) return 0;
        int ans = nums[0], sum = 0;
        for (int n : nums) {
            sum += n;
            ans = max(sum, ans);
            if (sum < 0) {
                sum = 0;
            }
        }
        return ans;
    }
};
```
慎用auto，如果用int会比auto快一倍时间