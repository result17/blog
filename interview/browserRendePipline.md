https://zhuanlan.zhihu.com/p/30534023
最底层的是 Chrome 最核心的部分 Blink，负责JS的解析执行，HTML/CSS解析，DOM操作，排版，图层树的构建和更新等任务；
Layer Compositor（图层合成器）接收 Blink 的输入，负责图层树的管理，图层的滚动，旋转等矩阵变幻，图层的分块，光栅化，纹理上传等任务；
Display Compositor 接收 Layer Compositor 的输入，负责输出最终的 OpenGL 绘制指令，将网页内容通过 GL 贴图操作绘制到目标窗口上，如果忽略掉操作系统本身的窗口合成器，也可以简单认为是绘制在显示屏上；

Chrome 渲染流水线的调度是基于请求和状态机响应，调度的最上级中枢运行在 Browser UI 线程，它按显示器的 VSync（垂直同步）周期向 Layer Compositor 发出输出下一帧的请求，而 Layer Compositor 根据自身状态机的状态决定是否需要 Blink 输出下一帧。

Display Compositor 则比较简单，它持有一个 Compositor Frame 的队列不断的进行取出和绘制，输出的频率唯二地取决于 Compositor Frame 的输入频率和自身绘制 GL Frame 的耗时。基本上可以认为 Layer Compositor 和 Display Compositor 是生产者和消费者的关系。