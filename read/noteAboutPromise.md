## 相关阅读
http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/
https://github.com/result17/blog/blob/master/others/promiseProblem.md
## problems
```js
doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```
上面四道题的区别是什么？在解决问题前，我们要明确写promise的原则
## promise原则
- 写成链式调用
- Promise.all代替forEach
- 在使用Promise上添加catch
## then函数
- return 另一个 promise 下一个函数将收到新的promise
- return 一个同步的值 (或者 undefined) 返回 undefined 通常是错误的，但是返回一个同步值实际上是将同步代码包裹为 promise 风格代码的一种非常赞的手段。
- throw 一个同步异常 catch不关系此异常是同步还是异步返回，有助于定位代码问题
## promises factory
这个就比较好了解，axios就是一个promises factory函数。一个返回promise的函数就是promises factory。当你想发起多个请求时，不妨这样做
```js
Promise.all(urlList.forEach(url => axios(url)))
```
## 在then中使用命名函数
```js
putYourRightFootIn()
  .then(putYourRightFootOut)
  .then(putYourRightFootIn)  
  .then(shakeItAllAbout);
```
这是一种美观而且有效的代码技巧
## promise穿透
```js
Promise.resolve('foo').then(Promise.resolve('bar')).then(function (result) {
  console.log(result);
});
```
它其实会打出foo
因为then只接受函数，若传递的并非是一个函数（比如 promise），它实际上会将其解释为 then(null)，这就会导致前一个 promise 的结果会穿透下面。
永远都是往 then() 中传递函数！
再看一个例子
```js
Promise.resolve('foo').then(console.log('bar')).then(console.log('baz')).then(function (result) {
  console.log(result);
});
```
输出顺序为
bar baz foo
当then接受的不是一个函数，此时就会同步执行语句，然后then进行穿透输出foo。