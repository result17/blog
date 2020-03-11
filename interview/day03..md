## 手写ajax
```js
function ajax(method, url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.send()
  xhr.onreadystatechange = function (){
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(xhr.responseText)
    }
  }
}
let q = null
let callback = text => {
  q = text.split('---').slice(1)
}
ajax('get', 'https://raw.githubusercontent.com/result17/blog/master/others/js-question-zh.md', callback)
```

### || 运算符
With the || operator, we can return the first truthy operand. If all values are falsy, the last operand gets returned.

### function参数问题
```js
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!")
  } else {
    console.log("They are the same!")
  }
}

const person = { name: "Lydia" }

compareMembers(person)
```

### JSON.parse()和JSON.stringify
- JSON.parse()
text
要被解析成 JavaScript 值的字符串，关于JSON的语法格式,请参考：JSON。
reviver 可选
转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。

- JSON.stringify()
value
将要序列化成 一个 JSON 字符串的值。
replacer 可选
如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化；关于该参数更详细的解释和示例，请参考使用原生的 JSON 对象一文。
space 可选
指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。
返回值 

### super
super() calls the constructor of the parent class