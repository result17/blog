```python
def sameTree(p, q):
    if not p and not q:
        return true
    if not p or not q:
        return false
    l = sameTree(p.left, q.left)
    r = sameTree(p.right, q.right)
    return p.val == q.val and l and r
```