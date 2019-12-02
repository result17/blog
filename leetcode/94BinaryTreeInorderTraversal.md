```
<!-- 左中右 -->
https://leetcode.com/problems/binary-tree-inorder-traversal/submissions/
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
var inorderTraversal = function(root) {
  let res = []
  function help(root) {
    if (!root) return res
    help(root.left)
    res.push(root.val)
    help(root.right)
  }
  help(root)
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
// 非递归
var inorderTraversal = function(root) {
  let res = [], stack = []
  // cur指针
  let cur = root
  while (cur || stack.length > 0) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    res.push(cur.val)
    cur = cur.right
  }
  return res
};
```