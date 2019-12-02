```
https://leetcode.com/problems/binary-tree-postorder-traversal/
左右中
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
var postorderTraversal = function(root) {
 let res = []
  function help(root) {
    if (!root) return res
    help(root.left)
    help(root.right)
    res.push(root.val)
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
var postorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let last = null; // 标记上一个访问的节点
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack[stack.length - 1];
        // 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
        if (!current.right || current.right == last) {
          current = stack.pop();
          result.push(current.val);
          last = current;
          current = null; // 继续弹栈
        } else {
          // 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
          current = current.right;
        }
      }
      return result;
    }
```
```js
// 一个更棒的思路是把后序遍历看成变异版的前序遍历(中右左的reverse())
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
var postorderTraversal = function(root) {
  if (!root) return []
  let stack = [root], res = []
  while (stack.length) {
    let node = stack.pop()
    res.push(node.val)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
   return res.reverse()
}
```
