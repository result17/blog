```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def flipEquiv(self, root1: TreeNode, root2: TreeNode) -> bool:
        if not root1 and not root2:
            return True
        if not root1:
            return root2 == None
        if not root2:
            return root1 == None
        l1 = self.flipEquiv(root1.left, root2.left)
        l2 = self.flipEquiv(root1.left, root2.right)
        r1 = self.flipEquiv(root1.right, root2.right)
        r2 = self.flipEquiv(root1.right, root2.left)
        return root1.val == root2.val and (l1 and r1) or (l2 and r2)
```
我首次解答时的答案，犯了一个错误，应该是
```python
return root1.val == root2.val and ((l1 and r1) or (l2 and r2))
```
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def flipEquiv(self, root1: TreeNode, root2: TreeNode) -> bool:
        if not root1 and not root2:
            return True
        if not root1 or not root2 or root1.val != root2.val:
            return False
        l1 = self.flipEquiv(root1.left, root2.left)
        l2 = self.flipEquiv(root1.left, root2.right)
        r1 = self.flipEquiv(root1.right, root2.right)
        r2 = self.flipEquiv(root1.right, root2.left)
        return (l1 and r1) or (l2 and r2)
```
更好的是提前返回