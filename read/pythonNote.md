## 阅读链接
http://www.pythondoc.com/pythontutorial3/controlflow.html#range
只记录最简单的python语法
## range函数
range第一个是起点，第二个是终点值，第三个为步长
## pass语句
pass 语句什么也不做。它用于那些语法上必须要有什么语句，但程序什么也不做的场合
## 定义函数
```python
def fib(n):    # write Fibonacci series up to n
"""Print a Fibonacci series up to n."""
     a, b = 0, 1
     while a < n:
         print(a, end=' ')
         a, b = b, a+b
     print()
```
事实上，没有 return 语句的函数确实会返回一个值，虽然是一个相当令人厌烦的值（指 None ）。这个值被称为 None 
## python函数参数
引入一个形如 **name 的参数时，它接收一个字典（参见 Mapping Types — dict ），该字典包含了所有未出现在形式参数列表中的关键字参数。这里可能还会组合使用一个形如 *name （下一小节详细介绍） 的形式参数，它接收一个元组（下一节中会详细介绍），包含了所有没有出现在形式参数列表中的参数值（ *name 必须在 **name 之前出现）。 

通常，这些 可变 参数是参数列表中的最后一个，因为它们将把所有的剩余输入参数传递给函数。任何出现在 *args 后的参数是关键字参数，这意味着，他们只能被用作关键字，而不是位置参数
## lambda形式
用此关键字定义匿名函数
## 函数注解
注解是以字典形式存储在函数的 __annotations__ 属性中，对函数的其它部分没有任何影响。参数注解（Parameter annotations）是定义在参数名称的冒号后面，紧随着一个用来表示注解的值得表达式。返回注释（Return annotations）是定义在一个 -> 后面，紧随着一个表达式，在冒号与 -> 之间。下面的示例包含一个位置参数，一个关键字参数，和没有意义的返回值注释:
```python
def f(ham: 42, eggs: int = 'spam') -> "Nothing to see here":
     print("Annotations:", f.__annotations__)
     print("Arguments:", ham, eggs)
```
## del语句
根据索引删除列表的任一项或者多项
## 元祖
```python
t = 12345, 54321, 'hello'
```
给元组中的一个单独的元素赋值是不允许的，当然你可以创建包含可变对象的元组
## 集合
花括号或 set() 函数可以用来创建集合
## 字典
约等于JS的object，键只能为字符串或者数字
```python
>>> tel = {'jack': 4098, 'sape': 4139}
>>> tel['guido'] = 4127
>>> tel
{'jack': 4098, 'sape': 4139, 'guido': 4127}
>>> tel['jack']
4098
>>> del tel['sape']
>>> tel['irv'] = 4127
>>> tel
{'jack': 4098, 'guido': 4127, 'irv': 4127}
>>> list(tel)
['jack', 'guido', 'irv']
>>> sorted(tel)
['guido', 'irv', 'jack']
>>> 'guido' in tel
True
>>> 'jack' not in tel
False
```
还有很多骚操作请查看
https://docs.python.org/zh-cn/3/tutorial/datastructures.html#the-del-statement 
## 模块
一个模块内部，模块名（作为一个字符串）可以通过全局变量 __name__ 的值获得。
在python中，自动扫描当前文件夹，并将同名文件当作一个模块引入。
```python
>>> from fibo import fib, fib2
>>> fib(500)
>>> from fibo import *
>>> fib(500)
```
这会调入所有非以下划线（_）开头的名称。 在多数情况下，Python程序员都不会使用这个功能，因为它在解释器中引入了一组未知的名称，而它们很可能会覆盖一些你已经定义过的东西。
## 包
包是一种通过用“带点号的模块名”来构造 Python 模块命名空间的方法。 例如，模块名 A.B 表示 A 包中名为 B 的子模块。
## json
```python
# 相当于js中的JSON.stringify
json.dumps([1, 'simple', 'list'])
# js中的JSON.parse
json.load()
```
## 处理异常
```python
while True:
     try:
         x = int(input("Please enter a number: "))
         break
     except ValueError:
         print("Oops!  That was no valid number.  Try again...")
```
它会要求用户一直输入，直到输入的是一个有效的整数，但允许用户中断程序（使用 Control-C 或操作系统支持的其他操作）；请注意用户引起的中断可以通过引发 KeyboardInterrupt 异常来指示
try 语句的工作原理如下。

首先，执行 try 子句 （try 和 except 关键字之间的（多行）语句）。

如果没有异常发生，则跳过 except 子句 并完成 try 语句的执行。

如果在执行try 子句时发生了异常，则跳过该子句中剩下的部分。然后，如果异常的类型和 except 关键字后面的异常匹配，则执行 except 子句 ，然后继续执行 try 语句之后的代码。

如果发生的异常和 except 子句中指定的异常不匹配，则将其传递到外部的 try 语句中；如果没有找到处理程序，则它是一个 未处理异常，执行将停止并显示如上所示的消息。
## 抛出异常
```python
raise NameError('HiThere')
```
## 定义清理操作
```python
 try:
     raise KeyboardInterrupt
 finally:
      print('Goodbye, world!')
```
如果存在 finally 子句，则 finally 子句将作为 try 语句结束前的最后一项任务被执行。 finally 子句不论 try 语句是否产生了异常都会被执行。 以下几点讨论了当异常发生时一些更复杂的情况：
## 类