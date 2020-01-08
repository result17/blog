```js
let promiseAry = urlAry.map((url) => {
  // getSource是一个Promise对象
  return getSource(url).then((response) => {
    saveSourceAsync(path)
  })  
})
let all = Promise.all(promiseAry)
```
问题是all的状态当getSource变为fulfilled时，all的状态就变为fulfilled。而我像做到的是原以为的是then会返回新的Primise实例，
saveSourceAsync(path)完成后才让all的状态就变为fulfilled，于是我这样写：
```js
let promiseAry = urlAry.map((url) => {
  // getSource是一个Promise对象
  let p = new Promise((resolve) => {
    getSource(url).then((response) => {
      saveSourceAsync(path).on('done', () => resolve())
    }) 
  })
  return p
})
let all = Promise.all(promiseAry)
```
这种方法好吗？又想了一种
```js
let promiseAry = urlAry.map((url) => {
  // getSource是一个Promise对象
  return getSource(url).then((response) => {
    return new Promise((resolve) => {
      saveSourceAsync(path).on('done', () => resolve())
    })
  })  
})
let all = Promise.all(promiseAry)
```
哪种更好？你会怎么样处理呢？我觉得最后一种最好