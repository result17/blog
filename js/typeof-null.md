# 面试常见题目
>面试官问： 为什么typeof null === 'object'?

## more than bug
```
显然，这是bug。但仅回答这个是bug，这是一个历史遗留问题，让我们回到JS早期版本来看看到底是什么回事。
```
```
早期JS的值都是以32bits为一个单位，前三位为类型标识位。
```
```
000: object. The data is a reference to an object.
1: int. The data is a 31 bit signed integer.
010: double. The data is a reference to a double floating point number.
100: string. The data is a reference to a string.
110: boolean. The data is a boolean.
```
```
其中有两个变量
undefined (JSVAL_VOID) was the integer −230 (a number outside the integer range).

null (JSVAL_NULL) was the machine code NULL pointer. Or: an object type tag plus a reference that is zero.
```
```
null在js的语言就是指空指针。接下来我们来看typeof的源码
```
```cpp
JS_PUBLIC_API(JSType)
    JS_TypeOfValue(JSContext *cx, jsval v)
    {
        JSType type = JSTYPE_VOID;
        JSObject *obj;
        JSObjectOps *ops;
        JSClass *clasp;

        CHECK_REQUEST(cx);
        if (JSVAL_IS_VOID(v)) {  // (1)
            type = JSTYPE_VOID;
        } else if (JSVAL_IS_OBJECT(v)) {  // (2)
            obj = JSVAL_TO_OBJECT(v);
            if (obj &&
                (ops = obj->map->ops,
                 ops == &js_ObjectOps
                 ? (clasp = OBJ_GET_CLASS(cx, obj),
                    clasp->call || clasp == &js_FunctionClass) // (3,4)
                 : ops->call != 0)) {  // (3)
                type = JSTYPE_FUNCTION;
            } else {
                type = JSTYPE_OBJECT;
            }
        } else if (JSVAL_IS_NUMBER(v)) {
            type = JSTYPE_NUMBER;
        } else if (JSVAL_IS_STRING(v)) {
            type = JSTYPE_STRING;
        } else if (JSVAL_IS_BOOLEAN(v)) {
            type = JSTYPE_BOOLEAN;
        }
        return type;
    }
```
```
typeof 先判断是否为undefined// (1)，所以typeof undefined === 'undefinde'。然后在// (2)中判断是否为对象。在// (3)中判断是否为函数，否则就被判为对象。可怜的null就是这样被判断为object了。因为web是要向后兼容的，所以这个意外的bug就一直被保留下来了。详细的请看参考链接哦，里面还有JS的作者Brendan Eich的回复。
```
## 参考链接
[The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)