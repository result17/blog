## 导读
此书是以程序员角度来系统，系统介绍计算机系统（类Unix）并具有实践操作的神书。
## x86-64
x86-64是intel自1978年其。以8086微处理器为代表，不断进化的最新成果。在这个过程中，它们从处理16位字，发展到引入IA32处理器处理32位字，再到最近的x86-64处理64位字。
## 文本文件
只有ASCII字符构成的文件称为文本文件。
## 二进制文件
除了文本文件外的所有文件都称为二进制文件。
## 系统中信息的概念
信息等于位+上下文。系统中所有信息都为一串比特表示。区分不同数据对象的唯一方法是我们读到这些数据对象时的上下文。
## C语言的优点与不足
优点：
- C语言与Unix操作系统关系密切
- C语言小而简单（个人设计）
- C语言是为实践目的设计的。
不足：
- C语言指针是一个大坑。
- 缺乏类，对象和异常等抽象支持。
## GCC编译系统
![img](https://github.com/result17/blog/blob/master/imgs/gcc.png?raw=true)
## 总线
贯穿整个系统的一组电子管道，称作总线。它携带信息字节并负责在各个不见间传递。总线被设计成传递定常的字节快。4个字节称为32位，8个字节称为64位。
## I/O设备
每个I/O设备都通过一个控制器或适配器与I/O总线相连。控制器是I/O设备本身或者系统的主印制电路板(通常称作主板)上的芯片组。而适配器则是一块插在主板插槽上的卡。它们的功能都是在I/O总线和I/O设备之间传递信息。
## 主存
贮存是一个临时存储设备，在处理器执行程序是，用来存放程序和程序处理的数据。从物理来说，主存是由一组动态随机存取存储器(DRAM)芯片组成的。从逻辑上说，存储器是一个线性的字节数组，每个字节都有其唯一的地址（数组索引），地址从0开始。
## 处理器
中央处理单元（CPU），是解析（或执行）在主存中指令的引擎。处理器的核心是一个大小为一个字的存储设备，称为程序计数器（PC）。在任何时刻，PC都指向主存中的某条机器语言指令（即含有该条指令的地址）。
处理器看上去是它的指令集架构的简单实现，但实际上现代处理器使用了非常复杂的机制来加速程序的执行。
## 直接存储器存取（DMA）技术
数据可以不通过处理器而直接从磁盘到达主存。
## 高速缓存
CPU中的寄存器读取一个字节要比从主存读取一个字节的时间开销小的多（超过100倍，而且差距越来越大）。针对于处理器和主存之间的差异，系统设计者采用了高速缓存存储器（cache memory）。L1和L2高速缓存是用一种叫做静态随机访问存储器（SRAM）实现的。合理利用高速缓存器会将程序的性能提高一个数量级。
## 存储层次结构
![img](https://github.com/result17/blog/blob/master/imgs/memory.png?raw=true)
## 进程
进程是操作系统对一个正在运行的程序的一种抽象。在一个系统上可以同时运行多个进程，而每个进程都好像是在独占第使用硬件。通过处理器在进程间切换来实现多个进程交错执行的机制称为上下文切换。操作系统保持跟进程运行所需的所有状态信息，这种状态称为上下文。从一个进程到另一个进程的切换是由操作系统内核（kernel）管理的。内核是操作系统代码常驻主存的而部分。
## 线程
在现代系统中，一个进程实际上可以由多个称为线程的执行单元组成。每个线程都运行在进程的上下文中，并共享同样的代码和全局数据。
## 虚拟内存
虚拟内存是一个抽象概念，它为每个进程提供一个假象，即每个进程都在独占的使用主存。每个进程看到的内存都是一致的，称为虚拟地址空间，
![img](https://github.com/result17/blog/blob/master/imgs/fakeMemory.png?raw=true)
基本思想是把一个进程虚拟内存的内容存储在磁盘中，然后用主存作为磁盘的高速缓存。
## 文件
文件就是字节序列。每个I/O（只是I/O）设备都可以看成是文件。系统中的所有输入输出都是通过一小组称为Unix I/O的系统调用函数调用读写文件来实现的。
## Amdahl定律
![equation](https://github.com/result17/blog/blob/master/imgs/amdahl.png?raw=true)
S为旧系统运行程序所需时间与新系统运行程序所需时间之比
![equation](https://latex.codecogs.com/gif.latex?S%20=%20\frac{1}{(1%20-%20a)%20+%20\frac{a}{k}})
Amdahl定律的主要观点：要想显著加速整个系统，必须提升全系统中相当大的部分速度。
## 练习题1.1
已知 α = 1500 / 2500 = 3 / 5, k = 150 / 100 = 3 / 2
根据公式 S = 1.25
已知S = 1.67 = 5 / 3, α = 3 / 5
由公式推导得到 k = α * S / (1 - S(1 - α)) = 3
所以货车时速为 100 * 3 = 300 km/h
## 练习题1.2
已知α = 0.8, S = 2, 根据上面有
k = 1.6 / 0.6 = 2.67
## 净加速比
当k接近无限大时，我们可以得到净加速比，即某一系统部件极限性能会使得系统加速比为
S = 1 / (1 - α)
## 并发和并行
并发是指一个同时具有多个活动的系统，而并行是指用并发来使一个系统运行的更快。
## 时间共享并发
通过使一台计算机在它正在执行的进程间快读切换来实现的。（线程级并发）
## 多核处理器
多核处理器是将多个CPU集成到一个继承电路芯片上。（线程级并发）
## 超线程
是一项允许一个CPU执行多个控制流的技术。常规的处理器需要大约20000个时钟周期做不同线程间的切换。而超线程的处理器可以在单个周期的基础上决定要执行哪个线程。Intel Core i7处理器可以让每个核执行两个线程，所以一个4核的系统实际上可以并行地执行8个线程。（线程级并发）
## 多处理器的好处
- 它减少了在执行多个任务时模拟并发的需要。
- 以多线程方式书写的应用程序运行更快。
## 指令级并行
现代处理器可以同时执行多条指令的属性称为指令级并行。
## 超标量处理器
如果处理器可以达到比一个周期一条指令更快的执行速率就称为超标量处理器。
## 单指令，多数据并行
在最低层次上，许多现代处理器拥有特殊的硬件，允许一条指令产生多个可以并行执行额操作，这种方式称为单指令，多数据。
## 几个操作系统的抽象
文件是对I/O设备的抽象，虚拟内存是对程序存储器的抽象。而进程是一个对正在运行的程序（处理器，主存和I/O设备）的抽象。虚拟机，提供对整个计算机的抽象，包括操作系统，处理器和程序。