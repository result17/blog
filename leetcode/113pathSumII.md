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