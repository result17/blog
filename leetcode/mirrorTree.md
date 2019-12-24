```js
function mirror(root) {
  if (!root) return
  const temp = root.right
  root.right = root.left
  root.left = temp
  mirror(root.left)
  mirror(root.right)
  return root
}
```