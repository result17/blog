```js
function biggerDepthInBT(root) {
  return !root ? 0 : Math.max(biggerDepthInBT(root.left), biggerDepthInBT(root.right))
}
```