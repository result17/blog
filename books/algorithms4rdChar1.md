resource
https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/
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
## 二分查找
```java
public class BinarySearch
{
  public static int rank(int key, int[] a)
  {
    int low = 0;
    int hight = a.length - 1;
    while (low <= hight)
    {
      int mid = low + (hight - low) / 2;
      if (key < a[mid]) height = mid - 1;
      else if (key > a[mid]) low = mid + 1;
      else return mid;
    }
    return -1;
  }
}
```
## 静态方法库
是定义在一个java类中的一组静态方法。类的声明是public class加上类名，以及用花括号包含的静态方法。存放类的文件文件名和类名相同（首字母大写），扩展名是.java。
## printf
用法与c一样
## StdIn
StdIn从标准输入流中获取数据（调用不同数据类型的静态方法）
## 重定向与管道
此特性与java无关（node也可以），与操作系统Linux（类unix）有关。
ffmpeg也大量使用这个特性，这甚至可以看作node流和管道概念前身。
```java
java RandomSeq 1000 100.0 200.0 > data.txt
```
将程序的输出重定向到一个文件保存。
```java
java Average < data.txt
```
< 是一个提示符，它告诉操作系统读取文本文件data.txt作为输入流而不是在终端窗口中等待用户的输入。
```java
java RandomSeq 1000 100.0 200.0 | java Average
```
这条命令将RandomSeq的标准输出和Average的标准输入指定为同一个流。
## 数据类型
数据类型指的是一组值和一组对这些值的操作集合。如int的取值范围是-2 ** 31到2 ** 31 - 1之间的整数，int的操作包括+ * - / % < >。
## java编程风格
java编程的基础主要是使用class关键字构造被称为引用类型的数据类型。此风格称为面向对象编程，核心概念是对象，即保存了
某个数据类型的值的实体。
## 抽象数据类型（ADT）
是一种能够对使用者隐藏数据表示的数据类型。
## 继承的方法
例如，java中的所有数据类型都会继承toString()方法来返回用String表示的给类型的值。java会在用+运算符将任意数据类型的值和
string值连接时调用该方法。此方法的默认实现并不使用（它会返回用字符串表示的该数据类型值的内存地址）。所以常常会提供实现来
重载默认实现。
## 对象
对象是能够承载数据类型的值的实体。所有对象都有三大重要特性：状态，标识和行为。对象的状态是数据类型中的值。对象的标识是
能够将一个对象区别于另一个对象。对象的行为就是数据类型的操作。
## 创建对象
使用new + 类名 + ()
调用new()，系统都会
- 为新的对象分配内存空间
- 调用构造函数初始化对象中的值。
- 返回该对象的一个引用。
## 对象作为参数
当我们调用一个需要参数的方法时，该动作在java中的效果相当于每个参数值都出现在了一个赋值语句的右侧，而参数名则在该赋值语句的左侧。
也就是说java将参数值的一个副本从调用端传递给了方法，这种方式称为按值传递。
## 数组也是对象
在java中，所有非原始数据类型的值都是对象。
## 实例变量
每一时刻每个局部变量只会有一个值，但每个实例变量则对应这无数值。（数据类型的每个实例对象都会有一个）。
通常使用private修饰符，当初始化不再改变会使用final，但根据定义不能使用public。
## 构造函数
每个java类都至少含有一个构造函数以创建一个对象的标识，作用是初始化实例变量。构造函数的名称总是和类名相同。
## 实例方法
行为都和静态方法相同，只有一点不同；它们可以访问并操作实例变量。
## API设计
只为用例提供它们所需要的，仅此而已。
## 接口继承
继承机制叫做子类型。
java语言为定义对象之间的关系提供了支持，称为接口。（跟ts的用法一样）
通过指定一个含有一组公共方法的接口为两个本来并没有关系的类建立联系。
```java
public interface Datable
{
  int month();
  int day();
  int year();
}

public class Date implements Datable
{
  // 
}
```
## 实现继承
定义一个新类（子类）来继承另一个类的所有实例方法和实例变量。子类可以重新定义或者重写父类的方法。
## 等价性
对于两个引用变量a和b进行等价性测试(a == b)，我们检测的是它们的标识是否相同，即引用是否相同。
例如，如果x和y均为string类型的值，那么当且仅当x和y的长度相同且每个位置的字符均相同时x.equals(y)的值为true。
## 孤儿对象
```java
Date a = new Date(1999);
Date b = new Date(2019);
a = b
```
原来的b对象就会失去引用变成了孤儿对象。java具有GC（垃圾回收器），通过记录孤儿对象并将它们的内存释放到内存池中
。此特性叫做自动内存回收
## 抛出异常
```java
throw new RuntimeException("Error message here").
```
## 断言
断言是一条需要在程序的某处确定为true的布尔表达式。如果表达式的值为false，程序将会终止并报告一条出错信息。
```java
assert index >= 0: "Negative index in method x";
```
## 泛型
集合类的抽象数据类型的一个关键特性是我们应该可以用它们存储任意类型的数据。一种特别的java机制能够做到，它被称
为泛型。（js的数组和对象都有此特性，都能保存任意类型的数据）
## java原始类型的引用类型
boolean byte char double float int long short 对应 Boolean Byte Character Double Float Integer Long Short
## 自动装箱 自动拆箱
自动将一个原始数据类型转换为一个封装类型被称为自动装箱，自动将封装类型转换为原始类型称为自动拆箱。
## 背包的自然语言描述
背包是一种不支持从中删除元素的集合数据类型。它的目的是帮助用例收集元素并迭代遍历所有收集到的元素。
（用例也可以检查背包是否为空或者获取背包中元素）
## 先进先出队列
队列是一种基于先进先出的集合类型。
## 下压栈
栈是一种基于后进先出策略的集合类型。
## 算术表达式求值（栈）
表达式由括号，运算符和操作数组成。运算步骤
- 将操作数压入操作数栈
- 将运算符压入运算符栈
- 忽略左括号
- 在遇到右括号时，弹出一个运算符，弹出所需数量的操作数，并将运算符和操作数的运算结果压入操作数栈。
在处理完最后一个右括号后，操作数栈只会有一个值，它就是表达式的值。
还有检查括号是否闭合的操作。
## Dijkstra的双栈算术表达式求值算法
https://github.com/result17/myAlgs4/blob/master/char1/Evaluate.java