## 题意
在BST中删除一个节点，使得现在的树也是BST。
## 解
首先是寻找节点。将key和root.val比较，递归找到该节点。找到该节点后，有三种情况，一个是没有子节点，所以该节点的值等于null即可。此情况和第二情况一样，所以不需要特殊判断。第二情况，只有一个子节点，此时该节点的父节点只要跟该节点的唯一子节点连接则可。第三种情况，该节点有两个子节点，这时连接方式有两种，一个是跟左子树中数值最大的节点连接，第二种是跟右子树最小值节点连接，并把对应节点删除。
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
  if (!root) return null
  if (key > root.val) {
    root.right = deleteNode(root.right, key)
  } else if (key < root.val) {
     root.left = deleteNode(root.left, key)
  } else {
    if (!root.left) {
      return root.right
    } else if (!root.right) {
      return root.left
    }
    root.val = findMaxNode(root.left).val
    root.left = deleteNode(root.left, root.val)
  }
  return root
}
var findMaxNode = function(node) {
  while (node.right) {
    node = node.right
  }
   return node
}
```
```python
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
  if (!root) return null
  if (key > root.val) {
    root.right = deleteNode(root.right, key)
  } else if (key < root.val) {
     root.left = deleteNode(root.left, key)
  } else {
    if (!root.left) {
      return root.right
    } else if (!root.right) {
      return root.left
    }
    root.val = findMaxNode(root.left).val
    root.left = deleteNode(root.left, root.val)
  }
  return root
}
var findMaxNode = function(node) {
  while (node.right) {
    node = node.right
  }
   return node
}
```