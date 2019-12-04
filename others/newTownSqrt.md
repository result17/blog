
## 参考
- https://juejin.im/post/5c1c60aee51d454e7f237b12
- https://zhuanlan.zhihu.com/p/32703267

常见的求平方根的近似解有二分法求平方根，牛顿迭代法求平方根，魔数求平方根（0x5f3759df，牛顿法变种）
![img](https://github.com/result17/blog/blob/master/imgs/sqrt2.gif?raw=true)
假设我们要求的a的平方根，很容易我们有如图的函数g(x) = x^2 - a图像。对于函数图像的每一点的导数都为2x。对函数图像的最右点x1和过x1的切线函数f(x)与x轴相交的x2(f(x2) = 0)，对点x1求导可得f'(x1) = f(x1) - f(x2) / x1 - x2，化简可得。下图等于
![img](https://github.com/result17/blog/blob/master/imgs/sqrt1.jpg?raw=true)
x2 = x1 - f(x1) / f'(x1)
由因为(x, f'(x1))也在g(x)函数图像上，所以f'(x1) = 2x，所以x2 = x1 - f(x1) / 2x。
我们可以看出x2比x1更靠近平方根的位置，所以当我们迭代次数足够多时，x2即是平方根的近似解。
```js
function mySqrt(n, e = 0.001) {
  let sqrt = n / 2
  debugger
  while (sqrt ** 2 - n > e) {
    sqrt = sqrt - (sqrt ** 2 - n) / (2 * sqrt) 
  }
  return sqrt
}
```