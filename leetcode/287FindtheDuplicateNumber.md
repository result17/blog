```js
class Solution {
    public int findDuplicate(int[] nums) {
        if (nums.length == 0) return 0;
        int fast = 0;
        int slow = 0;
        while (true) {
            fast = nums[nums[fast]];
            slow = nums[slow];
            if (slow == fast) break;
        }
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}
```
这题转换为142题链表有环问题，因为题目确保只有一个重复数字，一旦形成环，则检查环开始的地方则为重复数字，链表的
```java
ListNode node next = nums[val]
```