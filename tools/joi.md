## 简介
joi是js_web后端框架hapi的json工具，之所以要使用它的原因无法是GitHub stars数量多，而且API足够友好，容易上手。
### assert(value, schema, [message], [options]) 
```js
Joi.assert('x', Joi.number());
```
没有返回值，但不匹配会throw error。

### attempt(value, schema, [message], [options])
```js
Joi.attempt('x', Joi.number()); // throws error
const result = Joi.attempt('4', Joi.number()); // result -> 4
```
有返回值，会返回Joi.compile()的值。

### compile(schema, [options]) 
```js
const definition = ['key', 5, { a: true, b: [/^a/, 'boom'] }];
const schema = Joi.compile(definition);

// Same as:

const schema = Joi.alternatives().try(
    Joi.string().valid('key'),
    Joi.number().valid(5),
    Joi.object({
        a: Joi.boolean().valid(true),
        b: Joi.alternatives().try(
            Joi.string().pattern(/^a/),
            Joi.string().valid('boom')
        )
    })
);
```
可以认为从一个简单的实例得到scheme，从而偷懒不用用户写json校验配置，但可能存在编译性能问题。

### defaults(modifier) 
```js
const custom = Joi.defaults((schema) => {

    switch (schema.type) {
        case 'string':
            return schema.allow('');
        case 'object':
            return schema.min(1);
        default:
            return schema;
    }
});

const schema = custom.object();   // Returns Joi.object().min(1)
```
配置joi实例

### isRef(ref) 
```js
const ref = Joi.ref('a');
Joi.isRef(ref); // returns true
```
判断是否为引用类型

### ref(key, [options]) 
```js
const schema = Joi.object({
    a: Joi.ref('b.c'),
    b: {
        c: Joi.any()
    },
    c: Joi.ref('$x')
});

await schema.validateAsync({ a: 5, b: { c: 5 } }, { context: { x: 5 } });
```
引用校验。