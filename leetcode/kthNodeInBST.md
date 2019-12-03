## 题目
给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

```js
function kthNode(root, k) {
  if (!root) return
  let arr = [], stack = []
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
  if (k > 0 && k < res.length - 1) {
    return res[k - 1]
  } 
}
```