## 欧几里得算法求最大公约数
```java
Public static int gcd(int p, int q)
{
  if (q == 0) return p;
  int r = p % q;
  return gcd(q, r);
}
```
## 在java中创建数组
```java
double[] a = new double[N];
```
初始值为0.0
```java
double[][] a = new double[M][N];
```
java会将数组类型的数组元素初始化为0，将布尔型的数组元素初始化为false。
## 静态方法
等同其他语言的静态方法是一组在被调用时会被顺序执行的语句。使用static修饰符区别开来。