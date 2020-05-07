### 类型判断
```ts
// packages\shared\src\index.ts.

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
```

### 定义节点类型
ROOT = 0, ELEMENT = 1递推
```ts
export const enum NodeTypes {
  ROOT,
  ELEMENT,
  TEXT,
  COMMENT,
  SIMPLE_EXPRESSION,
  INTERPOLATION,
  ATTRIBUTE,
  DIRECTIVE,
  // containers
  COMPOUND_EXPRESSION,
  IF,
  IF_BRANCH,
  FOR,
  TEXT_CALL,
  // codegen
  VNODE_CALL,
  JS_CALL_EXPRESSION,
  JS_OBJECT_EXPRESSION,
  JS_PROPERTY,
  JS_ARRAY_EXPRESSION,
  JS_FUNCTION_EXPRESSION,
  JS_CONDITIONAL_EXPRESSION,
  JS_CACHE_EXPRESSION,

  // ssr codegen
  JS_BLOCK_STATEMENT,
  JS_TEMPLATE_LITERAL,
  JS_IF_STATEMENT,
  JS_ASSIGNMENT_EXPRESSION,
  JS_SEQUENCE_EXPRESSION,
  JS_RETURN_STATEMENT
}
```

### 对象属性extend
```ts
export const extend = <T extends object, U extends object>(
  a: T,
  b: U
): T & U => {
  for (const key in b) {
    ;(a as any)[key] = b[key]
  }
  return a as any
}
```

### 转义
```ts
const decodeRE = /&(gt|lt|amp|apos|quot);/g
const decodeMap: Record<string, string> = {
  gt: '>',
  lt: '<',
  amp: '&',
  apos: "'",
  quot: '"'
}
```
用于对纯文本的解码，如果不进行解码，那么用户将无法使用字符实体编写字符。

### vue中的delimiter
定界符{{}}，大胡子语法

### vue3编译即表示节点类型
```ts
export const enum ElementTypes {
  ELEMENT,
  COMPONENT,
  SLOT,
  TEMPLATE
}
```
https://juejin.im/post/5d9dbfb4e51d4577f7061978#comment

### micro task
https://juejin.im/post/5dcb775c518825574d214b89
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
.then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve();
    })
    .then(() => {
        console.log("内部第一个then");
    })
    .then(() => {
        console.log("内部第二个then");
    });
    return new Promise((resolve, reject) => {
        console.log("内部promise2");
        resolve();
    })
    .then(() => {
        console.log("内部第一个then2");
    })
    .then(() => {
        console.log("内部第二个then2");
    });
})
.then(() => {
    console.log("外部第二个then");
});
```
只有在promise从pending => fuiled / reject 才会注册微任务，
new Promise(() => {})里面是同步过程。
