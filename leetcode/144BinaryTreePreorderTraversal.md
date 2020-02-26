```
https://leetcode.com/problems/binary-tree-preorder-traversal/
```
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
 * @return {number[]}
 */
// 递归版本
var preorderTraversal = function(root) {
  let res = []
  var helper = function(root) {
    if (!root) return
    res.push(root.val)
    helper(root.left)
    helper(root.right)
  }
  helper(root)
  return res
}
```
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
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let res = [], stack = []
  // cur指针
  let cur = root
  while (cur || stack.length > 0) {
    while (cur) {
      res.push(cur.val)
      stack.push(cur)
      cur = cur.left
    }
    // 直到左节点为空，弹出节点，遍历其右节点
    cur = stack.pop()
    cur = cur.right
  }
  return res
}
```
类似回溯的使用，本质是dfs
