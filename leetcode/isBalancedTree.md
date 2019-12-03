```js
function isBalancedTree(root) {
  function height(node) {
    if (!node) return 0
    let leftH = height(node.left), rightH = height(node.right)
    if (leftH === -1 || rightH === -1) return -1
    if (Math.abs(leftH - rightH) > 1) return -1
    return Math.max(leftH, rightH) + 1
  }
  return hight(root) !== -1
}
```
如果左子树或右子树是非平衡树，则整棵树为非平衡树
如果左右子树的高度差大于1，则整棵树为非平衡树