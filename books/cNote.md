## 符号常量
#define指令可以把符号名（或称为符号常量）定义为一个特定的字符串：
## main函数
c入口函数为main
## EOF
如何区分文件中有效数据与输入结束符的问题。c语言采用的解决方法是：在没有输入时，getchar函数将返回一个特殊值，这个特殊值与任何实际字符都不同，称为EOF(end of file)。
## 运算符优先级
```c
c = getchar() != EOF
// 等价
c = (getchar() != EOF)
```
## char类型
由定义可知，char类型的字符是小整形，因此char类型的变量和常量在算术表达式中等价于int类型的变量和常量。
## 字符串常量
就是字符数组。字符串的内部表示使用一个空字符'\0'作为串的结尾，因此，存储字符串的物理存储单元数比双引号中的字符数多一个。