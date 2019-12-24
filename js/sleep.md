```js
function sleep(ms) {
  let start = Date.now(), expire = start + ms
  while (Date.now() < expire)
  return
}
```
此处有小坑，我猜想V8的实现时当不存在循环体，将跳过此循环，所以此sleep函数在新版V8是没效果的。
```js
function sleep(ms) {
  let start = Date.now(), expire = start + ms
  // 加个中括号就行
  while (Date.now() < expire) {}
  return
}
```
do while版本
```js
function sleep(deplay) {
  let start = Date.now(), cur = null
  do { 
    cur = Date.now()
  } while (cur - start < deplay) 
}
```
在ES6有更好的办法就是使用async和await。用setTimeout模拟异步，然后返回一个promise。当其在deplay后才将promise状态改为fullfilled。这时利用异步迭代器await就能达到“卡死”语句执行的作用。
```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(2000);
    console.log(i);
  }
}

demo();
```