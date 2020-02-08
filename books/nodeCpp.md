## node-gyp
是node下的c++扩展构建工具。几乎所有node的c++扩展都由它构建。
它基于GYP来进行工作。GYP的全称为Generate Your Projects，它是谷歌出品的一套构建工具，通过一个*.gyp的描述文件生成不同系统所需要的项目文件以供构建和编译。
使用node-gyp的c++扩展中主要由一个binding.gyp文件进行配置。