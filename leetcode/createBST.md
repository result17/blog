```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left, self.right = None, None
def createBST(nums):
    root = None
    for num in nums:
        root = insert(root, num)
    return root
def insert(root, val):
    if not root: return TreeNode(val)
    if val <= root.val
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
```