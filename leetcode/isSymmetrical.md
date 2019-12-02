```js
function isSymmetrical(node1, node2) {
  if (!node1 && !node2) {
    return true
  }
  if (!node1 || !node2) {
    return false
  }
  if (node1.val !== node2.val) {
    return false
  }
  return isSymmetrical(node1.left, node2.right) && isSymmetrical(node1.right, node2.left)
}
```