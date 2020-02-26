## 题目
输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, target) {
  let result = []
  function dfs(node, result, sum = 0, stack = []) {
    stack.push(node.val)
    sum += node.val
    // 路径是必须遍历到底
    if (!node.left && !node.right && sum === target) {
      result.push(stack.slice())
    }
    if (node.left) {
      dfs(node.left, result, sum, stack)
    }
    if (node.right) {
      dfs(node.right, result, sum, stack)
    }
    stack.pop()
  }

  if (root) {
    dfs(root, result)
  }
  return result
}
```

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        if not root: return []
        res = list()
        self.traverse(res, root, sum, list())
        return res
    def traverse(self, res: List[List[int]], node: TreeNode, n: int, l: List[int]) -> None:
        if not node.left and not node.right and node.val == n:
            l.append(node.val)
            res.append(l)
        if node.left:
            self.traverse(res, node.left, n - node.val, l + [node.val])
        if node.right:
            self.traverse(res, node.right, n - node.val, l + [node.val])
            
```
两个错误，第一个append是没有返回值的，第二个每次递归时，要使用新的list进行保存，如果left和right共用使用同一个list，结果就会出错。