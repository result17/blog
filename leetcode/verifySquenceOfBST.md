## 题目
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

```js
function verifySquenceOfBST(sequence) {
  if (sequence && squeence.length > 0) {
    let root, len = sequence.length
    root= sequence[len - 1]
    let ind
    // 从第0位检查到倒数第二位
    for (let i = 0; i < len - 1; i++) {
      if (sequence[i] > root.val) {
        ind = i
        break
      }
    }
    // 由于二叉搜索树mind一定存在
    for (let j = ind + 1; j < len - 1; j++) {
      if (sequence[j] < root) return false
    }
    let left = right = true
    if (i > 0) {
      left = verifySquenceOfBST(sequence.slice(0, ind))
    }
    if (i < len - 1) {
      right = verifysquenceOfBST(sequence.slice(ind, len - 1))
    }
    return left && right
  }
}
```