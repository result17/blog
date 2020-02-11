## 分析
此题的递归写法是比较简单的，只要计算中点索引，将root.val = nums[mid]，然后递归求解左子树和右子树即可。但非递归解法是比较难的，我借鉴了评论区的java做法，将区间的两端点索引也压入栈中（python deque）
## code
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

from collections import deque

class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None
        length = len(nums)
        d = deque()
        root = TreeNode(0)
        d.append(length - 1)
        d.append(0)
        d.append(root)
        while (len(d)):
            node = d.pop()
            start = d.pop()
            end = d.pop()
            mid = start + (end - start) // 2
            node.val = nums[mid]
            if (start <= mid - 1):
                node.left = TreeNode(0)
                d.append(mid - 1)
                d.append(start)
                d.append(node.left)
            if (mid + 1 <= end):
                node.right = TreeNode(0)
                d.append(end)
                d.append(mid + 1)
                d.append(node.right)
        return root
```