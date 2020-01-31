## 阅读链接
https://www.leavesongs.com/PENETRATION/javascript-prototype-pollution-attack.html
https://segmentfault.com/a/1190000019735321?utm_source=tag-newest
https://esdiscuss.org/topic/proto-and-json
## js中的继承
所有类对象在实例化的时候将会拥有prototype中的属性和方法，这个特性被用来实现JavaScript中的继承机制。
## 污染原型链
```js
// foo是一个简单的JavaScript对象
let foo = {bar: 1}

// foo.bar 此时为1
console.log(foo.bar)

// 修改foo的原型（即Object）
foo.__proto__.bar = 2

// 由于查找顺序的原因，foo.bar仍然是1
console.log(foo.bar)

// 此时再用Object创建一个空的zoo对象
let zoo = {}

// 查看zoo.bar
console.log(zoo.bar)
```
可见污染原型链的方法是通过设置实例的__proto__的值来污染原型链。
## 污染原型链的情况
哪些情况下我们可以设置__proto__的值呢？其实找找能够控制数组（对象）的“键名”的操作即可：

对象merge
对象clone（其实内核就是将待操作的对象merge到一个空对象中）
```js
// 作者举例的merge函数
function merge(target, source) {
    for (let key in source) {
        if (key in source && key in target) {
            merge(target[key], source[key])
        } else {
            target[key] = source[key]
        }
    }
}
let o1 = {}
let o2 = {a: 1, "__proto__": {b: 2}}
merge(o1, o2)
console.log(o1.a, o1.b)

o3 = {}
console.log(o3.b)
```
结果是，合并虽然成功了，但原型链没有被污染：
这是因为，我们用JavaScript创建o2的过程（let o2 = {a: 1, "__proto__": {b: 2}}）中，__proto__已经代表o2的原型了，此时遍历o2的所有键名，你拿到的是[a, b]，__proto__并不是一个key，自然也不会修改Object的原型。

那么，如何让__proto__被认为是一个键名呢？
```js
let o1 = {}
let o2 = JSON.parse('{"a": 1, "__proto__": {"b": 2}}')
merge(o1, o2)
console.log(o1.a, o1.b)

o3 = {}
console.log(o3.b)
```
这是因为，JSON解析的情况下，__proto__会被认为是一个真正的“键名”，而不代表“原型”，所以在遍历o2的时候会存在这个键。

merge操作是最常见可能控制键名的操作，也最能被原型链攻击，很多常见的库都存在这个问题。
## lodash漏洞
```js
// ...
const lodash = require('lodash')
// ...

app.engine('ejs', function (filePath, options, callback) { 
// define the template engine
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(new Error(err))
        let compiled = lodash.template(content)
        let rendered = compiled({...options})

        return callback(null, rendered)
    })
})
//...

app.all('/', (req, res) => {
    let data = req.session.data || {language: [], category: []}
    if (req.method == 'POST') {
        data = lodash.merge(data, req.body)
        req.session.data = data
    }

    res.render('index', {
        language: data.language, 
        category: data.category
    })
})
```
这个Web应用中，使用了lodash提供的两个工具：

lodash.template 一个简单的模板引擎
lodash.merge 函数或对象的合并
其实整个应用逻辑很简单，用户提交的信息，用merge方法合并到session里，多次提交，session里最终保存你提交的所有信息。

而这里的lodash.merge操作实际上就存在原型链污染漏洞。

在污染原型链后，我们相当于可以给Object对象插入任意属性，这个插入的属性反应在最后的lodash.template
```js
// Use a sourceURL for easier debugging.
var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
// ...
var result = attempt(function() {
  return Function(importsKeys, sourceURL + 'return ' + source)
  .apply(undefined, importsValues);
});
```
options是一个对象，sourceURL取到了其options.sourceURL属性。这个属性原本是没有赋值的，默认取空字符串。

但因为原型链污染，我们可以给所有Object对象中都插入一个sourceURL属性。最后，这个sourceURL被拼接进new Function的第二个参数中，造成任意代码执行漏洞。
![img](https://github.com/result17/blog/blob/master/imgs/lodashbug.png?raw=true)
作者请求中写了一个for循环删除污染属性的原因
原型链污染攻击有个弊端，就是你一旦污染了原型链，除非整个程序重启，否则所有的对象都会被污染与影响。
这将导致一些正常的业务出现bug，或者就像这道题里一样，我的payload发出去，response里就有命令的执行结果了。这时候其他用户访问这个页面的时候就能看到这个结果，所以在CTF中就会泄露自己好不容易拿到的flag，所以需要一个for循环把Object对象里污染的原型删掉。
使用global.process.mainModule.constructor._load的原因是可能上下文中没有require
node文档里面写的require-This variable may appear to be global but is not

## lodash的防范措施-防范原型污染
- 在遍历 merge 时，当遇见 constructor 以及 __proto__ 敏感属性，则退出程序
- json schema过滤敏感字
- 使用 Object.create。 Object.create(null) 的返回值不会链接到 Object.prototype：
```js
JSON.parse('{ "a":1, "__proto__": { "b": 2 }}')
```
已经在chromium中修复