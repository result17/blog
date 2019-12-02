```
这其实并非出自leetcode,或者是我没有发现此题.
```
```js
//  pre和ind
function reConstructBinaryTree(pre, ind) {
  if (pre.length !== ind.length || !pre.length) return
  if (pre[0] === null) return
  let root = pre[0]
  let indIdxRoot = ind.indexOf(root)
  if (indIdxRoot === -1) return
  root.left = reConstructBinaryTree(pre.slice(1, indIdxRoot + 1), ind.slice(0, indIdxROOT))
  root.right = reConstructBinaryTree(pre.slice(indIdxRoot + 1), ind.slice(indIdxRoot + 1))
  return root
}
```
```
递归思想, 由上到下
```