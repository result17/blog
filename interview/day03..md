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

### super
super() calls the constructor of the parent class