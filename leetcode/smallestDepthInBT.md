```js
function smallestDepthInBT(root) {
  if (!root) return 0
  if (!root.left) return 1 + smallestDepthInBT(root.right)
  if (!root.right) return 1 + smallestDepthInBt(root.left)
  return Math.min(smallestDepthInBT(root.right), smallestDepthInBt(root.left)) + 1
}
```