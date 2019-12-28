def test():
    x = "hello, test!"
    print(locals())
    print("locals:", id(locals()))
    print("globals:", id(globals()))


test()    
